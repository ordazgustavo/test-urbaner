import React from 'react'
import moment from 'moment'

import Aux from '../../../hoc/Aux/Aux'
import EditForm from '../EditForm/EditForm'

const feedContent = props => {
  let infoText = <small>@{props.username} {moment(props.since).fromNow()}</small>
  if (props.wasEdited) {
    infoText = <small>@{props.username} {moment(props.since).fromNow()} (editado)</small>
  }
  let content = (
    <p>
      {infoText}
      <br />
      {props.content}
    </p>
  )

  if (props.isEdit) {
    content = (
      <Aux>
        <p>{infoText}</p>
        <EditForm initialValues={props.initialValues} />
      </Aux>
    )
  }

  return (
    <div className="media-content">
      <div className="content">
        {content}
      </div>
      {props.children}
    </div>
  )
}

export default feedContent