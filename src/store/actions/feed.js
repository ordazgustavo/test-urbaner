import * as actionTypes from './actionTypes'
import { reset } from 'redux-form'

import { auth, database, storage } from '../../shared/firebase'

export const publishStart = () => ({
  type: actionTypes.PUBLISH_START
})

export const publishSuccess = () => ({
  type: actionTypes.PUBLISH_SUCCESS
})

export const publishFail = error => ({
  type: actionTypes.PUBLISH_FAIL,
  error: error
})

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

export const editPublicationStart = id => ({
  type: actionTypes.EDIT_PUBLICATION,
  id: id
})

export const savePublicationStart = data => ({
  type: actionTypes.SAVE_PUBLICATION_START,
  data: data
})

export const savePublicationFail = error => ({
  type: actionTypes.SAVE_PUBLICATION_FAIL,
  error: error
})

export const removePublicationStart = () => ({
  type: actionTypes.REMOVE_PUBLICATION_START 
})

export const removePublicationSuccess = () => ({
  type: actionTypes.REMOVE_PUBLICATION_SUCCESS
})

export const removePublicationFail = error => ({
  type: actionTypes.REMOVE_PUBLICATION_FAIL,
  error: error
})

export const publish = data => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(publishStart())
    const newPostId = database.ref('feed').push().key

    const file = data.imagen[0]
    const storageRef = storage.ref('feed').child(`${newPostId}/${file.name}`)

    const task = storageRef.put(file)
    
    task.on('state_changed', 
      snapshot => {
        // console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error => {
        dispatch(publishFail(error))
        reject(error)
      },
      () => {
        task.snapshot.ref.getDownloadURL()
          .then(url => {
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
            database.ref('feed')
              .child(newPostId)
              .set(newData)
              .then(() => {
                dispatch(reset('feedForm'))
                dispatch(publishSuccess())
                dispatch(fetchPublications(data.estado))
                resolve(data.estado)
              })
              .catch(error => {
                dispatch(publishFail(error))
                reject(error)
              })
          })
      })
  })
}

// export const publish = data => async dispatch => {
//   dispatch(publishStart())
//   const newPostId = database.ref('feed').push().key

//   const file = data.imagen[0]
//   console.log(file);
//   const storageRef = storage.ref('feed').child(`${newPostId}/${file.name}`)

//   const task = storageRef.put(file)

//   await task.on('state_changed', 
//     snapshot => {
//       console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//     },
//     error => {
//       dispatch(publishFail(error))
//     },
//     () => {
//       task.snapshot.ref.getDownloadURL()
//         .then(url => {
//           const user = auth.currentUser
//           const newData = {
//             ...data,
//             created: Date.now(),
//             imageUrl: url,
//             user: {
//               userId: user.uid,
//               displayName: user.displayName 
//             }
//           }
//           database.ref('feed')
//             .child(newPostId)
//             .set(newData)
//             .then(() => {
//               dispatch(reset('feedForm'))
//               dispatch(publishSuccess())
//               dispatch(fetchPublications(data.estado))
//             })
//             .catch(error => {
//               dispatch(publishFail(error))
//             })
//         })
//     })
// }

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

export const savePublication = data => async dispatch => {
  dispatch(savePublicationStart())
  
  let updates = {}
  updates['descripcion'] = data.descripcion
  updates['edited'] = true

  await database.ref('feed').child(data.id).update(updates)
    .then(() => {
      dispatch(fetchPublications(data.estado))
    })
    .catch(error => {
      dispatch(savePublicationFail(error))
    })
}

export const editPublication = publicationId => async dispatch => {
  dispatch(editPublicationStart(publicationId))
}

export const removePublication = (id, filter) => async dispatch => {
  dispatch(removePublicationStart())
  database.ref('feed').child(id)
    .remove(() => {
      dispatch(removePublicationSuccess())
      dispatch(fetchPublications(filter))
    })
    .catch(error => {
      dispatch(removePublicationFail(error))
    })
}