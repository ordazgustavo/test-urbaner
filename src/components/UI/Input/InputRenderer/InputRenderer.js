import React from 'react';

const inputRenderer = render => ({ input, meta, label, ...rest }) => {
  const inputClasses = ['input']
  if (meta.error && meta.touched) {
    inputClasses.push('is-danger')
  }
  if (meta.active) {
    inputClasses.push('is-active')
  }

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        {render(input, inputClasses, rest)}
      </div>
      {meta.error && meta.touched && <p className="help is-danger">{meta.error}</p>}
    </div>
  )
}

export default inputRenderer;