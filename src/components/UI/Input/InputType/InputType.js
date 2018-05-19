import React from 'react'

import InputRenderer from '../InputRenderer/InputRenderer'

export const input = InputRenderer((input, classes, {type}) => <input className={classes.join(' ')} type={type} {...input}/>)

export const select = InputRenderer((input, classes, {children}) => (
  <select className={classes.join(' ')} {...input}>
    {children}
  </select>
))