import { sleep } from 'src/lib/sleep'
import { Session } from 'src/Session'

export interface LoadTestConfig {
	sessions: number
	duration: number
}

export class LoadTest {
	private startedAt?: number
	private concurrentCount = 0
	constructor(public config: LoadTestConfig) {
		console.log('load test', this.config)
	}
	get ellapsedMs() {
		if (this.startedAt) {
			return Date.now() - this.startedAt
		}
		return 0
	}
	get timeRemaining() {
		const durationMs = this.config.duration * 60 * 1000
		return durationMs - this.ellapsedMs
	}
	async start() {
		this.startedAt = Date.now()
		this.progressLog()
		for (let i = 0; i < this.config.sessions; i++) {
			// fire up a session
			this.startSession()
			// increment concurrency count
			this.concurrentCount++
			// wait a second, to allow a slow ramp up
			await sleep(1000)
		}
	}
	async progressLog() {
		setTimeout(() => {
			const remainingSeconds = Math.round(this.timeRemaining / 1000)
			process.stdout.cursorTo(0)
			if (remainingSeconds < 1) {
				process.stdout.write(`Ramping Down - Waiting for active sessions to complete...`)
			} else {
				process.stdout.write(`Time remaining: ${remainingSeconds} -- Concurrency: ${this.concurrentCount}`)
				this.progressLog()
			}
		}, 1000)
	}
	private async startSession() {
		if (!this.startedAt) {
			throw new Error()
		}
		const session = new Session()
		await session.run()
		const ellapsedMs = Date.now() - this.startedAt
		if (ellapsedMs < this.config.duration * 60 * 1000) {
			this.startSession()
		}
	}
}
