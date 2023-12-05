var botonNav = document.getElementsByClassName("link")
console.log(botonNav)

for (var i = 0; i < botonNav.length; i++) {
  const elementos = botonNav[i];

  elementos.addEventListener("click", function (e) {
    navegacion(e.target.id);
  })
}
// escuchar botones del home
// var botonIr=document.getElementsByClassName("botonHome")

// for (var m = 0; m < botonIr.length; m++) {
//   const botonesSec = botonIr[m];

//   botonesSec.addEventListener("click", function (e) {
//     var destino = e.target.getAttribute("data-destino");
//   navegacionAlternativa(destino);
//     // var idClic=e.target.id.split("ir")
//     // navegacion(idClic[1])
//   })
// }
function navegacion(id) {
  switch (id) {

    case "suites":
      document.getElementById("suites").setAttribute("href", "./suites.html")
      break;
    case "restaurante":
      document.getElementById("restaurante").setAttribute("href", "./restaurante.html")
      break;
    case "spa":
      document.getElementById("spa").setAttribute("href", "./spa.html")
      // getData()
      // construirServicios(dataSpa)
      break;
    case "nosotros":
      document.getElementById("nosotros").setAttribute("href", "./nosotros.html")
      break;
    default:
      document.getElementById("home").setAttribute("href", "./index.html")

  }
}
function toHome() {
  // console.log("llame a toHome")
  document.getElementById("home").setAttribute("href", "./index.html")
}



function navegacionAlternativa(id){
  var paginaanavegar=id
  window.location.pathname = `/hotel/${paginaanavegar}.html`
}

function reservar() {
  window.location.href = "suites.html";
}