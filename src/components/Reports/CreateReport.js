import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
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

class CreateReport extends Component {

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      values: {
        description: '',
        name: '',
        private: false
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
    this.props.createReport(this.state.values)
      .then(this.toggle)
  }

  render () {
    return (
      <div>
        <Button onClick={this.toggle}>Create Report</Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Create Report</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='createReportName'>Name</Label>
                <Input id='createReportName' name='name' onChange={this.handleChange} required type='text' value={this.state.values.name} />
              </FormGroup>
              <FormGroup>
                <Label for='createReportDescription'>Description</Label>
                <Input id='createReportDescription' name='description' onChange={this.handleChange} type='textarea' value={this.state.values.description} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input checked={this.state.values.private} name='private' onChange={this.handleChange} type='checkbox' />
                  Keep report private
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit'>Create</Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

}

CreateReport.propTypes = {
  userId: PropTypes.string.isRequired
}

const createReportMutation = gql`
  mutation CreateReport($input: CreateReportInput!) {
    createReport(input: $input) {
      changedReport {
        id
      }
    }
  }
`

const getUserQuery = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      reports {
        edges {
          node {
            description
            id
            name
            private
          }
        }
      }
    }
  }
`

const withData = graphql(
  createReportMutation,
  {
    props: ({ mutate, ownProps }) => ({
      createReport: values => mutate({
        refetchQueries: [{
          query: getUserQuery,
          variables: {
            id: ownProps.userId
          }
        }],
        variables: {
          input: {
            ...values,
            createdById: ownProps.userId
          }
        }
      })
    })
  }
)

export default withData(CreateReport)
