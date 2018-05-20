import * as actionTypes from './actionTypes'
import { auth } from '../../shared/firebase'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = userId => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const onLogout = () => {
  return dispatch => {
    auth.signOut()
      .then(() => {
        dispatch(logout())
      })
      .catch(error => {
        // An error happened.
      })
  }
  
}

export const signup = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          const displayName = email.split('@')
          user.updateProfile({
            displayName: displayName
          })
            .then(() => {
              dispatch(authSuccess(user.uid))
            })
            .catch(error => {
              dispatch(authFail(error))
            })
        }
      })
      .catch(error => {
        dispatch(authFail(error))
      })
  }
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(authSuccess(user.uid))
    })
    .catch(error => {
      dispatch(authFail(error))
    })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        dispatch(authSuccess(user.uid))
      } else {
        // No user is signed in.
      }
    });
  }
}