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

class AddImpact extends Component {
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
    this.props.createReport(this.state.values)
    this.toggle()
  }

  render () {
    return (
      <div>
        <Button onClick={this.toggle}>Add Impact</Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Add Impact</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='createImpactName'>Name</Label>
                <Input id='createImpactName' name='name' onChange={this.handleChange} required type='text' value={this.state.values.name} />
              </FormGroup>
              <FormGroup>
                <Label for='createImpactDescription'>Description</Label>
                <Input id='createImpactDescription' name='description' onChange={this.handleChange} type='textarea' value={this.state.values.description} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit'>Add</Button>
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
        description: '',
        name: ''
      }
    })
  }
}

const QUERY = gql`
  query AddImpact($id: ID!) {
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

const CREATE_IMPACT_MUTATION = gql`
  mutation CreateImpact($input: CreateImpactInput!) {
    createImpact(input: $input) {
      changedImpact {
        description
        id
        name
      }
    }
  }
`

const withData = graphql(
  CREATE_IMPACT_MUTATION,
  {
    props: ({ mutate, ownProps }) => ({
      createReport: values => mutate({
        refetchQueries: [{
          query: QUERY,
          variables: {
            id: ownProps.reportId
          }
        }],
        variables: {
          input: {
            ...values,
            reportId: ownProps.reportId
          }
        }
      })
    })
  }
)

export default withData(AddImpact)
