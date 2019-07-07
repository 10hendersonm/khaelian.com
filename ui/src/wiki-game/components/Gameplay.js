import React, { useState, useEffect } from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

// misc
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    alignSelf: 'stretch',
  },
}))

const Gameplay = ({ playerName, history }) => {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/article?playerName=${playerName}`
        )
        setArticle(data)
      } catch (err) {
        // do something
        setError(err.response)
      }
    }
    fetchData()
  }, [playerName])

  const [players, setPlayers] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/status')
        setPlayers(data.status)
      } catch (err) {
        // do something
        console.log(err.response)
      }
    }
    fetchData()
  }, [])

  const classes = useStyles()
  if (error) return <Redirect to="/setup" />
  if (!article) return <CircularProgress />

  const handleClick = guessedPlayerName => async () => {
    try {
      await axios.post('/api/judge_guess', {
        playerName: guessedPlayerName,
        articleTitle: article.title,
        judgeName: playerName,
      })
      // woot
      history.push('/correct')
    } catch (err) {
      // you suck
      history.push('/incorrect')
    }
  }

  var playerButtons = <CircularProgress />
  if (players) {
    playerButtons = Object.entries(players)
      .filter(([, playerData]) => !playerData.judge)
      .map(([playerName]) => (
        <Button fullWidth onClick={handleClick(playerName)}>
          {playerName}
        </Button>
      ))
  }

  return (
    <div className={classes.root}>
      <Typography variant="caption">Article</Typography>
      <Typography variant="h5">{article.title}</Typography>
      <Divider className={classes.divider} />
      {playerButtons}
    </div>
  )
}

export default withRouter(Gameplay)
