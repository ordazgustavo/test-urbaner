const validation = values => {
  const errors = {}

  if (!values.descripcion) {
    errors.descripcion = 'Campo requerido'
  }
  
  return errors
}

export default validation