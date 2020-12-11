import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import JeepProfile from './JeepProfile'
import { Typography } from '@material-ui/core'
import NoSleep from 'nosleep.js'
import useEventListener from './hooks/useEventListener'

const noSleep = new NoSleep()

// const inches = 1
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
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 100px)',
  },
  secondaryInfo: {
    color: 'red',
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -100%) translateY(-100px)',
    '&.left': {
      transform: 'translate(-50%, -50%) translateY(-85px) translateX(-85px)',
    },
    '&.right': {
      transform: 'translate(-50%, -50%) translateY(-85px) translateX(85px)',
    },
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
    transition: 'transform .1s',
    transform: props => `translate(-50%, -50%) rotate(${props.camberAngle}deg)`,
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
  rearMax: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: '100%',
    transition: 'transform .1s',
    transform: props =>
      `translate(-50%, -50%) rotate(${props.maxCamberAngle + 1}deg)`,
    '&.left': {
      transform: props =>
        `translate(-50%, -50%) rotate(${-(props.maxCamberAngle + 1)}deg)`,
    },
    overflow: 'hidden',
    '& .bar': {
      borderRight: '2px solid red',
      top: 0,
      left: 0,
      right: '50%',
      bottom: '50%',
      position: 'absolute',
    },
  },
  sideBackground: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '100%',
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
  sideStatus: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transition: 'transform .1s',
    transform: props => `translate(-50%, -50%) rotate(${-props.climbAngle}deg)`,
    borderRadius: '100%',
    overflow: 'hidden',
    '& .bar': {
      borderBottom: '2px solid black',
      top: 0,
      left: 0,
      right: 0,
      bottom: '50%',
      position: 'absolute',
    },
  },
  sideLogo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transition: 'transform .1s',
    transform: props => `translate(-50%, -50%) rotate(${-props.climbAngle}deg)`,
  },
  sideMax: {
    height: 200,
    width: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: '100%',
    transition: 'transform .1s',
    '&.max': {
      transform: props =>
        `translate(-50%, -50%) rotate(${89 - props.maxClimbAngle}deg)`,
    },
    '&.min': {
      transform: props =>
        `translate(-50%, -50%) rotate(${272 - props.minClimbAngle}deg)`,
    },
    overflow: 'hidden',
    '& .bar': {
      borderRight: '2px solid red',
      top: 0,
      left: 0,
      right: '50%',
      bottom: '50%',
      position: 'absolute',
    },
  },
}))

const App = () => {
  const [wakeLock, setWakeLock] = useState(false)
  // const [fullscreen, setFullscreen] = useState(false)

  // const handleToggleFullscreen = e => {
  //   if (fullscreen) {
  //     document.exitFullscreen()
  //   } else {
  //     document.body.requestFullscreen()
  //   }
  // }

  const handleEnableWakeLock = e => {
    if (wakeLock) {
      noSleep.disable()
      setWakeLock(false)
    } else {
      noSleep.enable()
      setWakeLock(true)
    }
  }
  const [trim, setTrim] = useState({ climbAngle: 0, camberAngle: 0 })

  const [climbAngle, setClimbAngle] = useState(0)
  const [camberAngle, setCamberAngle] = useState(0)
  const [maxClimbAngle, setMaxClimbAngle] = useState(0)
  const [minClimbAngle, setMinClimbAngle] = useState(0)
  const [maxCamberAngle, setMaxCamberAngle] = useState(0)

  const handleDeviceMotion = e => {
    const { alpha, beta, gamma, /*absolute*/ } = e
    if (alpha === 0 && beta === 0 && gamma === 0) return
    console.log(e)
    var baseClimbAngle = (90 - Math.abs(gamma)) * (gamma > 0 ? -1 : 1)
    const isFlipped = window.orientation === 90
    if (isFlipped) {
      baseClimbAngle = -baseClimbAngle
    }

    var baseCamberAngle =
      baseClimbAngle < 0 ? beta : (180 - Math.abs(beta)) * (beta > 0 ? 1 : -1)

    if (isFlipped) {
      baseCamberAngle = -baseCamberAngle
    }

    baseClimbAngle = Math.round(baseClimbAngle)
    baseCamberAngle = Math.round(baseCamberAngle)
    setClimbAngle(baseClimbAngle)
    setCamberAngle(baseCamberAngle)

    const trimmedClimbAngle = climbAngle - trim.climbAngle
    const trimmedCamberAngle = baseCamberAngle - trim.camberAngle

    const absCamberAngle = Math.abs(trimmedCamberAngle)
    if (absCamberAngle > maxCamberAngle) {
      setMaxCamberAngle(absCamberAngle)
    }

    if (trimmedClimbAngle > maxClimbAngle) setMaxClimbAngle(trimmedClimbAngle)

    if (trimmedClimbAngle < minClimbAngle) setMinClimbAngle(trimmedClimbAngle)
  }

  useEventListener('deviceorientationabsolute', handleDeviceMotion)

  const zeroTrim = () => {
    setTrim({
      climbAngle,
      camberAngle,
    })
    setMaxClimbAngle(0)
    setMinClimbAngle(0)
    setMaxCamberAngle(0)
  }

  const trimmedClimbAngle = climbAngle - trim.climbAngle
  const trimmedCamberAngle = camberAngle - trim.camberAngle

  const classes = useStyles({
    climbAngle: trimmedClimbAngle,
    camberAngle: trimmedCamberAngle,
    maxCamberAngle,
    minClimbAngle,
    maxClimbAngle,
  })

  const leanAngle = Math.abs(trimmedCamberAngle)

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
        {/* <Button
          onClick={handleToggleFullscreen}
          variant="contained"
          color={fullscreen ? null : 'primary'}
        >
          {fullscreen ? 'Disable Full Screen' : 'Enable Full Screen'}
        </Button> */}
      </div>
      {window.orientation === 0 ? (
        <Typography variant="h4">Rotate Device</Typography>
      ) : (
        <>
          <div className={classes.rear}>
            {/* <div className={classes.rearMax}>
              <div className={'bar'} />
            </div>
            <div className={classNames(classes.rearMax, 'left')}>
              <div className={'bar'} />
            </div> */}
            <div className={classes.rearBackground}>
              <div className={'horizon'} />
              <div className={'bar'} />
            </div>
            <JeepProfile view="rear" classes={{ root: classes.rearLogo }} />
            <Typography
              className={classes.info}
              variant="h5"
            >{`${leanAngle}°`}</Typography>
            {/* <Typography
              className={classes.secondaryInfo}
              variant="h5"
            >{`${maxCamberAngle}°`}</Typography> */}
          </div>
          <div className={classes.rear}>
            {/* <div className={classNames(classes.sideMax, 'min')}>
              <div className={'bar'} />
            </div>
            <div className={classNames(classes.sideMax, 'max')}>
              <div className={'bar'} />
            </div> */}
            <div className={classes.sideBackground}>
              <div className={'horizon'} />
              <div className={'bar'} />
            </div>
            <div className={classes.sideStatus}>
              <div className={'horizon'} />
              <div className={'bar'} />
            </div>
            <JeepProfile view="side" classes={{ root: classes.sideLogo }} />
            <Typography
              className={classes.info}
              variant="h5"
            >{`${trimmedClimbAngle}°`}</Typography>
            {/* <Typography
              className={classNames(classes.secondaryInfo, 'left')}
              variant="h5"
            >{`${minClimbAngle}°`}</Typography> */}
            {/* <Typography
              className={classNames(classes.secondaryInfo, 'right')}
              variant="h5"
            >{`${maxClimbAngle}°`}</Typography> */}
          </div>
        </>
      )}
    </div>
  )
}
export default App
