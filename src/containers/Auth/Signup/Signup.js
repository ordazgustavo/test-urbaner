import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AuthForm from '../AuthForm/AuthForm'

import * as actions from '../../../store/actions'

class Signup extends Component {
  componentDidMount () {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  submit = values => {
    this.props.onSignup(values)
  }

  render () {
    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className="box">
        {authRedirect}
        <AuthForm onSubmit={this.submit} btnText="Registrarse" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignup: ({username, password}) => dispatch(actions.signup(username, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)