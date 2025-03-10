import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'dotenv'

export function dotenv() {
  try {
    const envPath = join(process.cwd(), '.env')
    const env = existsSync(envPath) ? parse(readFileSync(envPath)) : {}
    if (env) {
      console.log('Loaded `.env` configuration:', env)
      env.NODE_ENV = env.NODE_ENV || 'production' // Default
      console.log(`\nYou're in ${env.NODE_ENV}.\n`)
    }
    return env
  } catch (error) {
    console.error(error)
  }
}
