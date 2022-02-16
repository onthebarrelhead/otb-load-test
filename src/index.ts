import inquirer from 'inquirer'
import { LoadTestConfig, LoadTest } from 'src/LoadTest'

async function run() {
	const config = await inquirer.prompt<LoadTestConfig>([
		{
			name: 'sessions',
			message: 'How many sessions?',
			type: 'number',
			default: 1000
		},
		{
			name: 'duration',
			message: 'How many minutes?',
			type: 'number',
			default: 1
		}
	])
	const loadTest = new LoadTest(config)
	await loadTest.start()
}

run()
