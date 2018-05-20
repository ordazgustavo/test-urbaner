import React, { Component } from 'react'
import { connect } from 'react-redux'

import FeedForm from './FeedForm/FeedForm'
import FeedItem from '../../components/FeedItem/FeedItem'

import * as actions from '../../store/actions'

class Feed extends Component {
  state = {
    filter: 'Publico'
  }

  componentDidMount () {
    this.props.onLoadFeed(this.state.filter)
  }

  submit = values => {
    console.log(values);
    this.props.onPublish(values, this.props.userId)
  }

  handleChange = (event) => {
    this.props.onLoadFeed(event.target.value)
    this.setState({filter: event.target.value})
  }

  renderFeed = () => {
    let feed = null
    if ((!this.props.isAuthenticated && this.state.filter === 'Publico') || this.props.isAuthenticated) {
      // Si NO esta autenticado y el filtro es 'Público'
      // O Si esta autenticado

      if (this.props.feed.length) {
        // Si el array.length NO esta vacio

        feed = this.props.feed.map(pub => (
          <FeedItem 
            key={pub.id} 
            content={pub.descripcion} 
            displayName={pub.user.displayName} 
            since={pub.created}
            image={pub.imageUrl} />
        ))
      } else {
        // Si el array esta vacio

        feed = (
          <div className="box">
            No hay publicaciones
          </div>
        )
      }
      
    } else if (!this.props.isAuthenticated && this.state.filter === 'Privado') {
      // Si NO esta autenticado y el filtro es 'Privado'

      feed = (
        <div className="box">
          Debes estar autenticado
        </div>
      )
    }

    return feed
  }

  render () {
    let form = null
    if (this.props.isAuthenticated) {
      form = (
        <div className="box">
          <FeedForm onSubmit={this.submit} loading={this.props.loading} btnText="Publicar" />
        </div>
      )
    }
    const feed = this.renderFeed()

    return (
      <div className="container">
        {form}
        <div className="select">
          <select value={this.state.filter} onChange={this.handleChange}>
            <option value="Publico">Público</option>
            <option value="Privado">Privado</option>
          </select>
        </div>
        <hr/>
        <div className="container">
          {feed}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null,
    userId: state.auth.userId,
    loading: state.feed.loading,
    feed: state.feed.feed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPublish: (data, userId) => dispatch(actions.publish(data, userId)),
    onLoadFeed: (filter) => dispatch(actions.fetchPublications(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)