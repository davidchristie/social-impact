import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Card, CardText, CardTitle } from 'reactstrap'

class Error extends Component {
  render () {
    return (
      <Card block color='danger' inverse>
        <CardTitle>Error</CardTitle>
        <CardText>{this.props.error.message}</CardText>
      </Card>
    )
  }
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }).isRequired
}

export default Error
