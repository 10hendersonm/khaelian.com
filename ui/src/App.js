import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import WikiGame from './wiki-game/App'
import JeepAccelerometer from './jeep-accelerometer/App'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={JeepAccelerometer} />
        <Route path="/wiki" component={WikiGame} />
      </Switch>
    </Router>
  )
}

export default App
