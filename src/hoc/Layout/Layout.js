import React, { Component } from 'react'
import { connect } from 'react-redux'

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
          <Submenu isAuth={this.props.isAuthenticated} show={this.state.showSubmenu} />
        </Toolbar>
        <section className="section">
          <div className="container">
            {this.props.children}
          </div>
        </section>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null
  }
}

export default connect(mapStateToProps)(Layout)