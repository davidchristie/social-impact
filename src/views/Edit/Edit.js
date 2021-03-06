import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

import EditableImpactList from '../../components/EditableImpactList'
import EditableReportDetails from '../../components/EditableReportDetails'
import Error from '../../components/Error'
import Loading from '../../components/Loading'

class Edit extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    const reportId = this.props.data.getReport.id
    return (
      <div>
        <h1>Edit {this.props.data.getReport.name}</h1>
        <EditableReportDetails reportId={reportId} />
        <h3>Impacts</h3>
        <EditableImpactList reportId={reportId} />
        <hr />
        <Button tag={Link} to={`/app/reports/${reportId}`}>Done</Button>
      </div>
    )
  }
}

const getReportQuery = gql`
  query GetReport($id: ID!) {
    getReport(id: $id) {
      description
      id
      name
    }
  }
`

const updateReportMutation = gql`
  mutation UpdateReport($input: UpdateReportInput!) {
    updateReport(input: $input) {
      changedReport {
        description
        id
        name
      }
    }
  }
`

const withData = compose(
  graphql(
    getReportQuery,
    {
      options: props => ({
        variables: {
          id: props.match.params.id
        }
      })
    }
  ),
  graphql(
    updateReportMutation,
    {
      props: ({ mutate, ownProps }) => ({
        update: input => mutate({
          variables: {
            input: {
              ...input,
              id: ownProps.data.getReport.id
            }
          }
        })
      })
    }
  )
)

export default withData(Edit)
