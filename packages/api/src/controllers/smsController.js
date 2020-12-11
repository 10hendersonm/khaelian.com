import { Router } from 'express'

const app = new Router()

var messageQueue = []
app.post('/send', (req, res) => {
  messageQueue.push(req.body)
  console.log(messageQueue)
  res.sendStatus(200)
})

app.post('/receive', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

app.get('/', (req, res) => {
  var firstMessage = messageQueue.shift()

  if (!firstMessage) {
    console.log('No messages to retrieve')
    res.sendStatus(200)
  } else {
    console.log('Message retrieved')
    res.json({
      ...firstMessage,
      more: !!messageQueue.length,
    })
  }
})

export default app
