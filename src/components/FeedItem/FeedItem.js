import React from 'react'

import FeedImage from './FeedImage/FeedImage'
import FeedContent from './FeedContent/FeedContent'

const feedItem = props => (
  <div className="box">
    <article className="media">
      <FeedImage imageUrl={props.image} />
      <FeedContent 
        isEdit={props.editing}
        wasEdited={props.edited}
        username={props.displayName} 
        since={props.since}
        initialValues={{id: props.id, descripcion: props.content}}
        content={props.content}>
        <nav className="level is-mobile">
          <div className="level-left">
            {props.children}
          </div>
        </nav>
      </FeedContent>
    </article>
  </div>
)

export default feedItem