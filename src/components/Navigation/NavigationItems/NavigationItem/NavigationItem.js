import React from 'react'
import { NavLink } from 'react-router-dom'

const navigationItem = props => (
  <NavLink to={props.link} exact={props.exact} className="navbar-item" activeClassName="is-active">{props.children}</NavLink>
)

export default navigationItem