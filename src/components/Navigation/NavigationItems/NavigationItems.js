import React from 'react'

import Aux from '../../../hoc/Aux/Aux'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => {
  let navItems = (
    <Aux>
      <NavigationItem  link="/login">Ingresar</NavigationItem>
      <NavigationItem link="/signup">Registrarse</NavigationItem>
    </Aux>
  )
  if (props.isAuthenticated) {
    navItems = (
      <NavigationItem link="/logout">Cerrar sesión</NavigationItem>
    )
  }
return(
  <Aux>
    <NavigationItem link="/" exact>Feed</NavigationItem>
    {navItems}
  </Aux>
)
}
export default navigationItems