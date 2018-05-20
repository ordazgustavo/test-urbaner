import isEmail from 'sane-email-validation'

const validation = values => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Campo requerido'
  } else if (!isEmail(values.username)) {
    errors.username = 'Correo inválido'
  }

  if (!values.password) {
    errors.password = 'Campo requerido'
  } else if (values.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres'
  }
  
  return errors
}

export default validation