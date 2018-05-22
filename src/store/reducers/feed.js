import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  feed: [],
  publishing: false,
  fetching: false,
  editing: null,
  removing: false,
  removed: false,
  error: null
}

const publishStart = (state, action) => updateObject(state, {
    publishing: true,
    error: null
  }
)

const publishSuccess = (state, action) => updateObject(state, {
    publishing: false,
    error: null
  }
)

const publishFail = (state, action) => updateObject(state, {
    publishing: false, 
    error: action.error
  }
)

const fetchStart = (state, action) => updateObject(state, {
    fetching: true,
    error: null
  }
)

const fetchSuccess = (state, action) => updateObject(state, {
    feed: action.feed, 
    fetching: false,
    error: null
  }
)

const fetchFail = (state, action) => updateObject(state, {
    fetching: false, 
    publishing: false, 
    error: action.error
  }
)

const editPublication = (state, action) => updateObject(state, {
    editing: action.id
  }
)

const savePublicationStart = (state, action) => updateObject(state, {
    editing: null
  }
)

const savePublicationFail = (state, action) => updateObject(state, {
    editing: null, 
    error: action.error
  }
)

const removePublicationStart = (state, action) => updateObject(state, {
    removing: true, 
    removed: false,
    error: null
  }
)

const removePublicationSuccess = (state, action) => updateObject(state, {
    removing: false, 
    removed: true,
    error: null
  }
)

const removePublicationFail = (state, action) => updateObject(state, {
    removing: false, 
    removed: false, 
    error: action.error
  }
)

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

    case actionTypes.EDIT_PUBLICATION:
      return editPublication(state, action)

    case actionTypes.SAVE_PUBLICATION_START:
      return savePublicationStart(state, action)

    case actionTypes.SAVE_PUBLICATION_FAIL:
      return savePublicationFail(state, action)

    case actionTypes.REMOVE_PUBLICATION_START:
      return removePublicationStart(state, action)

    case actionTypes.REMOVE_PUBLICATION_SUCCESS:
      return removePublicationSuccess(state, action)

    case actionTypes.REMOVE_PUBLICATION_FAIL:
      return removePublicationFail(state, action)

    default:
      return state
  }
}

export default reducer