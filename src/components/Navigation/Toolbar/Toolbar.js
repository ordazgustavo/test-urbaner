import React from 'react'
import { Link } from 'react-router-dom'

import SubmenuToggle from '../Submenu/SubmenuToggle/SubmenuToggle'

const toolbar = props => (
  <nav className="navbar is-primary" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        <h1>FEED APP</h1>
      </Link>

      <SubmenuToggle clicked={props.submenuToggleClicked} />
      
    </div>
    {props.children}
  </nav>
)

export default toolbar