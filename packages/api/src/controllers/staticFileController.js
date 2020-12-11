import { Router, static } from 'express'
import path from 'path'

const app = Router()

const appDir = 'ui'
app.use(static(appDir))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(appDir, 'index.html'))
})

export default app
