// server
import createHttpsServer from './utils/createHttpsServer'
import createHttpRedirectServer from './utils/httpRedirectServer'
import configureWebSocketConnection from './controllers/webSocketController'

// express
import express from 'express'
import restController from './controllers/restController'
import smsController from './controllers/smsController'
import staticFileController from './controllers/staticFileController'
import bodyParser from 'body-parser'
import cors from 'cors'
import request from 'request'

// misc
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.HTTPS_PORT || 8080

var app = express()
const server = createHttpsServer(app)
createHttpRedirectServer()
const wss = configureWebSocketConnection(server, '/websocket')

app.use(cors())
app.use(bodyParser.json())
app.use('/', (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

app.use('/api', restController(wss))
app.use('/sms', smsController)

const dev = process.env.APP_ENV === 'dev'

if (dev) {
  app.all('*', (req, res) => {
    const url = `http://localhost:3000${req.url}`
    req.pipe(request(url)).pipe(res)
  })
} else {
  app.use(staticFileController)
}

server.listen(port, () => {
  console.log(chalk.blue(`API available on port ${chalk.yellow(port)}.`))
})
