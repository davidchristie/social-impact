import gql from 'graphql-tag'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap'

import Error from '../../components/Error'
import Loading from '../../components/Loading'
import history from '../../history'

class Edit extends Component {

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      values: {
        description: '',
        name: '',
        private: false
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.data.loading) {
      this.setState({
        values: {
          description: nextProps.data.getReport.description,
          name: nextProps.data.getReport.name,
          private: nextProps.data.getReport.private
        }
      })
    }
  }

  handleChange (event) {
    const { target: { checked, name, type, value } } = event
    this.setState({
      values: {
        ...this.state.values,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.update({...this.state.values})
      .then(() => history.push(`/app/reports/${this.props.data.getReport.id}`))
  }

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    return (
      <div>
        <h1>{this.props.data.getReport.name}</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for='editReportName' sm={2}>Name</Label>
            <Col sm={10}>
              <Input
                id='editReportName'
                name='name'
                onChange={this.handleChange}
                required
                type='text'
                value={this.state.values.name}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for='editReportDescription' sm={2}>Description</Label>
            <Col sm={10}>
              <Input
                id='editReportDescription'
                name='description'
                onChange={this.handleChange}
                type='textarea'
                value={this.state.values.description}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ offset: 2, size: 10 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    checked={this.state.values.private}
                    id='editReportPrivate'
                    name='private'
                    onChange={this.handleChange}
                    type='checkbox'
                  />
                    Keep report private
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button>Update</Button>
              <Button
                tag={Link}
                to={`/app/reports/${this.props.data.getReport.id}`}
              >
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
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
      private
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
        private
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
