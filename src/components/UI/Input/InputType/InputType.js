import React from 'react'

import InputRenderer from '../InputRenderer/InputRenderer'

export const input = InputRenderer((input, classes, {type}) => <input className={`input ${classes.join(' ')}`} type={type} {...input}/>)

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0])

export const file = InputRenderer((input, classes, rest) => {
  let fileName = input.value[0] ? input.value[0].name : ''
  delete input.value

  return (
    <div className="file has-name is-fullwidth">
      <label className="file-label">
        <input
          className={`file-input ${classes.join(' ')}`}
          onChange={adaptFileEventToValue(input.onChange)}
          onBlur={adaptFileEventToValue(input.onBlur)}
          type="file"
          {...input}
          {...rest}
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">
            Escoge un archivo…
          </span>
        </span>
        <span className="file-name">
          {fileName}
        </span>
      </label>
    </div>
  )
})

export const select = InputRenderer((input, classes, {children}) => (
  <div className={`select ${classes.join(' ')}`}>
    <select {...input}>
      {children}
    </select>
  </div>
))

export const textarea = InputRenderer((input, classes) => <textarea className={`textarea ${classes.join(' ')}`} {...input}></textarea>)