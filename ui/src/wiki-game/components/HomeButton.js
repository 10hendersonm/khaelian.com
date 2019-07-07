import React from 'react'

import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'

const HomeButton = props => {
  return (
    <Tooltip title="Home">
      <Link to="/">
        <IconButton color="secondary">
          <HomeIcon />
        </IconButton>
      </Link>
    </Tooltip>
  )
}

export default HomeButton
