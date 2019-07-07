import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import JeepProfile from './JeepProfile'

const inches = 1
const useStyles = makeStyles(theme => ({
  rearView: {
    margin: 20,
    backgroundColor: 'black',
    display: 'block',
    height: 72.5 * inches,
    width: 73.7 * inches,
    transform: props => `rotate(${props.alpha}deg)`,
  },
  sideView: {
    margin: 20,
    transform: props => `rotate(${props.climbAngle}deg)`,
  },
}))

const defaultOrientation = {
  set: false,
  alpha: 0,
  beta: 0,
  gamma: 0,
}
const App = () => {
  const [baseOrientation, setBaseOrientation] = useState(defaultOrientation)
  const [currentOrientation, setCurrentOrientation] = useState(
    defaultOrientation
  )

  const resetBaseOrientation = () => {
    setBaseOrientation(currentOrientation)
  }

  const handleDeviceMotion = e => {
    var orientation = {
      set: true,
    }
    const readProps = ['alpha', 'beta', 'gamma']
    var changed = false
    readProps.forEach(readProp => {
      orientation[readProp] = Math.floor(e[readProp])
      if (orientation[readProp] !== currentOrientation[readProp]) changed = true
    })
    if (changed) {
      setCurrentOrientation(orientation)
    }
    if (baseOrientation === null) setBaseOrientation(orientation)
  }
  useEffect(() => {
    window.addEventListener('devicemotion', handleDeviceMotion, true)
    window.addEventListener('deviceorientation', handleDeviceMotion, true)
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceMotion, true)
    }
  }, [])

  const climbAngle = 90 - currentOrientation.gamma

  const classes = useStyles({
    climbAngle,
    ...currentOrientation,
  })

  return (
    <div>
      {JSON.stringify(currentOrientation)}
      <div className={classes.rearView} />
      <JeepProfile classes={{ root: classes.sideView }} />
      <Button onClick={resetBaseOrientation}>Reset Orientation</Button>
    </div>
  )
}
export default App
