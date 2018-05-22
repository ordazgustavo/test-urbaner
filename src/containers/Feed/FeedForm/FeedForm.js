import React from 'react'
import { reduxForm, Field } from 'redux-form'

import validate from '../../../shared/feedValidation'
import * as inputType from '../../../components/UI/Input/InputType/InputType'
import SubmitButton from '../../../components/UI/Button/SubmitButton/SubmitButton';

const authForm = ({ handleSubmit, submitting, ...props }) => (
  <form onSubmit={handleSubmit}>
    <Field name="descripcion" label="Descripción" component={inputType.textarea} />
    <Field name="estado" label="Estado" component={inputType.select}>
      <option value="Publico">Público</option>
      <option value="Privado">Privado</option>
    </Field>
    <Field name="imagen" label="Imagen" accept="image/*" component={inputType.file} />

    <SubmitButton loading={submitting}>{props.btnText}</SubmitButton>
  </form>
)

const reduxFormConfig = {
  form: 'feedForm',
  destroyOnUnmount: false,
  validate
}

export default reduxForm(reduxFormConfig)(authForm)