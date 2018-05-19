import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'

const submenu = props => {
  let classes = ['navbar-menu']

  if (props.show) {
    classes.push('is-active')
  }
  return (
    <div className={classes.join(' ')}>
      <div className="navbar-start">
        
      </div>

      <div className="navbar-end">
        <NavigationItems isAuthenticated={props.isAuth} />
      </div>
    </div>
  )
}
export default submenu;