import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  publications: [],
  loading: false
}

const publishStart = (state, action) => {  
  return updateObject(state, {loading: true})
}

const publishSuccess = (state, action) => {
  const newPublication = updateObject(action.publicationData, {id: action.publicationId})
  return updateObject(state, {
    loading: false,
    publications: state.publications.concat(newPublication)
  })
}

const publishFail = (state, action) => {
  return updateObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PUBLISH_START:
      return publishStart(state, action)

    case actionTypes.PUBLISH_SUCCESS:
      return publishSuccess(state, action)
    
    case actionTypes.PUBLISH_FAIL:
      return publishFail(state, action)

    default:
      return state
  }
}

export default reducer