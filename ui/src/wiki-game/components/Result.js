import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

// misc
import { Redirect } from 'react-router-dom'

// custom
import useCountdown from '../hooks/useCountdown'
import useRandomImage from '../hooks/useRandomImage'
import Setup from './Setup'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {
    alignSelf: 'stretch',
  },
  text: {
    margin: theme.spacing(5),
  },
}))

const Result = ({ correct, ...setupProps }) => {
  const redirectCount = useCountdown(10)
  const imageUrl = useRandomImage(correct)
  const classes = useStyles()
  if (redirectCount === 0) return <Redirect to="/setup" />
  return (
    <div className={classes.root}>
      <Setup {...setupProps} />
      <Typography className={classes.text} variant="h4">
        {correct ? 'Correct!' : `Incorrect`}
      </Typography>
      {imageUrl && <img src={imageUrl} alt={''} />}
    </div>
  )
}

export default Result
