import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Error from '../../components/Error'
import Loading from '../../components/Loading'

class Settings extends Component {

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    return (
      <div>
        <h1>Settings</h1>
      </div>
    )
  }

}

const loggedInUserQuery = gql`
  query LoggedInUser {
    viewer {
      user {
        id
      }
    }
  }
`

const withData = graphql(loggedInUserQuery)

export default withData(Settings)
