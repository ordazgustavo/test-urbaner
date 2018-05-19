import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'

const submenu = props => {
  let classes = ['navbar-menu']

  if (props.show) {
    classes.push('is-active')
  }

  console.log(classes.join(' '));
  return (
    <div className={classes.join(' ')}>
      <div className="navbar-start">
        
      </div>

      <div className="navbar-end">
        <NavigationItems />
      </div>
    </div>
  )
}
export default submenu;