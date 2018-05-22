import React from 'react'

const feedImage = props => (
  <div className="media-left">
    <figure className="image" style={{width: 64}}>
      <img src={props.imageUrl} alt="feed" />
    </figure>
  </div>
)

export default feedImage