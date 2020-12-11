import React from 'react'

import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'

const inches = 1

const useStyles = makeStyles({
  sideRoot: {
    position: 'relative',
    height: 72.5 * inches,
    width: 164.3 * inches - 12.5 * inches,
  },
  rearRoot: {
    position: 'relative',
    height: 72.5 * inches,
    width: 73.7 * inches,
  },
  sideRollCage: {
    position: 'absolute',
    // backgroundColor: 'white',
    border: '5px solid black',
    left: 15 * inches,
    top: 0,
    height: 20 * inches,
    right: 45 * inches,
    borderRadius: 5,
  },
  rearRollCage: {
    position: 'absolute',
    // backgroundColor: 'white',
    border: '5px solid black',
    top: 0,
    height: 20 * inches,
    width: 55 * inches,
    borderRadius: 5,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sideBody: {
    position: 'absolute',
    backgroundColor: 'black',
    height: 30 * inches,
    left: 12.5 * inches,
    right: 0,
    bottom: 20 * inches,
  },
  rearBody: {
    position: 'absolute',
    backgroundColor: 'black',
    height: 30 * inches,
    width: 68 * inches,
    bottom: 20 * inches,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  sideWheel: {
    position: 'absolute',
    backgroundColor: 'black',
    border: '3px solid white',
    borderRadius: '100%',
    height: 33 * inches,
    width: 33 * inches,
    bottom: 0,
    '&.rear': {
      left: 22.5 * inches,
    },
    '&.front': {
      right: 3 * inches,
    },
    '&.spare': {
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 25,
    },
  },
  rearWheel: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 0,
    height: 33 * inches,
    width: 12.5 * inches,
    borderRadius: 3,
    '&.rear': {
      left: 0,
    },
    '&.front': {
      right: 0,
    },
    '&.spare': {
      left: 0,
      bottom: 25,
    },
  },
})

const JeepProfile = ({ classes: propClasses, view = 'side' }) => {
  if (!propClasses) propClasses = {}
  const classes = useStyles()
  if (view === 'side') {
    return (
      <div className={classNames(classes.sideRoot, propClasses.root)}>
        <div className={classes.sideRollCage} />
        <div className={classes.sideBody} />
        <div className={classNames(classes.sideWheel, 'rear')} />
        <div className={classNames(classes.sideWheel, 'front')} />
        <div className={classNames(classes.rearWheel, 'spare')} />
      </div>
    )
  } else {
    return (
      <div className={classNames(classes.rearRoot, propClasses.root)}>
        <div className={classes.rearRollCage} />
        <div className={classes.rearBody} />
        <div className={classNames(classes.rearWheel, 'rear')} />
        <div className={classNames(classes.rearWheel, 'front')} />
        <div className={classNames(classes.sideWheel, 'spare')} />
      </div>
    )
  }
}

export default JeepProfile
