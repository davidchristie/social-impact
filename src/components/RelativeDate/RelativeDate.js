import PropTypes from 'prop-types'
import React, { Component } from 'react'
import relativeDate from 'relative-date'

class RelativeDate extends Component {
  render () {
    return (
      <span>
        {relativeDate(new Date(this.props.value))}
      </span>
    )
  }
}

RelativeDate.propTypes = {
  value: PropTypes.string.isRequired
}

export default RelativeDate
