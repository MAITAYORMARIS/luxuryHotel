let datosForm = {}

function validarFormSpa(evento) {
    evento.preventDefault()

    datosForm = {
        nombre: evento.target[0].value.trim(),
        email: evento.target[1].value.trim(),
        telefono: evento.target[2].value.trim(),
        servicio: evento.target[3].value,
        fecha: evento.target[4].value,
        comentario: evento.target[5].value.trim()
    }

    // Verificar si algún campo está en blanco
    if (datosForm.nombre === "" || datosForm.email === "" || datosForm.telefono === "" || datosForm.servicio === "" || datosForm.fecha === "") {
        alert("Por favor complete todos los campos");
        return false;
    }
    //   verificar el campo mail
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!validEmail.test(datosForm.email)) {
        alert('Email invalido, por favor verifique');
        return false;
    }

    // Verificar si el telefono contiene solo 10 dígitos numéricos
    var telefonoStr = datosForm.telefono.toString()
    if (telefonoStr.length !== 10) {
        alert("El campo 'telefono' debe contener 10 digitos");
        return false;
    }

    //   verificar que la fecha seleccionada no sea pasada
    var hoy = new Date();
    var fechaFormulario = new Date(datosForm.fecha);

    // Comparamos solo las fechas =>  Lo iniciamos a 00:00 horas
    hoy.setHours(0, 0, 0, 0); //
    fechaFormulario.setHours(0, 0, 0, 0);

    if (hoy > fechaFormulario) {
        alert("La fecha seleccionada no es valida. Elija una fecha posterior");
        return false;
    }

    // Si todas las validaciones son exitosas, enviar el formulario

    mensajeExito()
    return true;

}

function alertaError(mensaje) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    })
}


function mensajeExito() {
    Swal.fire({
        html: `
         <p class="parrafoAlert">${datosForm.nombre}. Hemos recibido tu solicitud, nos pondremos en contacto al ${datosForm.telefono}, para confirmar tu cita </p>
            
  `,
        width: '60vw',
        title: '<b>Gracias por tu contacto</b>',
        icon: 'success',
        // html:html,
        confirmButtonText: "Aceptar",
        showCloseButton: true,
        focusConfirm: false,
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
    })
}
