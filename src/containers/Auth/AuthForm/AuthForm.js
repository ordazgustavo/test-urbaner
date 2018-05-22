import React from 'react'
import { reduxForm, Field } from 'redux-form'

import validate from '../../../shared/validation'
import * as inputType from '../../../components/UI/Input/InputType/InputType'
import SubmitButton from '../../../components/UI/Button/SubmitButton/SubmitButton';

const authForm = ({ handleSubmit, submitting, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <Field name="username" type="email" label="Username" component={inputType.input} />
    <Field name="password" type="password" label="Password" component={inputType.input} />

    <SubmitButton loading={submitting}>{rest.btnText}</SubmitButton>
  </form>
)

const reduxFormConfig = {
  form: 'authForm',
  validate
}

export default reduxForm(reduxFormConfig)(authForm)