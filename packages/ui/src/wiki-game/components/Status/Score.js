import React, { useState, useEffect, useRef } from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import Star from '@material-ui/icons/Star'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  emphasisIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    transition: 'opacity .5s',
    opacity: ({ show }) => (show ? 1 : 0),
  },
}))

const Score = ({ value }) => {
  const [showStar, setShowStar] = useState(false)
  const classes = useStyles({ show: showStar })
  const firstUpdate = useRef(true)

  useEffect(() => {
    var showTimeout
    if (firstUpdate.current) {
      firstUpdate.current = false
    } else {
      setShowStar(true)
      showTimeout = setTimeout(() => {
        setShowStar(false)
      }, 5000)
    }
    return () => {
      clearTimeout(showTimeout)
    }
  }, [value])
  return (
    <div className={classes.root}>
      {value}
      <Star className={classes.emphasisIcon} />
    </div>
  )
}

export default Score
