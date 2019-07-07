import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ShuffleIcon from '@material-ui/icons/Shuffle'

const RandomArticleButton = props => {
  return (
    <Tooltip title="Random Article">
      <a
        href="https://en.wikipedia.org/wiki/Special:Random"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconButton color="secondary">
          <ShuffleIcon />
        </IconButton>
      </a>
    </Tooltip>
  )
}

export default RandomArticleButton
