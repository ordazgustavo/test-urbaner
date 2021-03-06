import React from 'react';
import { reduxForm, Field } from 'redux-form'

import validate from '../../../shared/editPublication'
import * as inputType from '../../UI/Input/InputType/InputType'
import * as actions from '../../../store/actions'

const editForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field name="id" type="hidden" component="input" />
    <Field name="estado" type="hidden" component="input" />
    <Field name="descripcion" label="Editar publicación" component={inputType.textarea} />
  </form>
)

const submit = (values, dispatch) => {
  dispatch(actions.savePublication(values))
}

const reduxFormConfig = {
  form: 'editPublicationForm',
  onSubmit: submit,
  validate
}

export default reduxForm(reduxFormConfig)(editForm)