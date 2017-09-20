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

class EditImpact extends Component {
  static propTypes = {
    impactId: PropTypes.string.isRequired
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
    this.props.updateImpact(this.state.values)
      .then(this.toggle)
  }

  render () {
    if (this.props.data.loading) return null
    return (
      <span>
        <Button onClick={this.toggle}>Edit</Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>
              Edit {this.props.data.getImpact.name}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='editImpactName'>Name</Label>
                <Input id='editImpactName' name='name' onChange={this.handleChange} required type='text' value={this.state.values.name} />
              </FormGroup>
              <FormGroup>
                <Label for='editImpactDescription'>Description</Label>
                <Input id='editImpactDescription' name='description' onChange={this.handleChange} type='textarea' value={this.state.values.description} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit'>Save</Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </span>
    )
  }

  toggle () {
    this.setState({
      open: !this.state.open,
      values: {
        description: this.props.data.getImpact.description,
        name: this.props.data.getImpact.name
      }
    })
  }
}

const QUERY = gql`
  query EditImpact($id: ID!) {
    getImpact(id: $id) {
      description
      id
      name
    }
  }
`

const UPDATE_IMPACT_MUTATION = gql`
  mutation UpdateImpact($input: UpdateImpactInput!) {
    updateImpact(input: $input) {
      changedImpact {
        description
        id
        name
      }
    }
  }
`

const withData = compose(
  graphql(
    QUERY,
    {
      options: props => ({
        variables: {
          id: props.impactId
        }
      })
    }
  ),
  graphql(
    UPDATE_IMPACT_MUTATION,
    {
      props: ({ mutate, ownProps }) => ({
        updateImpact: values => mutate({
          variables: {
            input: {
              ...values,
              id: ownProps.impactId
            }
          }
        })
      })
    }
  )
)

export default withData(EditImpact)
