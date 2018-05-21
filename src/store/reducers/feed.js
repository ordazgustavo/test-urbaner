import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  feed: [],
  loading: false,
  fetching: false,
  editing: null
}

const publishStart = (state, action) => updateObject(state, {loading: true})

const publishFail = (state, action) => updateObject(state, {loading: false})

const fetchStart = (state, action) => updateObject(state, {fetching: true})

const fetchSuccess = (state, action) => updateObject(state, {feed: action.feed, fetching: false, loading: false})

const fetchFail = (state, action) => updateObject(state, {fetching: false, loading: false})

const editPublication = (state, action) => updateObject(state, {editing: action.id})

const savePublicationStart = (state, action) => updateObject(state, {editing: null})

const savePublicationFail = (state, action) => updateObject(state, {editing: null, error: action.error})

const removePublicationStart = (state, action) => updateObject(state, {fetching: true})

const removePublicationFail = (state, action) => updateObject(state, {fetching: false, loading: false})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PUBLISH_START:
      return publishStart(state, action)
    
    case actionTypes.PUBLISH_FAIL:
      return publishFail(state, action)

    case actionTypes.FETCH_FEED_START:
     return fetchStart(state, action)

    case actionTypes.FETCH_FEED_SUCCESS:
      return fetchSuccess(state, action)

    case actionTypes.FETCH_FEED_FAIL:
      return fetchFail(state, action)

    case actionTypes.EDIT_PUBLICATION:
      return editPublication(state, action)

    case actionTypes.SAVE_PUBLICATION_START:
      return savePublicationStart(state, action)

    case actionTypes.SAVE_PUBLICATION_FAIL:
      return savePublicationFail(state, action)

    case actionTypes.REMOVE_PUBLICATION_START:
      return removePublicationStart(state, action)

    case actionTypes.REMOVE_PUBLICATION_FAIL:
      return removePublicationFail(state, action)

    default:
      return state
  }
}

export default reducer