import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { render } from 'react-dom'
import { Route, Router, Switch } from 'react-router-dom'

import createApolloClient from './createApolloClient'
import history from './history'
import './theme/index.css'
import App from './views/App'
import Landing from './views/Landing'
import NotFound from './views/NotFound'

import registerServiceWorker from './registerServiceWorker'

render(
  <ApolloProvider client={createApolloClient()}>
    <Router history={history}>
      <Switch>
        <Route component={Landing} exact path='/' />
        <Route component={App} path='/app' />
        <Route component={NotFound} path='*' />
      </Switch>
    </Router>
  </ApolloProvider>
  , document.getElementById('root')
)

registerServiceWorker()
