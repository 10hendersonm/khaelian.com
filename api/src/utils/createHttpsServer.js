import https from 'https'
import http from 'http'
import fs from 'fs'

export default app => {
  const { SITE_DOMAIN, APP_ENV } = process.env
  if (APP_ENV === 'dev') return http.createServer(app)
  const sslFiles = ['privkey.pem', 'cert.pem', 'chain.pem']
  const [privateKey, certificate, ca] = sslFiles.map(fileName =>
    fs.readFileSync(`/etc/letsencrypt/live/${SITE_DOMAIN}/${fileName}`, 'utf8')
  )
  const sslCredentials = {
    key: privateKey,
    cert: certificate,
    ca,
  }
  const server = https.createServer(sslCredentials, app)
  return server
}
