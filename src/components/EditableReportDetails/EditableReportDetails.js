import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Card, CardBlock, CardText, CardTitle } from 'reactstrap'

import Error from '../../components/Error'
import Loading from '../../components/Loading'
import EditReportDetails from './EditReportDetails'

class EditableReportDetails extends Component {
  static propTypes = {
    reportId: PropTypes.string.isRequired
  }

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    return (
      <div>
        <Card>
          <CardBlock>
            <CardTitle>{this.props.data.getReport.name}</CardTitle>
            <CardText>{this.props.data.getReport.description}</CardText>
          </CardBlock>
        </Card>
        <EditReportDetails reportId={this.props.reportId} />
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
          id: props.reportId
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

export default withData(EditableReportDetails)
