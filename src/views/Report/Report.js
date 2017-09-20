import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'

import Error from '../../components/Error'
import Impacts from '../../components/Impacts'
import Loading from '../../components/Loading'
import RelativeDate from '../../components/RelativeDate'

class Report extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired
  }

  isEditable () {
    return this.props.data.getReport.createdBy.id === this.props.data.viewer.user.id
  }

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    return (
      <div>
        <h1>
          {this.props.data.getReport.name}
          {
            this.isEditable()
            ? (
              <Button
                className='float-right'
                tag={Link}
                to={`${this.props.match.url}/edit`}
              >
                Edit
              </Button>
            )
            : null
          }
        </h1>
        <Card block>
          <CardText>{this.props.data.getReport.description}</CardText>
        </Card>
        <h2>Impacts</h2>
        <Impacts reportId={this.props.data.getReport.id} />
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
