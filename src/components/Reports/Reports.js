import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import CreateReport from './CreateReport'
import ReportList from './ReportList'

class Reports extends Component {
  render () {
    if (this.props.data.loading) {
      return <h2>Loading</h2>
    } else {
      const items = this.props.data.getUser.reports.edges
        .map(edge => edge.node)
        .reverse()
      return (
        <div>
          <h2>Reports</h2>
          <ReportList items={items} />
          <CreateReport userId={this.props.userId} />
        </div>
      )
    }
  }
}

Reports.propTypes = {
  userId: PropTypes.string.isRequired
}

const allReportsQuery = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      reports {
        edges {
          node {
            description
            id
            name
          }
        }
      }
    }
  }
`

const withData = graphql(
  allReportsQuery,
  {
    options: props => ({
      variables: {
        id: props.userId
      }
    })
  }
)

export default withData(Reports)
