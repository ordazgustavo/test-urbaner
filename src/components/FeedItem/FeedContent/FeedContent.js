import React from 'react'

const feedContent = props => (
  <div className="media-content">
    <div className="content">
      <p>
        <small>@{props.username}</small> <small>{props.since}</small>
        <br />
        {props.content}
      </p>
    </div>
    {props.children}
  </div>
)

export default feedContent