export type SelfCreditRating = 'POOR' | 'FAIR' | 'GOOD' | 'EXCELLENT'

export type EmploymentStatus =
	| 'FULL_TIME'
	| 'PART_TIME'
	| 'SELF_EMPLOYED'
	| 'UNEMPLOYED'
	| 'MILITARY'
	| 'RETIRED'
	| 'OTHER'

export interface Address {
	line1: string
	line2?: string
	city: string
	stateAbbrev: string
	zipCode: string
}

export interface Applicant {
	selfCreditRating: SelfCreditRating
	annualIncome: number
	housingType: 'RENT' | 'OWN' | 'OTHER'
	bankruptcyOrForeclosure: 'NONE' | 'BANKRUPTCY' | 'FORECLOSURE' | 'BOTH'
	hasAutoIncidents: boolean
	recentDui: boolean
	recentAtFaultAccident: boolean
	recentMovingViolation: boolean
	employmentStatus: EmploymentStatus
	payFrequency: 'WEEKLY' | 'BI_WEEKLY' | 'SEMI_MONTHLY' | 'MONTHLY' | 'OTHER'
	collateralOwnership: 'PAID_OFF' | 'MAKING_PAYMENTS' | 'NO'
	address: Partial<Address>
	firstName: string
	lastName: string
	birthDate: string
	email: string
	phoneNumber: string
	ageRange: '18-24' | '25-34' | '35-54' | '55-64' | '65+'
	gender: 'MALE' | 'FEMALE' | 'NON_BINARY'
	maritalStatus: 'MARRIED' | 'SINGLE'
	militaryOrVeteran: boolean
	socialSecurityNumber: string
	socialSecurityNumberToken: string
	socialSecurityNumberSerial: string
	socialSecurityNumberSerialToken: string
}

export interface Vehicle {
	creditLineId: number
	year: number
	make: string
	model: string
	trim: string
	estimatedPayoffAmount: number
}

export interface Application {
	applicant: Partial<Applicant>
	vehicle: Partial<Vehicle>
	loanRefinanceGoal: 'LOWER_MONTHLY_PAYMENT' | 'LOWER_TOTAL_LOAN_COST'
	autoRefiOptIn: boolean
	requestAmount: number
	debtReliefRequestAmount: number
	businessLoanRequestAmount: number
	businessLoanPurpose:
		| 'EXPANSION'
		| 'PURCHASE_EQUIPMENT'
		| 'PURCHASE_VEHICLE'
		| 'INVENTORY'
		| 'PAYROLL'
		| 'MARKETING'
		| 'REAL_ESTATE'
		| 'REMODEL'
		| 'DEBT_REFINANCE'
		| 'ACCOUNTS_RECEIVABLE'
		| 'BUSINESS_ACQUISITION'
		| 'BUSINESS_START'
		| 'OTHER'
	businessStructure: 'SOLE_PROPRIETORSHIP' | 'PARTNERSHIP' | 'CORPORATION' | 'S_CORPORATION' | 'LLC'
	businessStartDate: string
	businessAnnualRevenue: number
	businessIndustry:
		| 'ACCOMMODATIONS'
		| 'ADMINISTRATIVE'
		| 'AGRICULTURE'
		| 'ENTERTAINMENT'
		| 'CONSTRUCTION'
		| 'EDUCATIONAL_SERVICES'
		| 'FINANCE_INSURANCE'
		| 'HEALTH_CARE'
		| 'INFORMATION'
		| 'CORPORATE_MANAGEMENT'
		| 'MANUFACTURING'
		| 'MINING'
		| 'SERVICES_OTHER'
		| 'SERVICES_PROFESSIONAL'
		| 'PUBLIC_ADMINISTRATION'
		| 'RENTAL_LEASING'
		| 'TRADE_RETAIL'
		| 'TRANSPORTATION'
		| 'UTILITIES'
		| 'WASTE_MANAGEMENT'
		| 'TRADE_WHOLESALE'
	personalLoanPurpose:
		| 'DEBT_CONSOLIDATION'
		| 'MEDICAL'
		| 'HOME_IMPROVEMENT'
		| 'CREDIT_CARD_CONSOLIDATION'
		| 'AUTO'
		| 'MOTORCYCLE'
		| 'MAJOR_PURCHASE'
		| 'NEW_BUSINESS'
		| 'BUSINESS_EXPANSION'
		| 'EDUCATION'
		| 'VACATION'
		| 'WEDDING'
		| 'OTHER'
	homeLoanOptIn: boolean
	homeLoanCurrentValue: number
	homeLoanCurrentBalance: number
	homeLoanCashOutAmount: number
	homeLoanPropertyType: 'SINGLE_FAMILY' | 'TOWNHOUSE' | 'CONDO' | 'MULTI_FAMILY' | 'MANUFACTURED' | 'MOBILE' | 'NONE'
	homeLoanPropertyUse: 'PRIMARY' | 'SECONDARY' | 'INVESTMENT'
	homeLoanRefinancePurpose:
		| 'LOWER_MONTHLY_PAYMENT'
		| 'FASTER_PAYOFF'
		| 'CASH_OUT'
		| 'ADJUSTABLE_TO_FIXED_RATE'
		| 'BROWSE_RATES'
	homeLoanHasSecondMortgage: boolean
	homeLoanSecondMortgageBalance: number
	homeLoanFirstTimeHomeBuyer: boolean
	homeLoanPurchasePrice: number
	homeLoanDownPaymentPercentage: number
	homeLoanPurchaseTimeFrame:
		| 'UNDER_CONTRACT'
		| 'MAKING_OFFERS'
		| 'LESS_THAN_THREE_MONTHS'
		| 'THREE_TO_SIX_MONTHS'
		| 'SIX_TO_TWELVE_MONTHS'
		| 'NOT_SURE'
	homeLoanHaveRealtor: boolean
	insuranceVehicleCount: number
	insuranceHaveExistingCoverage: boolean
	insuranceBundle: boolean
	insuranceContinuousCoverageRange:
		| 'LESS_THAN_TWO_YEARS'
		| 'TWO_TO_THREE_YEARS'
		| 'FOUR_TO_FIVE_YEARS'
		| 'SIX_TO_SEVEN_YEARS'
		| 'GREATER_THAN_SEVEN_YEARS'
	currentInsurerId: number
	agreeToTerms: boolean
	agreeToTcpaText: boolean
	creditCardBalanceTransferOptIn: boolean
	personalLoanDebtReliefOptIn: boolean
}
