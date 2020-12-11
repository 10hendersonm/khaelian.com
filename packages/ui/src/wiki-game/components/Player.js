import React, { useState, useEffect } from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// misc
import axios from 'axios'
import classNames from 'classnames'
import { Redirect } from 'react-router-dom'

// custom
import HomeButton from './HomeButton'
import RandomArticleButton from './RandomArticleButton'
import LoadingButton from './LoadingButton'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  articleTitle: {
    textTransform: 'capitalize',
  },
  buttonRoot: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    margin: theme.spacing(2),
  },
  confirmationFields: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'opacity .5s',
    opacity: 0,
    '&.active': {
      opacity: 1,
    },
  },
}))

const Player = ({ name, playerRole }) => {
  const [joinedGame, setJoinedGame] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (name) {
      const joinGame = async () => {
        try {
          await axios.post(`/api/join?name=${name}&role=${playerRole}`)
          setJoinedGame(true)
          if (playerRole === 'judge') {
            setReady(true)
          }
        } catch {}
      }
      joinGame()
    }
  }, [name, playerRole])
  const [wikiLink, setWikiLink] = useState('')
  const [loading, setLoading] = useState(false)
  const clearResult = () => {
    setWikiLink('')
  }
  const handleChange = e => {
    const link = e.target.value
    if (!/^https.*wikipedia.*wiki/.test(link)) {
      return
    }
    setWikiLink(link)
  }

  const classes = useStyles()
  const articleTitle = decodeURIComponent(wikiLink)
    .replace(/_/g, ' ')
    .replace(/^.*wiki\//i, '')

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post('/api/article', {
        link: wikiLink,
        title: articleTitle,
        playerName: name,
      })
      setReady(true)
    } catch (err) {
      console.log('Error posting article', err)
    }
    setLoading(false)
  }

  if (!joinedGame) return <CircularProgress />
  if (ready) return <Redirect to="/setup" />

  return (
    <div className={classes.root}>
      <div className={classes.buttonRoot}>
        <HomeButton />
        <RandomArticleButton />
      </div>
      <TextField
        fullWidth
        label="Paste a Wikipedia Link"
        disabled={!!wikiLink}
        value={wikiLink}
        onChange={handleChange}
      />
      <div
        className={classNames(classes.confirmationFields, {
          active: !!wikiLink,
        })}
      >
        <Typography>Are you sure you want to submit this article?</Typography>
        <Typography variant="h6" className={classes.articleTitle}>
          {articleTitle}
        </Typography>
        <div className={classes.buttonRoot}>
          <Button
            className={classes.actionButton}
            color="primary"
            onClick={clearResult}
            disabled={loading || !wikiLink}
          >
            Clear
          </Button>
          <LoadingButton
            className={classes.actionButton}
            variant={!!wikiLink && !loading ? 'contained' : 'flat'}
            color="primary"
            disabled={!wikiLink}
            onClick={handleSubmit}
            loading={loading}
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}

export default Player
