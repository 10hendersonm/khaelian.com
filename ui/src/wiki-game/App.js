import React, { useState, useEffect } from 'react'

// material-ui
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'

// misc
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// custom
import NameInput from './components/NameInput'
import Body from './components/Body'
import RoleSelect from './components/RoleSelect'
import NotFound from './components/NotFound'
import Player from './components/Player'
import Setup from './components/Setup'
import useWebSocket from './hooks/useWebSocket'
import Gameplay from './components/Gameplay'
import Result from './components/Result'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  spacing: 4,
})

function App() {
  const isHttps = window.location.protocol === 'https:'
  const protocol = isHttps ? 'wss' : 'ws'
  const ws = useWebSocket({
    url: `${protocol}://${window.location.host}/websocket`,
  })
  const [name, setName] = useState(null)
  useEffect(() => {
    if (name === null) {
      setName(localStorage.getItem('player-name'))
    } else {
      localStorage.setItem('player-name', name)
    }
  }, [name])
  const handleChangeName = nameVal => setName(nameVal)

  return (
    <Router basename="/wiki">
      <ThemeProvider theme={theme}>
        <Body>
          {name ? (
            <Switch>
              <Route path="/" exact component={RoleSelect} />
              <Route
                path="/judge"
                component={props => (
                  <Player playerRole="judge" name={name} {...props} />
                )}
              />
              <Route
                path="/player"
                component={props => (
                  <Player playerRole="player" name={name} {...props} />
                )}
              />
              <Route
                path="/setup"
                component={props => (
                  <Setup websocket={ws} playerName={name} {...props} />
                )}
              />
              <Route
                path="/play"
                component={props => <Gameplay playerName={name} {...props} />}
              />
              <Route
                path="/correct"
                component={props => (
                  <Result websocket={ws} playerName={name} correct {...props} />
                )}
              />
              <Route
                path="/incorrect"
                component={props => (
                  <Result websocket={ws} playerName={name} {...props} />
                )}
              />
              <Route path="/" component={NotFound} />
            </Switch>
          ) : (
            <NameInput onChange={handleChangeName} />
          )}
        </Body>
      </ThemeProvider>
    </Router>
  )
}

export default App
