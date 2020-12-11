import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/CheckCircleOutline'
import InfoIcon from '@material-ui/icons/Info'
import JudgeIcon from '@material-ui/icons/Gavel'

// misc
import { Redirect } from 'react-router-dom'

// custom
import Score from './Score'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  },
  playerName: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(4),
  },
}))

const PlayerStatus = ({
  name,
  articleSelected,
  judge,
  score,
  demo,
  showIcon,
  activePlayer,
}) => {
  const classes = useStyles()

  if (activePlayer && !judge && !articleSelected) {
    return <Redirect to="/player" />
  }

  var tooltipText
  var Icon
  if (demo) {
    tooltipText = 'Player Status'
    Icon = InfoIcon
  } else if (judge) {
    tooltipText = 'Judging'
    Icon = JudgeIcon
  } else if (articleSelected) {
    tooltipText = 'Article Selected'
    Icon = CheckIcon
  } else {
    tooltipText = 'Still Thonking'
    Icon = CircularProgress
  }
  return (
    <div className={classes.root}>
      {showIcon && (
        <Tooltip placement="left" title={tooltipText}>
          <Icon size={24} color={activePlayer ? 'secondary' : 'primary'} />
        </Tooltip>
      )}
      <Typography
        className={classes.playerName}
        color={activePlayer ? 'textPrimary' : 'textSecondary'}
      >
        {demo ? 'Player' : name}
      </Typography>
      <Typography
        variant="caption"
        color={activePlayer ? 'textPrimary' : 'textSecondary'}
      >
        {demo ? 'Score' : <Score value={score} />}
      </Typography>
    </div>
  )
}

export default PlayerStatus
