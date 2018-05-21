import React from 'react'

import FeedImage from './FeedImage/FeedImage'
import FeedContent from './FeedContent/FeedContent'

const feedItem = props => (
  <div className="box">
    <article className="media">
      <FeedImage imageUrl={props.image} />
      <FeedContent username={props.displayName} since={props.since} content={props.content}>
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