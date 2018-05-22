import * as actionTypes from './actionTypes'
import { auth } from '../../shared/firebase'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = userId => ({
  type: actionTypes.AUTH_SUCCESS,
  userId: userId
})

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
})

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const onLogout = () => dispatch => {
  auth.signOut()
    .then(() => {
      dispatch(logout())
    })
    .catch(error => {
      dispatch(authFail(error))
    })
} 

export const signup = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(authStart())
    auth.createUserWithEmailAndPassword(email, password)
      .then(snapshot => {
        if (snapshot) {
          const [displayName] = email.split('@')
          snapshot.user.updateProfile({
            displayName: displayName
          })
            .then(() => {
              dispatch(authSuccess(snapshot.user.uid))
              resolve()
            })
            .catch(error => {
              dispatch(authFail(error))
              reject()
            })
        }
      })
      .catch(error => {
        dispatch(authFail(error))
        reject()
      })
  })
}

export const login = (email, password) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(authStart())
    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(authSuccess(user.uid))
        resolve()
      })
      .catch(error => {
        dispatch(authFail(error))
        reject()
      })
  })
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => dispatch => {
  dispatch(authStart())
  auth.onAuthStateChanged(
    user => {
      if (user) {
        dispatch(authSuccess(user.uid))
      } else {
        dispatch(authSuccess(null))
      }
    },
    error => {
      dispatch(authFail(error))
    })
}
