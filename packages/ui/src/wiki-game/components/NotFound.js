import React, { useState, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import { Redirect } from 'react-router-dom'

const NotFound = props => {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      setCount(prevCount => prevCount - 1)
    }, 1000)
    return () => {
      clearInterval(countDownInterval)
    }
  }, [])

  if (count === 0) return <Redirect to="/" />
  return (
    <Typography variant="h6">
      {`This page could not be found. You will be redirected to the home page in ${count} second(s).`}
    </Typography>
  )
}

export default NotFound
