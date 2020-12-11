import React, { useState, useEffect } from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

// custom
import useWebSocket from '../hooks/useWebSocket'
import PlayerStatus from './Status/PlayerStatus'
import OptionalLink from './OptionalLink'

// misc
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  gameStartLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

const Setup = ({ websocket, playerName: currentPlayerName }) => {
  const [gameStatus, setGameStatus] = useState(null)
  const [article, setArticle] = useState(null)
  useWebSocket({
    connection: websocket,
    onMessage: data => {
      if (data.status) {
        setGameStatus(data.status)
      }
      if (data.article !== undefined) {
        setArticle(data.article)
      }
    },
  })
  const getStatus = async () => {
    try {
      const res = await axios.get('/api/status')
      const { data } = res
      setGameStatus(data.status)
    } catch (err) {
      // do something
    }
  }
  useEffect(() => {
    getStatus()
  }, [])

  const classes = useStyles()

  if (!gameStatus) return <CircularProgress />
  if (!Object.keys(gameStatus).length) {
    return <Redirect to="/" />
  }

  var currentPlayerIsJudge = false
  var currentPlayerListed = false
  var playersReadyCount = 0
  const playerStatuses = Object.entries(gameStatus)
    .sort((a, b) => {
      const [, aData] = a
      const [, bData] = b
      if (aData.judge && !bData.judge) return -1
      if (!aData.judge && bData.judge) return 1
      return 0
    })
    .map(([playerName, playerData]) => {
      const activePlayer = playerData.name === currentPlayerName
      if (activePlayer) {
        currentPlayerListed = true
        if (playerData.judge) currentPlayerIsJudge = true
      }
      if (playerData.judge || playerData.article) playersReadyCount++
      return (
        <PlayerStatus
          key={`player-status-${playerName}`}
          name={playerData.name}
          activePlayer={activePlayer}
          articleSelected={playerData.article}
          score={playerData.score}
          judge={playerData.judge}
          showIcon
        />
      )
    })

  if (!currentPlayerListed) return <Redirect to="/" />

  const gameStartDisabled =
    playersReadyCount < 2 || playersReadyCount < Object.keys(gameStatus).length
  return (
    <div className={classes.root}>
      <PlayerStatus showIcon demo />
      <Divider />
      {playerStatuses}
      {!currentPlayerIsJudge && !!article && (
        <>
          <Typography variant="caption">Article</Typography>
          <Typography variant="h5">{article}</Typography>
        </>
      )}
      {currentPlayerIsJudge && (
        <OptionalLink
          disabled={gameStartDisabled}
          className={classes.gameStartLink}
          to="/play"
        >
          <Button fullWidth disabled={gameStartDisabled}>
            Start Round
          </Button>
        </OptionalLink>
      )}
    </div>
  )
}

export default Setup
