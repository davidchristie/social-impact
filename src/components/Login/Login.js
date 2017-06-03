import Auth0Lock from 'auth0-lock'
import gql from 'graphql-tag'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

import { isAuthenticated, setToken } from '../../authentication'
import history from '../../history'

const clientId = 'wBiWdKW3CjzYc2p6pYBAxA4OzBK27cId'
const domain = 'davidchristie.au.auth0.com'
const options = {
  theme: {
    primaryColor: '#292b2c'
  }
}

class Login extends Component {

  constructor (props) {
    super(props)
    const lock = new Auth0Lock(clientId, domain, options)
    lock.on('authenticated', result => {
      lock.getUserInfo(result.accessToken, (error, profile) => {
        if (error) {
          console.log(error.message)
        } else {
          setToken(result.idToken)
          this.props.loginUser(result.idToken)
            .then(response => {
              return this.props.updateUser({
                id: response.data.loginUserWithAuth0.user.id,
                name: profile.name,
                picture: profile.picture
              })
            })
            .then(() => history.push('/app'))
        }
      })
    })
    this.lock = lock
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (isAuthenticated()) {
      history.push('/app')
    } else {
      this.lock.show()
    }
  }

  render () {
    return (
      <span onClick={this.handleClick}>
        {this.props.children}
      </span>
    )
  }

}

const loginUserWithAuth0Mutation = gql`
  mutation LoginUserWithAuth0($input: LoginUserWithAuth0Input!) {
    loginUserWithAuth0(input: $input) {
      user {
        id
      }
    }
  }
`

const updateUserMutation = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        id
        name
        picture
      }
    }
  }
`

const withData = compose(
  graphql(
    loginUserWithAuth0Mutation,
    {
      props: ({ mutate }) => ({
        loginUser: token => mutate({
          variables: {
            input: {
              idToken: token
            }
          }
        })
      })
    }
  ),
  graphql(
    updateUserMutation,
    {
      props: ({ mutate }) => ({
        updateUser: input => mutate({
          variables: {
            input
          }
        })
      })
    }
  )
)

export default withData(Login)
