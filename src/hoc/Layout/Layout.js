import React, { Component } from 'react'

import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Submenu from '../../components/Navigation/Submenu/Submenu'

class Layout extends Component {
  state = {
    showSubmenu: false
  }

  showSubmenuClosedHandler = () => {
    this.setState({showshowSubmenu: false});
  }

  showSubmenuToggleHandler = () => {
    this.setState((prevState) => {
      return {showSubmenu: !prevState.showSubmenu};
    })
  }

  render () {
    return (
      <Aux>
        <Toolbar submenuToggleClicked={this.showSubmenuToggleHandler}>
          <Submenu show={this.state.showSubmenu} />
        </Toolbar>
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;