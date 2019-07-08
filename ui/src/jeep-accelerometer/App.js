import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import JeepProfile from './JeepProfile'
import useWakelock from './hooks/useWakelock'
import { Typography } from '@material-ui/core'
import NoSleep from 'nosleep.js'

const noSleep = new NoSleep()

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
    margin: 20,
  },
  info: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 100px)',
  },
  rear: {
    position: 'relative',
  },
  rearLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  rearBackground: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: '100%',
    transform: props =>
      `translate(-50%, -50%) rotate(${-props.camberAngle}deg)`,
    overflow: 'hidden',
    '& .bar': {
      borderRight: '2px solid black',
      top: 0,
      left: 0,
      right: '50%',
      bottom: '50%',
      position: 'absolute',
    },
    '& .horizon': {
      backgroundColor: 'rgba(0,0,0,.3)',
      borderTop: '2px solid black',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      bottom: 0,
    },
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
  const [wakeLock, setWakeLock] = useState(false)

  const handleEnableWakeLock = e => {
    if (wakeLock) {
      noSleep.disable()
      setWakeLock(false)
    } else {
      noSleep.enable()
      setWakeLock(true)
    }
  }

  const [currentOrientation, setCurrentOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })

  const handleDeviceMotion = e => {
    const eventProps = ['alpha', 'beta', 'gamma']
    if (
      !!eventProps.find(
        eventProp =>
          Math.abs(e[eventProp] - currentOrientation[eventProp]) > 0.5
      )
    ) {
      const { alpha, beta, gamma } = e
      setCurrentOrientation({
        alpha,
        beta,
        gamma,
      })
    }
  }
  useEffect(() => {
    const event = 'deviceorientationabsolute'
    window.addEventListener(event, handleDeviceMotion, true)
    return () => {
      window.removeEventListener(event, handleDeviceMotion, true)
    }
  }, [])

  var gamma = currentOrientation.gamma
  if (gamma < 0) gamma += 180
  var baseDescentAngle = 90 - gamma

  var baseCamberAngle = -currentOrientation.beta

  if (window.orientation === 90) {
    baseDescentAngle = baseDescentAngle * -1
    baseCamberAngle = baseCamberAngle * -1
  }

  if (baseDescentAngle <= 0) {
    baseCamberAngle = baseCamberAngle * -1 - 180
  }

  const [trim, setTrim] = useState({ descentAngle: 0, camberAngle: 0 })
  const zeroTrim = () => {
    setTrim({
      descentAngle: baseDescentAngle,
      camberAngle: baseCamberAngle,
    })
  }

  const descentAngle = baseDescentAngle - trim.descentAngle
  const camberAngle = baseCamberAngle - trim.camberAngle

  const classes = useStyles({
    descentAngle,
    camberAngle,
    ...currentOrientation,
  })

  const ascentAngle = -descentAngle
  const leanAngle = Math.abs(camberAngle)

  return (
    <div className={classes.root}>
      <div className={classes.infoContainer}>
        <Button onClick={zeroTrim}>Set Level</Button>
        <Button
          onClick={handleEnableWakeLock}
          variant="contained"
          color={wakeLock ? null : 'primary'}
        >
          {wakeLock ? 'Disable Wake Lock' : 'Enable Wake Lock'}
        </Button>
        {JSON.stringify(currentOrientation)}
      </div>
      {window.orientation === 0 ? (
        <Typography variant="h4">Rotate Device</Typography>
      ) : (
        <>
          <div className={classes.rear}>
            {/* <JeepProfile view="rear" classes={{ root: classes.rearView }} /> */}
            <div className={classes.rearBackground}>
              <div className={'horizon'} />
              <div className={'bar'} />
            </div>
            <JeepProfile view="rear" classes={{ root: classes.rearLogo }} />
            <Typography
              className={classes.info}
              variant="h5"
            >{`${leanAngle}°`}</Typography>
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
