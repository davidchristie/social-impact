import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'

import Error from '../../components/Error'
import Loading from '../../components/Loading'
import RelativeDate from '../../components/RelativeDate'

class Report extends Component {

  isEditable () {
    return this.props.data.getReport.createdBy.id === this.props.data.viewer.user.id
  }

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    return (
      <div>
        <h1>{this.props.data.getReport.name}</h1>
        {
          this.isEditable()
            ? (
              <Button tag={Link} to={`${this.props.match.url}/edit`}>
                Edit
              </Button>
            )
            : null}
        <Card block>
          <CardText>{this.props.data.getReport.description}</CardText>
        </Card>
        <p>
          Created by {this.props.data.getReport.createdBy.name} <RelativeDate value={this.props.data.getReport.createdAt} />
        </p>
      </div>
    )
  }

}

const getReportAndLoggedInUserQuery = gql`
  query GetReportAndLoggedInUser($id: ID!) {
    getReport(id: $id) {
      createdAt
      createdBy {
        name
        id
      }
      description
      id
      name
    }
    viewer {
      user {
        id
      }
    }
  }
`

const withData = graphql(
  getReportAndLoggedInUserQuery,
  {
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }
)

export default withData(Report)
