import isEmail from 'sane-email-validation'

const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Required'
  } else if (!isEmail(values.username)) {
    errors.username = 'Correo inválido'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  
  return errors
}

export default validate