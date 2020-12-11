import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  progressRoot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    opacity: ({ loading }) => (loading ? 1 : 0),
    transition: 'opacity .5s',
  },
}))

const LoadingButton = props => {
  const { loading, disabled, ...buttonProps } = props
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <Button disabled={loading || disabled} {...buttonProps} />
      <div className={classes.progressRoot}>
        <CircularProgress />
      </div>
    </div>
  )
}

export default LoadingButton
