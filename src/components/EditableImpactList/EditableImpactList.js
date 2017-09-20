import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import AddImpact from './AddImpact'
import Impact from './Impact'

class EditableImpactList extends Component {
  static propTypes = {
    reportId: PropTypes.string.isRequired
  }

  render () {
    if (this.props.data.loading) {
      return <h2>Loading</h2>
    }
    const items = this.props.data.getReport.impacts.edges
      .map(edge => edge.node)
      .reverse()
    return (
      <div>
        <div>
          {
            items.map((item, index) => (
              <Impact key={index} {...item} />
            ))
          }
        </div>
        <AddImpact reportId={this.props.reportId} />
      </div>
    )
  }
}

const QUERY = gql`
  query EditableImpactList($id: ID!) {
    getReport(id: $id) {
      id
      impacts {
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
  QUERY,
  {
    options: props => ({
      variables: {
        id: props.reportId
      }
    })
  }
)

export default withData(EditableImpactList)
