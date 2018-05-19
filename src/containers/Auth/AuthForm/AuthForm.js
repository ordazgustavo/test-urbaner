import React from 'react'
import { reduxForm, Field } from 'redux-form'

import validate from '../../../shared/validation'
import * as inputType from '../../../components/UI/Input/InputType/InputType'

const authForm = ({ handleSubmit, submitting, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <Field name="username" type="email" label="Username" component={inputType.input} />
    <Field name="password" type="password" label="Password" component={inputType.input} />

    <div className="field">
      <div className="control">
        <button type="submit" className="button is-link" disabled={submitting}>{rest.btnText}</button>
      </div>
    </div>
  </form>
)


const reduxFormConfig = {
  form: 'authForm',
  destroyOnUnmount: false,
  validate
}

export default reduxForm(reduxFormConfig)(authForm)