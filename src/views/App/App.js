import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'

import { isAuthenticated } from '../../authentication'
import history from '../../history'
import Dashboard from '../Dashboard'
import Edit from '../Edit'
import NotFound from '../NotFound'
import Report from '../Report'
import Settings from '../Settings'
import Footer from './Footer'
import Header from './Header'

export default class App extends Component {

  componentWillMount () {
    if (!isAuthenticated()) {
      history.push('/')
    }
  }

  render () {
    const { props: { match: { url } } } = this
    return (
      <div>
        <Header />
        <Container>
          <Switch>
            <Route component={Dashboard} exact path={`${url}`} />
            <Route component={Report} exact path={`${url}/reports/:id`} />
            <Route component={Edit} exact path={`${url}/reports/:id/edit`} />
            <Route component={Settings} exact path={`${url}/settings`} />
            <Route component={NotFound} path='*' />
          </Switch>
        </Container>
        <Footer />
      </div>
    )
  }

}
