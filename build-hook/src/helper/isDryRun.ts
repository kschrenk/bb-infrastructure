import { IncomingHttpHeaders } from 'http'

export const isDryRun = (headers: IncomingHttpHeaders) => headers["x-dry-run"]