// server
import createHttpsServer from './utils/createHttpsServer'
import createHttpRedirectServer from './utils/httpRedirectServer'
import configureWebSocketConnection from './controllers/webSocketController'

// express
import express from 'express'
import restController from './controllers/restController'
import staticFileController from './controllers/staticFileController'
import bodyParser from 'body-parser'
import cors from 'cors'

// misc
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

var app = express()

const server = createHttpsServer(app)
createHttpRedirectServer()
const wss = configureWebSocketConnection(server, '/websocket')

app.use(cors())
app.use(bodyParser.json())
app.use('/api', restController(wss))
app.use(staticFileController)

const port = process.env.HTTPS_PORT || 8080

const dev = process.env.APP_ENV === 'dev'
const host = dev ? app : server


host.listen(port, () => {
  console.log(chalk.blue(`API available on port ${chalk.yellow(port)}.`))
})
