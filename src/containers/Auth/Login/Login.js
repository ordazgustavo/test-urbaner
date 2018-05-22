import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AuthForm from '../AuthForm/AuthForm'

import * as actions from '../../../store/actions'

class Login extends Component {
  componentDidMount () {
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  submit = async values => {
    await this.props.onLogin(values)
  }

  render () {
    let errorMessage = null
    if (this.props.error) {
      console.log(this.props.error);
      errorMessage = <p className="is-danger">Credenciales inválidas</p>
    }
    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className="box">
        {errorMessage}
        {authRedirect}
        <AuthForm onSubmit={this.submit} btnText="Ingresar" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.userId !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: async ({username, password}) => await dispatch(actions.login(username, password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)