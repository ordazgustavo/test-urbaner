import React, { Component } from 'react'
import { connect } from 'react-redux'

import FeedForm from './FeedForm/FeedForm'
import FeedItem from '../../components/FeedItem/FeedItem'

import * as actions from '../../store/actions'

class Feed extends Component {
  componentDidMount () {
    this.props.onLoadFeed()
  }

  submit = values => {
    console.log(values);
    this.props.onPublish(values, this.props.userId)
  }

  render () {
    return (
      <div className="container">
        <div className="box">
          <FeedForm onSubmit={this.submit} loading={this.props.loading} btnText="Publicar" />
        </div>
        {this.props.feed.map(pub => (
          <FeedItem 
            key={pub.id} 
            content={pub.descripcion} 
            displayName={pub.user.displayName} 
            since={pub.created}
            image={pub.imageUrl} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    loading: state.feed.loading,
    feed: state.feed.feed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPublish: (data, userId) => dispatch(actions.publish(data, userId)),
    onLoadFeed: () => dispatch(actions.fetchPublications())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)