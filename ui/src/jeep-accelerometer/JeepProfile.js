import React from 'react'

import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'

const inches = 1
const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: 72.5 * inches,
    width: 164.3 * inches,
  },
  rollCage: {
    position: 'absolute',
    backgroundColor: 'white',
    border: '5px solid black',
    left: 0,
    top: 0,
    height: 20 * inches,
    width: 115 * inches,
    borderRadius: 5,
  },
  body: {
    position: 'absolute',
    backgroundColor: 'black',
    height: 30 * inches,
    width: 164.3 * inches,
    bottom: 20 * inches,
  },
  wheel: {
    position: 'absolute',
    backgroundColor: 'black',
    border: '3px solid white',
    borderRadius: '100%',
    height: 33 * inches,
    width: 33 * inches,
    bottom: 0,
    '&.rear': {
      left: 10,
    },
    '&.front': {
      right: 10,
    },
  },
})

const JeepProfile = ({ classes: propClasses }) => {
  if (!propClasses) propClasses = {}
  const classes = useStyles()
  return (
    <div className={classNames(classes.root, propClasses.root)}>
      <div className={classes.body} />
      <div className={classes.rollCage} />
      <div className={classNames(classes.wheel, 'rear')} />
      <div className={classNames(classes.wheel, 'front')} />
    </div>
  )
}

export default JeepProfile
