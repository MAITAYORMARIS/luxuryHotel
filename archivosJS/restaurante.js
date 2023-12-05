let dataRestaurante = []

async function getData() {
    let dataApi
    let menu
    await fetch("https://yormaris.pythonanywhere.com/menu")
        // .then(console.log(response))
        .then(response => response.json())

        .then(json => dataApi = json)


    menu = dataApi
    console.log(menu)
    for (var i = 0; i < menu.length; i++) {
        dataRestaurante.push(menu[i])

    }
    construirMenu(dataRestaurante)
} getData()


document.addEventListener("DOMContentLoaded", function () {

    const anteriorImagenBtn = document.getElementById("anteriorImagen");
    const siguienteImagenBtn = document.getElementById("siguienteImagen");
    const carrusel = document.getElementById("carrusel");
    const imagenes = carrusel.getElementsByTagName("img");
    let imagenActual = 0;

    anteriorImagenBtn.addEventListener("click", () => {
        cambiarImagen(-1);
    });

    siguienteImagenBtn.addEventListener("click", () => {
        cambiarImagen(1);
    });

    function mostrarImagen(indice) {
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].style.display = "none";
        }
        imagenes[indice].style.display = "block";
    }

    function cambiarImagen(delta) {
        imagenActual += delta;

        if (imagenActual < 0) {
            imagenActual = imagenes.length - 1;
        } else if (imagenActual >= imagenes.length) {
            imagenActual = 0;
        }
        mostrarImagen(imagenActual);
    }

});

function construirMenu(array) {
    var html = "";
    for (var i = 0; i < array.length; i++) {
        if (i % 2 === 0) {
            // si la posicion es par la imagen aparece a la izquierda
            html +=
                `
          <div class="productosItem ">
            <div class="productosPortada zoom">
              <img src=${array[i].foto} alt="foto"+${array[i].nombre}>
            </div>
            <div class="productoInfo">
              <h3>${array[i].nombre}</h3>
              <p>${array[i].descripcion}</p>
              <p><i class="fa-solid fa-circle-info"></i>Categoria: ${array[i].categoria}</p>
              
                <div class="detalleDerecha">     
                  <h3>Precio USD: ${array[i].precio}</h3>
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
              <p>${array[i].descripcion}</p>
              <p><i class="fa-solid fa-circle-info"></i>Categoria: ${array[i].categoria}</p>
              
              <div class="detalleDerecha">     
                <h3>Precio USD: ${array[i].precio}</h3>
              </div>
            </div>                
                        
            
            <div class="productosPortada zoom">
            <img src=${array[i].foto} alt="foto"+${array[i].nombre}>
            </div>
            </div>`
        }

    }
    document.getElementById('contenedorMenu').innerHTML = html;
}