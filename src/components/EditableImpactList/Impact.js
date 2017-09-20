import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Card,
  CardBlock,
  CardSubtitle,
  CardText,
  CardTitle
} from 'reactstrap'

import DeleteImpact from './DeleteImpact'
import EditImpact from './EditImpact'

export default class Impact extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  render () {
    return (
      <Card>
        <CardBlock>
          <CardTitle>{this.props.name}</CardTitle>
          <CardSubtitle>ID: {this.props.id}</CardSubtitle>
          <CardText>{this.props.description}</CardText>
          <EditImpact impactId={this.props.id} />
          <DeleteImpact impactId={this.props.id} />
        </CardBlock>
      </Card>
    )
  }
}
