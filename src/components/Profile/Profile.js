import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'

import Logout from '../Logout'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  render () {
    if (this.props.data.loading) return null
    if (this.props.data.error) return <Logout><Button>Logout</Button></Logout>
    return (
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle caret nav>
          {this.props.data.viewer.user.name}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to='/app/settings'>
            Settings
          </DropdownItem>
          <DropdownItem divider />
          <Logout><DropdownItem>Logout</DropdownItem></Logout>
        </DropdownMenu>
      </Dropdown>
    )
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}

const loggedInUserQuery = gql`
  query LoggedInUser {
    viewer {
      user {
        id
        name
      }
    }
  }
`

const withData = graphql(loggedInUserQuery)

export default withData(Profile)
