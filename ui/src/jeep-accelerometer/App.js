import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import JeepProfile from './JeepProfile'
import useWakelock from './hooks/useWakelock'
import { Typography } from '@material-ui/core'

const inches = 1
const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  rearView: {
    margin: 60,
    transform: props => `rotate(${props.camberAngle}deg)`,
  },
  sideView: {
    margin: 60,
    transform: props => `rotate(${props.descentAngle}deg)`,
  },
  infoSquare: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const App = () => {
  useWakelock()
  const [currentOrientation, setCurrentOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })

  const handleDeviceMotion = e => {
    console.log(window.orientation)
    var orientation = {}
    const readProps = ['alpha', 'beta', 'gamma']
    var changed = false
    readProps.forEach(readProp => {
      orientation[readProp] = Math.floor(e[readProp])
      if (orientation[readProp] !== currentOrientation[readProp]) changed = true
    })
    if (changed) {
      setCurrentOrientation(orientation)
    }
  }
  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceMotion, true)
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceMotion, true)
    }
  }, [])

  var gamma = currentOrientation.gamma
  if (gamma < 0) gamma += 180
  var descentAngle = 90 - gamma

  var camberAngle = -currentOrientation.beta

  if (window.orientation === 90) {
    descentAngle = descentAngle * -1
    camberAngle = camberAngle * -1
  }

  if (descentAngle <= 0) {
    camberAngle = camberAngle * -1 - 180
  }

  const classes = useStyles({
    descentAngle,
    camberAngle,
    ...currentOrientation,
  })

  const ascentAngle = -descentAngle
  const leanAngle = Math.abs(camberAngle)

  return (
    <div className={classes.root}>
      {window.orientation === 0 ? (
        <Typography variant="h4">Fuck off, Ted</Typography>
      ) : (
        <>
          <div className={classes.infoSquare}>
            <JeepProfile view="rear" classes={{ root: classes.rearView }} />
            <Typography variant="h5">{`${leanAngle}°`}</Typography>
          </div>
          <div className={classes.infoSquare}>
            <JeepProfile view="side" classes={{ root: classes.sideView }} />
            <Typography variant="h5">{`${ascentAngle}°`}</Typography>
          </div>
        </>
      )}
    </div>
  )
}
export default App
