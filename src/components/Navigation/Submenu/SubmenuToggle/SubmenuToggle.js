import React from 'react';

const submenuToggle = props => (
  <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={props.clicked}>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
)

export default submenuToggle;