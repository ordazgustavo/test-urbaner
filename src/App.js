import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import Feed from './containers/Feed/Feed'
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/" exact component={Feed} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
