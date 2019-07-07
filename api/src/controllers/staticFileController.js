import express, { Router } from 'express'
import path from 'path'

const app = Router()

const appDir = 'ui/build'
app.use(express.static(appDir))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(appDir, 'index.html'))
})

export default app
