import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'dotenv'
import { IncomingHttpHeaders } from 'http'

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

export function probablyBrowser(headers: IncomingHttpHeaders): boolean {
  return !!(
    headers['user-agent']?.includes('Mozilla/5.0') &&
    headers['accept']?.includes('text/html') &&
    headers['sec-ch-ua']
  )
}
