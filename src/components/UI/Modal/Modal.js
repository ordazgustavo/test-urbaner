import React from 'react';

const modal = props => (
  <div className={`modal ${props.show && 'is-active'}`}>
    <div className="modal-background"></div>
    <div className="modal-content">
      {props.children}
    </div>
    <button onClick={props.hide} className="modal-close is-large" aria-label="close"></button>
  </div>
)

export default modal;