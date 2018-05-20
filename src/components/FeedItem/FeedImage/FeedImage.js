import React from 'react'

const feedImage = props => (
  <div className="media-left">
    <figure className="image is-64x64">
      <img src={props.imageUrl} alt="feed" />
    </figure>
  </div>
)

export default feedImage