import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  feed: [],
  loading: false,
  fetching: false
}

const publishStart = (state, action) => updateObject(state, {loading: true})

const publishSuccess = (state, action) => {
  const newPublication = updateObject(action.publicationData, {id: action.publicationId})
  return updateObject(state, {
    loading: false,
    feed: state.feed.concat(newPublication)
  })
}

const publishFail = (state, action) => updateObject(state, {loading: false})

const fetchStart = (state, action) => updateObject(state, {fetching: true})

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    feed: action.feed,
    fetching: false,
    loading: false
  })
}

const fetchFail = (state, action) => updateObject(state, {fetching: false, loading: false})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PUBLISH_START:
      return publishStart(state, action)

    case actionTypes.PUBLISH_SUCCESS:
      return publishSuccess(state, action)
    
    case actionTypes.PUBLISH_FAIL:
      return publishFail(state, action)

    case actionTypes.FETCH_FEED_START:
     return fetchStart(state, action)

    case actionTypes.FETCH_FEED_SUCCESS:
      return fetchSuccess(state, action)

    case actionTypes.FETCH_FEED_FAIL:
      return fetchFail(state, action)

    default:
      return state
  }
}

export default reducer