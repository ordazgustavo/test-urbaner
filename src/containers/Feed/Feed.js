import React, { Component } from 'react'
import { connect } from 'react-redux'

import FeedForm from './FeedForm/FeedForm'
import FeedItem from '../../components/FeedItem/FeedItem'

import * as actions from '../../store/actions'

class Feed extends Component {
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
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    loading: state.publish.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPublish: (data, userId) => dispatch(actions.publish(data, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)