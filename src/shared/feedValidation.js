const validation = values => {
  const errors = {}

  if (!values.descripcion) {
    errors.descripcion = 'Campo requerido'
  }

  if (!values.estado) {
    errors.estado = 'Campo requerido'
  }

  if (!values.imagen) {
    errors.imagen = 'Campo requerido'
  } else if (!validFileType(values.imagen[0])) {
    errors.imagen = 'Archivo inválido, sólo: JPG, JPEG, PNG'
  }
  
  return errors
}

const validFileType = file => {
  const fileTypes = [
    'image/jpg',
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]

  if (file) {
    for(var i = 0; i < fileTypes.length; i++) {
      if(file.type === fileTypes[i]) {
        return true;
      }
    }
  }
  
  return false;
}

export default validation