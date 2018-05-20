import React from 'react'
import { reduxForm, Field } from 'redux-form'

import validate from '../../../shared/feedValidation'
import * as inputType from '../../../components/UI/Input/InputType/InputType'

const authForm = ({ handleSubmit, submitting, ...props }) => (
  <form onSubmit={handleSubmit}>
    <Field name="descripcion" label="Descripción" component={inputType.textarea} />
    <Field name="estado" label="Estado" component={inputType.select}>
      <option>Seleccionar</option>
      <option value="Publico">Publico</option>
      <option value="Privado">Privado</option>
    </Field>
    <Field name="imagen" label="Imagen" accept="image/*" component={inputType.file} />

    <div className="field">
      <div className="control">
        <button type="submit" className={`button is-link ${props.loading ? 'is-loading': ''}`} disabled={submitting}>{props.btnText}</button>
      </div>
    </div>
  </form>
)

const reduxFormConfig = {
  form: 'feedForm',
  destroyOnUnmount: false,
  validate
}

export default reduxForm(reduxFormConfig)(authForm)