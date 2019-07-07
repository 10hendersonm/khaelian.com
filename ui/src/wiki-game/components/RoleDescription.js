import React from 'react'

import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  link: {
    flex: '1 1 34%',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
  },
  button: {
    margin: theme.spacing(2),
    flexGrow: 1,
  },
}))

const RoleDescription = ({ href, buttonText }) => {
  const classes = useStyles()
  return (
    <Link className={classes.link} to={href}>
      <Button className={classes.button} color="primary" variant="contained">
        {buttonText}
      </Button>
    </Link>
  )
}

export default RoleDescription
