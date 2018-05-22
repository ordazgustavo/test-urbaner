import React from 'react'

const iconButton = props => (
  <a className="level-item" onClick={props.clicked}>
    <span className="icon is-small">
      <i className={props.icon} aria-hidden="true"></i>
    </span>
  </a>
)

export default iconButton