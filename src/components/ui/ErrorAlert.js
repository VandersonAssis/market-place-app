import React from 'react'
import { Box } from '@material-ui/core'

const ErrorAlert = (props) => {
  let containerStyle = {
    backgroundColor: '#e74c3c',
    width: '100%',
    display: props.show ? 'inline-block' : 'none',
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 8
  }

  let contentStyle = {
    marginLeft: 45
  }

  return (
    <div style={containerStyle} >
      <span style={contentStyle} >One or more fields are invalid.</span>
    </div>
  )
}

export default ErrorAlert;