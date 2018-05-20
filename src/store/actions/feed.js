import * as actionTypes from './actionTypes'
import { reset } from 'redux-form'

import { auth, database, storage } from '../../shared/firebase'

export const publishStart = () => {
  return {
    type: actionTypes.PUBLISH_START
  }
}

export const publishSuccess = (id, data) => {
  return {
    type: actionTypes.PUBLISH_SUCCESS,
    publicationId: id,
    publicationData: data
  }
}

export const publishFail = error => {
  return {
    type: actionTypes.PUBLISH_FAIL,
    error: error
  }
}

export const fetchStart = () => ({
  type: actionTypes.FETCH_FEED_START
})

export const fetchSuccess = publications => ({
  type: actionTypes.FETCH_FEED_SUCCESS,
  feed: publications
})

export const fetchFail = error => ({
  type: actionTypes.FETCH_FEED_FAIL,
  error: error
})

export const publish = (data) => {
  return async dispatch => {
    dispatch(publishStart())
    const newPostId = database.ref('feed').push().key

    const file = data.imagen[0]
    console.log(file);
    const storageRef = storage.ref('feed').child(`${newPostId}/${file.name}`)

    const task = storageRef.put(file)

    task.on('state_changed', 
      snapshot => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error => {
        dispatch(publishFail(error))
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          const user = auth.currentUser
          const newData = {
            ...data,
            created: Date.now(),
            imageUrl: url,
            user: {
              userId: user.uid,
              displayName: user.displayName 
            }
          }
          database.ref('feed').child(newPostId).set(newData)
            .then(() => {
              dispatch(reset('feedForm'))
              dispatch(fetchPublications())
            })
            .catch(error => {
              dispatch(publishFail(error))
            })
        })
        
      })
  }
}

export const fetchPublications = filter => async dispatch => {
  dispatch(fetchStart())
  const feedRef = database.ref('feed')

  feedRef
    .orderByChild('estado')
    .equalTo(filter)
    .once('value', 
    snapshot => {
      let fetchedPubs = []
      snapshot.forEach(pub => {
        fetchedPubs = [
          {
            id: pub.key,
            ...pub.val()
          },
          ...fetchedPubs
        ]
      })
      dispatch(fetchSuccess(fetchedPubs))
    },
    error => {
      dispatch(fetchFail(error))
    })
}