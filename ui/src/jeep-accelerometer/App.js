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

const App = () => {
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

  // const isClimb = currentOrientation.alpha < 0 && currentOrientation.beta < 0
  var gamma = currentOrientation.gamma
  if (gamma < 0) gamma += 180
  var climbAngle = 90 - gamma

  const classes = useStyles({
    climbAngle,
    ...currentOrientation,
  })

  return (
    <div>
      {JSON.stringify(currentOrientation)}
      <div className={classes.rearView} />
      <JeepProfile classes={{ root: classes.sideView }} />
      {climbAngle}
      {/* <Button onClick={resetBaseOrientation}>Reset Orientation</Button> */}
    </div>
  )
}
export default App
