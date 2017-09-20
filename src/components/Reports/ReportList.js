import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ReportListItem from './ReportListItem'

class ReportList extends Component {
  render () {
    return (
      <div>
        {
          this.props.items.map((item, index) => (
            <ReportListItem key={index} {...item} />
          ))
        }
      </div>
    )
  }
}

ReportList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ReportList
