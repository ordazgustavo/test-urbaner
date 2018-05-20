import React from 'react'

import FeedImage from './FeedImage/FeedImage'
import FeedContent from './FeedContent/FeedContent'

const feedItem = () => (
  <div className="box">
    <article className="media">
      <FeedImage imageUrl="https://bulma.io/images/placeholders/128x128.png" />
      <FeedContent username="ordazsgustavo" since="31m" content="Lorem ipsum">
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item" aria-label="edit">
              <span className="icon is-small">
                <i className="fas fa-edit" aria-hidden="true"></i>
              </span>
            </a>
            <a className="level-item" aria-label="delete">
              <span className="icon is-small">
                <i className="fas fa-trash" aria-hidden="true"></i>
              </span>
            </a>
          </div>
        </nav>
      </FeedContent>
    </article>
  </div>
)

export default feedItem