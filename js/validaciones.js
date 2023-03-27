export function validar(input){
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);
    }
};

const tiposErrores = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError',
];

const mensajesError= {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío'
    },
    email: {
        valueMissing: 'El campo correo no puede estar vacío',
        typeMismatch: 'El correo no es válido'
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacío',
        patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
    nacimiento: {
        valueMissing: 'El campo nacimiento no puede estar vacío',
        customError:'Debes tener al menos 18 años de edad.'
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es XXXXXXXX 10 números'
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres.'
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'La ciudad debe contener entre 4 a 30 caracteres.'
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'El estado debe contener entre 4 a 30 caracteres.'
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = '';
    tiposErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoInput][error]);
            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    mayorEdad(fechaCliente);
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad.";
    }
    input.setCustomValidity(mensaje)
};

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
};