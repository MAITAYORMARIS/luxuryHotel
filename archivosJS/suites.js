document.addEventListener("DOMContentLoaded", function () {

    //  Apertura de formulario de reserva de habitaciones

    const abrirFormulario = document.querySelectorAll("#reservar1, #reservar2, #reservar3, #reservar4");

    abrirFormulario.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const formulario = document.getElementById("formulario");
            formulario.style.display = "block";
        });
    });

    const cerrarFormulario = document.getElementById("cerrarFormulario");
    cerrarFormulario.addEventListener("click", function () {
        const formulario = document.getElementById("formulario");
        formulario.style.display = "none";
    });

    // Envío de información de reserva a la API

    const API_URL = "https://sheetdb.io/api/v1/r8hyeg50syk18";

    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = document.querySelector("form");
        let dataForm = new FormData(form);
        dataForm.append("ticket_time", new Date().toString());

        await fetch(API_URL, {
            method: "POST",
            body: dataForm,
        });

        form.classList.add("animation");

        alert("GRACIAS! Pronto nos comunicaremos con vos!");
        window.location.href = "/";
    });

    // Mostrar fotos de habitaciones

    const abrirCarruselBtn = document.getElementById("abrirCarrusel");
    const cerrarCarruselBtn = document.getElementById("cerrarCarrusel");
    
    const carrusel = document.getElementById("carrusel");
    const imagenes = carrusel.getElementsByTagName("img");

    const anteriorImagenBtn = document.getElementById("anteriorImagen");
    const siguienteImagenBtn = document.getElementById("siguienteImagen");
    let imagenActual = 0;

    abrirCarruselBtn.addEventListener("click", () => {
        carrusel.style.display = "block";
        mostrarImagen(imagenActual);
    });

    cerrarCarruselBtn.addEventListener("click", () => {
        carrusel.style.display = "none";
    });

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


