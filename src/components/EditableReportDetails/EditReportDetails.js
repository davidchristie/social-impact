import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'

import Error from '../../components/Error'
import Loading from '../../components/Loading'

class EditReportDetails extends Component {
  static propTypes = {
    reportId: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false,
      values: {
        description: '',
        name: ''
      }
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
      .then(this.toggle)
  }

  render () {
    if (this.props.data.loading) return <Loading />
    if (this.props.data.error) return <Error error={this.props.data.error} />
    return (
      <div>
        <Button onClick={this.toggle}>Edit Details</Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>
              Edit Details
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='editReportName'>Name</Label>
                <Input
                  id='editReportName'
                  name='name'
                  onChange={this.handleChange}
                  required
                  type='text'
                  value={this.state.values.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for='editReportDescription'>Description</Label>
                <Input
                  id='editReportDescription'
                  name='description'
                  onChange={this.handleChange}
                  type='textarea'
                  value={this.state.values.description}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit'>Save</Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }

  toggle () {
    this.setState({
      open: !this.state.open,
      values: {
        description: this.props.data.getReport.description,
        name: this.props.data.getReport.name
      }
    })
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

export default withData(EditReportDetails)
