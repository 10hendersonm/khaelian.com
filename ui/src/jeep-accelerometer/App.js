import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

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
    backgroundColor: 'black',
    display: 'block',
    height: 72.5 * inches,
    width: 164.3 * inches,
    transform: props => `rotate(${props.gamma - 90}deg)`,
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
  const classes = useStyles(currentOrientation)

  const resetBaseOrientation = () => {
    setBaseOrientation(currentOrientation)
  }

  const handleDeviceMotion = e => {
    console.log(e)
    const { alpha, beta, gamma } = e
    const orientation = {
      alpha,
      beta,
      gamma,
      set: true,
    }
    setCurrentOrientation(orientation)
    if (baseOrientation === null) setBaseOrientation(orientation)
  }
  useEffect(() => {
    window.addEventListener('devicemotion', handleDeviceMotion, true)
    window.addEventListener('deviceorientation', handleDeviceMotion, true)
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceMotion, true)
    }
  }, [])
  return (
    <div>
      {JSON.stringify(currentOrientation)}
      <div className={classes.rearView} />
      <div className={classes.sideView} />
      <Button onClick={resetBaseOrientation}>Reset Orientation</Button>
    </div>
  )
}
export default App
