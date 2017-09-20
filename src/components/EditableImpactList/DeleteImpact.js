import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

class EditImpact extends Component {
  static propTypes = {
    impactId: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.confirm = this.confirm.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false
    }
  }

  confirm () {
    this.props.deleteImpact()
    this.toggle()
  }

  render () {
    if (this.props.data.loading) return null
    return (
      <span>
        <Button color='danger' onClick={this.toggle}>Delete</Button>
        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Delete {this.props.data.getImpact.name}
          </ModalHeader>
          <ModalBody>
            Permanently delete this impact?
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.confirm}>Confirm</Button>
            <Button onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }

  toggle () {
    this.setState({
      open: !this.state.open
    })
  }
}

const GET_IMPACT_QUERY = gql`
  query GetImpact($id: ID!) {
    getImpact(id: $id) {
      id
      name
    }
  }
`

const GET_REPORT_QUERY = gql`
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      impacts {
        edges{
          node{
            id
          }
        }
      }
    }
  }
`

const DELETE_IMPACT_MUTATION = gql`
  mutation DeleteImpact($input: DeleteImpactInput!) {
    deleteImpact(input: $input) {
      changedImpact {
        description
        id
        name
        report {
          id
        }
      }
    }
  }
`

const withData = compose(
  graphql(
    GET_IMPACT_QUERY,
    {
      options: props => ({
        variables: {
          id: props.impactId
        }
      })
    }
  ),
  graphql(
    DELETE_IMPACT_MUTATION,
    {
      options: props => ({
        update: (proxy, { data: mutationData }) => {
          console.log(mutationData)
          const impactId = mutationData.deleteImpact.changedImpact.id
          const reportId = mutationData.deleteImpact.changedImpact.report.id
          const query = GET_REPORT_QUERY
          const variables = {
            id: reportId
          }
          const data = proxy.readQuery({query, variables})
          console.log(data.getReport.impacts.edges)
          data.getReport.impacts.edges = data.getReport.impacts.edges
            .filter(edge => edge.node.id !== impactId)
          proxy.writeQuery({data, query, variables})
        }
      }),
      props: ({ mutate, ownProps }) => ({
        deleteImpact: values => mutate({
          variables: {
            input: {
              id: ownProps.impactId
            }
          }
        })
      })
    }
  )
)

export default withData(EditImpact)
