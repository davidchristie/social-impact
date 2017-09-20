import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBlock,
  CardSubtitle,
  CardText,
  CardTitle
} from 'reactstrap'

class ReportListItem extends Component {
  render () {
    return (
      <Card>
        <CardBlock>
          <CardTitle>
            <Link to={`/app/reports/${this.props.id}`}>
              {this.props.name}
            </Link>
          </CardTitle>
          <CardSubtitle>ID: {this.props.id}</CardSubtitle>
          <CardText>{this.props.description}</CardText>
        </CardBlock>
      </Card>
    )
  }
}

ReportListItem.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default ReportListItem
