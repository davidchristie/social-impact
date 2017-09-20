import React, { Component } from 'react'
import { Container } from 'reactstrap'

import Header from './Header'

export default class Landing extends Component {
  render () {
    return (
      <div>
        <Header />
        <Container>
          <h1>Landing</h1>
        </Container>
      </div>
    )
  }
}
