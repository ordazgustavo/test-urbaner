import React from 'react';

const submenuToggle = props => (
  <button
    style={{ border: 'none' }}
    className="button has-background-primary navbar-burger"
    aria-label="menu"
    aria-expanded="false"
    onClick={props.clicked}
  >
    <span aria-hidden="true" />
    <span aria-hidden="true" />
    <span aria-hidden="true" />
  </button>
);

export default submenuToggle;
