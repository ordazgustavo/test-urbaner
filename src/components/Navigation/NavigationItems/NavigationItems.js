import React from 'react'

import Aux from '../../../hoc/Aux/Aux'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
  <Aux>
    <NavigationItem link="/" exact >Feed</NavigationItem>
    <NavigationItem link="/login">Ingresar</NavigationItem>
  </Aux>
)

export default navigationItems