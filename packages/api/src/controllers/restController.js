import { Router } from 'express'
import Article from '../models/Article'
import Player from '../models/Player'

import { randomItem } from '../utils/array'

import * as giphyService from '../services/giphyService'

export default (wss) => {
  var players = {}

  const app = Router()

  const broadcastStatus = () => {
    console.log('broadcasting status')
    wss.broadcast(getStatus())
  }

  const getStatus = () => {
    var broadcastPlayers = {}
    Object.entries(players).forEach(([name, value]) => {
      broadcastPlayers[name] = {
        ...value,
        article: !!value.article,
      }
    })
    return {
      status: broadcastPlayers,
    }
  }

  app.get('/status', (req, res) => {
    res.json(getStatus())
  })

  app.post('/join', (req, res) => {
    const { name, role } = req.query
    var player = new Player(name, role)
    if (player.judge) {
      Object.entries(players).forEach(([playerName, playerData]) => {
        players[playerName] = {
          ...playerData,
          judge: false,
        }
      })
    }
    const prevPlayer = players[name]
    if (prevPlayer) {
      player = {
        ...player,
        score: prevPlayer.score,
      }
    }
    players[name] = player

    broadcastStatus()
    res.sendStatus(201)
  })

  app.post('/article', (req, res) => {
    const { link, title, playerName } = req.body
    console.log('/article')
    if (!link || !title) {
      res.sendStatus(400)
      return
    }
    const article = new Article(req.body)
    players[playerName].article = article
    console.log('broadcasting status')
    broadcastStatus()
    res.sendStatus(201)
  })

  app.get('/article', (req, res) => {
    const { playerName } = req.query
    const currentPlayer = players[playerName]
    if (!currentPlayer) {
      res.sendStatus(401)
      return
    }
    if (!currentPlayer.judge) {
      res.sendStatus(403)
      return
    }

    const playerArr = Object.values(players).filter(({ judge }) => !judge)
    const randomPlayer = randomItem(playerArr)
    const { title, link } = randomPlayer.article

    res.json({
      title,
      link,
    })
  })

  app.post('/judge_guess', (req, res) => {
    const { playerName, articleTitle, judgeName } = req.body
    const selectedPlayer = players[playerName]
    const judge = players[judgeName]

    if (!selectedPlayer || !judge) {
      res.sendStatus(404)
      return
    }
    selectedPlayer.score++
    if (selectedPlayer.article.title === articleTitle) {
      judge.score++
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }

    Object.entries(players).forEach(([name, data]) => {
      const { article } = data
      if (article && article.title === articleTitle) {
        players[name] = {
          ...data,
          article: null,
        }
      }
    })
    broadcastStatus()
  })

  app.get('/image', async (req, res) => {
    const { correct } = req.query
    const imageUrl = await giphyService.getImage(correct === 'true')
    res.send(imageUrl)
  })

  return app
}
