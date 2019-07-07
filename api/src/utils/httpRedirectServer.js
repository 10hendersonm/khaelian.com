import express from 'express'

export default () => {
  const app = express()

  app.all('*', (req, res) => {
    return res.redirect('https://' + req.headers['host'] + req.url)
  })

  app.listen(process.env.HTTP_PORT || 8081)
}
