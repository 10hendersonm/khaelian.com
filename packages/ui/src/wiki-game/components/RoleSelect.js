import React from 'react'

import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

// custom
import RoleDescription from './RoleDescription'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '& > *': {
      margin: theme.spacing(2),
      flex: '1 0 34%',
      textAlign: 'center',
    },
  },
  buttonRoot: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

const RoleSelect = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h6">Gameplay</Typography>
      <Typography>
        Each player must read and then submit a Wikipedia article. The judge is
        randomly assigned the title of one article, and they interview each
        player about the article title. The player's goal is to convince the
        judge that they have actually read that article.
      </Typography>
      <Typography variant="h6">Points</Typography>
      <Typography>
        If the judge selects the player who submitted the article, both the
        player and the judge receive 1 point.
      </Typography>
      <Typography>
        If the judge does not select the player who submitted the article, all
        players except for the judge and the player who submitted the article
        receive 1 point.
      </Typography>
      <Typography variant="h6">Select A Role</Typography>
      <div className={classes.buttonRoot}>
        <RoleDescription buttonText="judge" href="/judge" />
        <RoleDescription buttonText="player" href="/player" />
      </div>
    </div>
  )
}

export default RoleSelect

/*

  description="Players submit a Wikipedia article which they have read. Players are not aware of the contents of articles submitted by the other players. When the judge presents the article title for the given round, the player must either present the knowledge they learned in the article to the judge, or lie about the contents of the article in order to make the judge believe that they have read an article by that title."
      />
      <RoleDescription buttonText="judge" description="The judge is randomly assigned a title from the players' collected Wikipedia articles. The judge has to interview each player about the contents of 'their' article, and attempt to decipher who actually submitted the article title the judge received." />


*/
