import React from 'react';

const submitButton = props => (
  <div className="field">
    <div className="control">
      <button type="submit" className={`button is-link ${props.loading ? 'is-loading': ''}`} disabled={props.loading}>{props.children}</button>
    </div>
  </div>
)

export default submitButton;