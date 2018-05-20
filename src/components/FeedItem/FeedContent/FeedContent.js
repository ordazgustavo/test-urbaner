import React from 'react'
import moment from 'moment'

const feedContent = props => (
  <div className="media-content">
    <div className="content">
      <p>
        <small>@{props.username}</small> <small>{moment(props.since).fromNow()}</small>
        <br />
        {props.content}
      </p>
    </div>
    {props.children}
  </div>
)

export default feedContent