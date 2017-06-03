import React, { Component } from 'react'

import { logout } from '../../authentication'

export default class Logout extends Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    logout()
  }

  render () {
    return (
      <span onClick={this.handleClick}>
        {this.props.children}
      </span>
    )
  }

}
