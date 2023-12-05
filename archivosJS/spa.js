let dataSpa = []

async function getData() {
  let dataApi
  let services
  await fetch("https://yormarismaita-api-services-crud.onrender.com/api/spa")
    .then(response => response.json())

    .then(json => dataApi = json)

  services = dataApi.response.services
  console.log(services)
  for (var i = 0; i < services.length; i++) {
    dataSpa.push(services[i])

  }
  construirServicios(dataSpa)
} getData()

// RECORRE EL ARRAY GENERAL Y SEPARA POR PARES PARA PINTAR EL HTML A LA IZQUIERDA O DERECHA
function construirServicios(array) {
  var html = "";
  for (var i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      // si la posicion es par la imagen aparece a la izquierda
      html +=
        `
        <div class="productosItem ">
          <div class="productosPortada zoom">
            <img src=${array[i].image} alt=${array[i].alt}>
          </div>
          <div class="productoInfo">
            <h3>${array[i].nombre}</h3>
            <p>${array[i].info}</p>
            <p><i class="fa-solid fa-circle-info"></i>Condiciones: ${array[i].condiciones}</p>
            <div class="detalle">
              <div><p><i class="fa-solid fa-clock"></i>Duracion: ${array[i].duracion}</p></div>
              <div class="detalleDerecha">     
                <h3>Precio U$S: ${array[i].precio}</h3>
                <div class="enlacesServicios">
                  <button class="miBoton botonInfo" id=${array[i]._id}>Mas Info</button>
                  <button class="miBoton botonReserva" id=reserva${array[i]._id} data-servicio="${array[i].nombre}">Reservar</button>
                </div>
              </div>
            </div>
          </div>
        </div>`
    }
// si el indice es impar la imagen aparece a la derecha y el texto a la izquierda
    else {
      html +=
        `
        <div class="productosItem fondo ">
          <div class="productoInfo">
            <h3>${array[i].nombre}</h3>
            <p>${array[i].info}</p>
            <p><i class="fa-solid fa-circle-info"></i>Condiciones: ${array[i].condiciones}</p>
            <div class="detalle">
              <div><p><i class="fa-solid fa-clock"></i>Duracion: ${array[i].duracion}</p></div>
              <div class="detalleDerecha">
                <h3>Precio U$S: ${array[i].precio}</h3>
                <div class="enlacesServicios">
                  <button class="miBoton botonInfo" id=${array[i]._id}>Mas Info</button>
                  <button class="miBoton botonReserva" id=reserva${array[i]._id} data-servicio="${array[i].nombre}">Reservar</button>
                </div>
              </div>                
            </div>             
          </div>
          <div class="productosPortada zoom">
                        <img src=${array[i].image}
                            alt=${array[i].alt}>
          </div>
          </div>`
    }

  }
  document.getElementById('contenedorServicios').innerHTML = html;
  // MOSTRAR DETALLE DE SERVICIOS
  var botonInfo = document.querySelectorAll(".botonInfo")
  for (var u = 0; u < botonInfo.length; u++) {
    botonInfo[u].addEventListener("click", function (e) {
      mostrarDetalle(e.target.id)
    })
  }

  // LLAMADO A FORMULARIO DE RESERVA SPA
  var botonReserva = document.querySelectorAll(".botonReserva")
console.log(botonReserva)
for (var b = 0; b < botonReserva.length; b++) {
  botonReserva[b].addEventListener("click", function (e) {
    pintarFormulario()
    formularioSpa(e.target.dataset.servicio)
    // console.log(e.target.getAttribute("data-servicio"))

  })
}

}
// FUNCION PARA UBICAR LOS DATOS DEL SERVICIO SELECCIONADO EN EL ARRAY DE SERVICIOS GRAL
function mostrarDetalle(id) {
  var detalleServicio = []
  var descripcion

  for (var m = 0; m < dataSpa.length; m++) {
    if (dataSpa[m]._id == id) {

      detalleServicio.push(dataSpa[m].servicios)
      descripcion = (dataSpa[m].descripcion)
    }
  }
  pintarDetalle(detalleServicio[0], descripcion)
}
// FUNCION PARA CONSTRUIR EL HTML DEL DETALLE
function pintarDetalle(array, string) {
  var texto = ''
  var htmlDetalle = "";
  for (var i = 0; i < array.length; i++) {
    htmlDetalle +=
      `
        <div class="terapias">
        <h3><i class="fa-solid fa-circle-check"></i>${array[i].nombre}</h3>
<p>${array[i].detalle}</p>
        </div>`
    texto = `<p style="text-align: justify;">${string}</p>`
  }

  Swal.fire({
    width: '80vw',
    title: '<b>Detalle del servicio</b>',
    icon: 'info',
    html: texto + htmlDetalle,
    showCloseButton: true,
    focusConfirm: false,
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down',
    customClass: {
      container: 'contenedorAlert' // Clase CSS personalizada para el contenedor
    }
  })

}


// FUNCION PARA ABRIR FORMULARIO DESDE LOS BOTONES DE RESERVA
function formularioSpa(servicioSeleccionado) {
  var selectServicio = document.getElementById("servicio");

  // Encuentra la opción que coincide con el servicio y la marca
  for (var i = 0; i < selectServicio.options.length; i++) {
    if (selectServicio.options[i].value === servicioSeleccionado) {
      selectServicio.selectedIndex = i;
      break;
    }
  }
}
// CONSTRUYE EL HTML DEL FORMULARIO DE RESERVA
function pintarFormulario(){
  var formulario = `
  <form action="" id="formularioSpa" onsubmit="validarFormSpa(event)">
                    <div class="entrada">
                        <label for="nombre"><i class="fa-solid fa-user"></i></label>
                        <input type="text" id="nombre" name="nombre" placeholder="Ingrese Nombre y Apellido">
                    </div>

                    <div class="entrada">
                        <label for="email"><i class="fa-solid fa-at"></i></label>
                        <input id="email" type="email" name="email" placeholder="email@email.com">
                    </div>

                    <div class="entrada">
                        <label for="telefono"><i class="fa-solid fa-user"></i></label>
                        <input class="telefono" id="telefono" type="number" name="telefono"
                            placeholder="Ingrese nro de contacto">
                    </div>

                    <div class="entrada">
                        <div class="seleccion">
                            <label for="servicio" selector><i class="fa-solid fa-qrcode"></i></label>
                            <select id="servicio" name="servicio">
                                <option selected>Servicio</option>
                                <option value="Dia de Spa">Dia de Spa</option>
                                <option value="Relax + Facial Amigos">Relax + Facial Amigos</option>
                                <option value="Masaje Relajante">Masaje Relajante</option>
                                <option value="Spa Facial">Spa Facial</option>
                                <option value="Masaje Descontracturante">Masaje Descontracturante</option>
                                <option value="Hidroterapia">Hidroterapia</option>
                            </select>
                        </div>

                        <div class="seleccion">
                            <label for="date"><i class="fa-solid fa-calendar"></i></i></label>
                            <input type="date" id="date" class="form-control">
                        </div>

                    </div>

                    <div class="entrada">
                        <label for="comentario"><i class="fa-solid fa-comment"></i></label>
                        <textarea id="comentario" class="form-control" placeholder=" Dejanos tu comentario"></textarea>
                    </div>

                    <div class="boton_form">
                        <button id="enviar" class="miBoton" type="submit">Enviar<i
                                class="fa-solid fa-paper-plane"></i></button>
                        <button id="resetBtn" type="reset" class="miBoton">Reset<i
                                class="fa-solid fa-arrow-rotate-right"></i></button>
                    </div>
                </form>
                `
  // lo agrego en un alert
  Swal.fire({
    didOpen: () =>{
      Swal.getConfirmButton(), ocultarBoton()},
    width: '80vw',
    title: '<b>Reserva de Servicio</b>',
    icon: 'warning',
    html: formulario,
    showCloseButton: true,
    focusConfirm: false,
    cancelButtonText:
      '<i class="fa fa-thumbs-down"></i>',
    cancelButtonAriaLabel: 'Thumbs down',
    customClass: {
      container: 'contenedorAlert' // Clase CSS personalizada para el contenedor
    }
  })

  // let formSpa = document.querySelector("#formularioSpa")
  // formSpa.addEventListener("submit", function (evento) { 
    
  //   validacionFormSpa(evento) })
}
// PARA OCULTAR EL BOTON OK PREDETERMINADO DE SWEETALERT
function ocultarBoton(){
  var botonOK=document.getElementsByClassName("swal2-confirm swal2-styled")
botonOK[0].style.display="none"
}