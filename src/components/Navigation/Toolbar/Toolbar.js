import React from 'react'

import SubmenuToggle from '../Submenu/SubmenuToggle/SubmenuToggle'

const toolbar = props => (
  <nav className="navbar is-primary" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo-white.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
      </a>

      <SubmenuToggle clicked={props.submenuToggleClicked} />
      
    </div>
    {props.children}
  </nav>
)

export default toolbar