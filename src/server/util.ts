import { IncomingHttpHeaders } from 'http'

export function probablyBrowser(headers: IncomingHttpHeaders): boolean {
  return !!(
    headers['user-agent']?.includes('Gecko') && // Modern browser tries to be like Gecko
    headers['accept']?.includes('text/html') &&
    headers['sec-ch-ua']
  )
}
