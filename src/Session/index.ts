import Axios from 'axios'
import { sleep } from 'src/lib/sleep'
import type { Application, SelfCreditRating, EmploymentStatus, Address } from './Application.interface'
import faker from '@faker-js/faker'
import dayjs from 'dayjs'

interface CreatedSession {
	id: number
	token: string
}

interface UserSession {
	id: number
	application: Partial<Application>
}

interface SessionEvent {
	event: string
	data: Record<string, unknown>
}

interface OfferRequest {
	id: number
	status: 'PROCESSING' | 'SUCCESS' | 'NO_OFFERS' | 'INELIGIBLE'
}

export class Session {
	private http = Axios.create({
		baseURL: 'https://api.sandbox.onthebarrelhead.com/api/v1'
	})
	private token?: string
	constructor() {}
	async run() {
		// Authorize session / token
		await this.authSession()

		// Fill out the form
		const steps = this.generateSteps()
		for (const [pageView, application] of steps) {
			await this.storeApplicationData({ pageView, application })
		}

		// Get updated session
		const session = await this.getSession()

		// Submit form
		const { data: pendingOfferRequest } = await this.http.post<OfferRequest>('session/offerRequests', {
			type: 'PERSONAL_LOAN',
			application: session.application
		})

		// Run a credit check
		await this.http.post('session/verify')

		// Poll / Get OfferRequest
		await this.getOfferRequestById(pendingOfferRequest.id)
	}
	private async getSession(): Promise<UserSession> {
		const { data: session } = await this.http.get<UserSession>('session')
		return session
	}
	private async getOfferRequestById(id: number): Promise<OfferRequest> {
		const { data } = await this.http.get<OfferRequest>(`session/offerRequests/${id}`)
		if (data.status === 'PROCESSING') {
			await sleep(500)
			return this.getOfferRequestById(id)
		}
		return data
	}
	private async authSession() {
		const {
			data: { token }
		} = await this.http.post<CreatedSession>('session', {
			product: 'PersonalLoanPro',
			brand: 'PersonalLoanPro',
			arrivalUrl: 'https://loadtest'
		})
		this.setToken(token)
	}
	private setToken(token: string) {
		this.token = token
		this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}
	private async emitEvent(event: SessionEvent): Promise<void> {
		await this.http.post('session/events', event)
	}
	private async storeApplicationData({
		pageView,
		application
	}: {
		pageView: string
		application: Partial<Application>
	}) {
		await this.emitEvent({
			event: 'ui:pageView',
			data: {
				path: pageView
			}
		})
		await sleep(1000)
		await this.http.post('session/application', application)
		await this.getSession()
		await sleep(1000)
	}
	private generateSteps(): [string, Partial<Application>][] {
		const firstName = faker.name.firstName()
		const lastName = faker.name.lastName()
		const selfCreditRating = (() => {
			const ratings: SelfCreditRating[] = ['EXCELLENT', 'GOOD', 'FAIR', 'POOR']
			return faker.random.arrayElement(ratings)
		})()
		const employmentStatus = (() => {
			const status: EmploymentStatus[] = [
				'FULL_TIME',
				'PART_TIME',
				'SELF_EMPLOYED',
				'UNEMPLOYED',
				'RETIRED',
				'OTHER'
			]
			return faker.random.arrayElement(status)
		})()
		const birthDate = (() => {
			const min = dayjs().subtract(18, 'years').valueOf()
			const max = dayjs().subtract(60, 'years').valueOf()
			return dayjs(faker.datatype.datetime({ min, max })).format('YYYY-MM-DD')
		})()
		const address = ((): Address => {
			const stateAbbrev = faker.address.stateAbbr()
			const zipCode = `${faker.address.zipCodeByState(stateAbbrev)}`
			return {
				line1: faker.address.streetAddress(),
				city: faker.address.city(),
				stateAbbrev,
				zipCode
			}
		})()
		return [
			[
				'personal-loan-purpose',
				{
					personalLoanPurpose: 'MEDICAL'
				}
			],
			[
				'request-amount',
				{
					requestAmount: faker.datatype.number({
						min: 5000,
						max: 50000,
						precision: 500
					})
				}
			],
			[
				'self-credit-rating',
				{
					applicant: { selfCreditRating }
				}
			],
			[
				'employment-status',
				{
					applicant: {
						employmentStatus
					}
				}
			],
			[
				'annual-income',
				{
					applicant: {
						annualIncome: faker.datatype.number({
							min: 0,
							max: 200000,
							precision: 5000
						})
					}
				}
			],
			[
				'housing-type',
				{
					applicant: { housingType: 'RENT' }
				}
			],
			[
				'pay-frequency',
				{
					applicant: {
						payFrequency: 'WEEKLY'
					}
				}
			],
			['email', { applicant: { email: faker.internet.email(firstName, lastName) } }],
			['name', { applicant: { firstName, lastName } }],
			[
				'birth-date',
				{
					applicant: {
						birthDate
					}
				}
			],
			[
				'phone-number',
				{
					applicant: {
						phoneNumber: faker.phone.phoneNumber('555-###-####')
					}
				}
			],
			[
				'military',
				{
					applicant: {
						militaryOrVeteran: Math.random() < 0.1
					}
				}
			],
			[
				'zip-code',
				{
					applicant: {
						address: {
							zipCode: address.zipCode,
							city: address.city,
							stateAbbrev: address.stateAbbrev
						}
					}
				}
			],
			[
				'street-address',
				{
					applicant: { address: { line1: address.line1 } }
				}
			],
			[
				'ssn',
				{
					applicant: {
						socialSecurityNumber: faker.phone.phoneNumber('666-##-####')
					}
				}
			]
		]
	}
}
