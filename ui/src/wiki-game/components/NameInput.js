import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// custom
import useInput from '../hooks/useInput'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}))

const NameInput = ({ onChange }) => {
  const nameInput = useInput('')
  const name = nameInput.value
  const handleEnterKey = e => {
    if (e.key === 'Enter') handleSubmit()
  }
  const handleSubmit = () => {
    onChange(name)
  }
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TextField label="Name" onKeyPress={handleEnterKey} {...nameInput} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default NameInput
