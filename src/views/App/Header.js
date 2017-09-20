import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from 'reactstrap'

import Profile from '../../components/Profile'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div>
        <Navbar color='faded' light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand tag={Link} to='/app'>Social Impact</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <Profile />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
