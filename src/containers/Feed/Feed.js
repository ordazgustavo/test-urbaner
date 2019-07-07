import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Link } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import FeedForm from './FeedForm/FeedForm';
import FeedItem from '../../components/FeedItem/FeedItem';
import Modal from '../../components/UI/Modal/Modal';

import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import IconButton from '../../components/UI/Button/IconButton/IconButton';

class Feed extends Component {
  state = {
    filter: 'Publico',
    showModal: false,
    removeId: null
  };

  componentDidMount() {
    this.props.onLoadFeed(this.state.filter);
  }

  submit = async values => {
    let data = await this.props.onPublish(values);
    this.setState({ filter: data });
  };

  handleChange = event => {
    this.props.onLoadFeed(event.target.value);
    this.setState({ filter: event.target.value });
  };

  handleEdit = id => {
    this.props.onEditPublication(id);
  };

  handleRemove = id => {
    this.props.onRemovePublication(id, this.state.filter);
  };

  handleSave = id => {
    this.props.onSubmitEditForm();
  };

  showModalHandler = id => {
    this.setState(prevState => {
      return {
        removeId: id,
        showModal: !prevState.showModal
      };
    });
  };

  hideModalHandler = () => {
    this.setState({ showModal: false });
  };

  removeButtonHandler = () => {
    this.handleRemove(this.state.removeId);
    this.hideModalHandler();
  };

  renderFeed = () => {
    let feed = null;
    if (
      (!this.props.isAuthenticated && this.state.filter === 'Publico') ||
      this.props.isAuthenticated
    ) {
      // Si NO esta autenticado y el filtro es 'Público'
      // O Si esta autenticado

      if (this.props.feed.length) {
        // Si el array.length NO esta vacio

        feed = this.props.feed.map(pub => {
          const editingPublication = this.props.editing === pub.id;
          //    ^^ Si esta publicacion esta siendo editada

          let controls = null;
          if (pub.user.userId === this.props.userId) {
            // Mostrar controles solo al usuario que creo la publicacion
            controls = (
              <Aux>
                {editingPublication ? (
                  <IconButton
                    icon="fas fa-save"
                    clicked={() => this.handleSave(pub.id)}
                  />
                ) : (
                  <IconButton
                    icon="fas fa-edit"
                    clicked={() => this.handleEdit(pub.id)}
                  />
                )}
                <IconButton
                  icon="fas fa-trash"
                  clicked={() => this.showModalHandler(pub.id)}
                />
              </Aux>
            );
          }

          return (
            <FeedItem
              key={pub.id}
              values={{
                id: pub.id,
                descripcion: pub.descripcion,
                estado: pub.estado
              }}
              displayName={pub.user.displayName}
              since={pub.created}
              edited={pub.edited}
              editing={editingPublication}
              image={pub.imageUrl}
            >
              {controls}
            </FeedItem>
          );
        });
      } else if (!this.props.feed.length && !this.props.fetching) {
        // Si el array esta vacio
        // y terminó la solicitud

        feed = <div className="box">No hay publicaciones</div>;
      }
    } else if (!this.props.isAuthenticated && this.state.filter === 'Privado') {
      // Si NO esta autenticado y el filtro es 'Privado'

      feed = (
        <div className="box">
          Debes estar autenticado <Link to="/login">Ingresar</Link>
        </div>
      );
    }

    return feed;
  };

  render() {
    let form = null;
    let modalContent = null;

    if (this.props.isAuthenticated) {
      form = (
        <div className="box">
          <FeedForm onSubmit={this.submit} btnText="Publicar" />
        </div>
      );

      if (this.state.showModal && this.state.removeId) {
        modalContent = (
          <div className="box">
            <p>¿Seguro que quieres eliminar esta publicación?</p>
            <div className="field is-grouped">
              <p className="control">
                <button onClick={this.hideModalHandler} className="button">
                  Cancelar
                </button>
              </p>
              <p className="control">
                <button
                  onClick={this.removeButtonHandler}
                  className="button is-danger"
                >
                  Eliminar
                </button>
              </p>
            </div>
          </div>
        );
      }
    }

    const feed = this.renderFeed();
    const fetching = this.props.fetching ? <Spinner /> : null;

    let content = <Spinner />;

    if (!this.props.loading) {
      content = (
        <div className="container">
          {form}
          <div className="select">
            <select value={this.state.filter} onChange={this.handleChange}>
              <option value="Publico">Público</option>
              <option value="Privado">Privado</option>
            </select>
          </div>
          <br />
          <br />
          <div className="container">
            {fetching}
            {feed}
          </div>
        </div>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.showModal} hide={this.hideModalHandler}>
          {modalContent}
        </Modal>
        {content}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    fetching: state.feed.fetching,
    isAuthenticated: state.auth.userId !== null,
    userId: state.auth.userId,
    publishing: state.feed.publishing,
    feed: state.feed.feed,
    editing: state.feed.editing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPublish: async data => await dispatch(actions.publish(data)),
    onLoadFeed: filter => dispatch(actions.fetchPublications(filter)),
    onEditPublication: id => dispatch(actions.editPublication(id)),
    onRemovePublication: (id, filter) =>
      dispatch(actions.removePublication(id, filter)),
    onSubmitEditForm: () => dispatch(submit('editPublicationForm'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
