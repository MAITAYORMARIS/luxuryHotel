console.log(location.search) // lee los argumentos pasados a este formulario
var idSeleccionado = location.search.split('?id=')
var id = idSeleccionado[1]
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        return {
            id: 0,
            nombre: "",
            descripcion: "",
            foto: "",
            precio: 0,
            categoria: "",
            listaCategorias: [
                { id: 'postres', nombre: 'Postres' },
                { id: 'principal', nombre: 'Plato Principal' },
                { id: 'entrada', nombre: 'Entrada' },
                { id: 'bebidas', nombre: 'Bebidas' }
            ],
            url: 'https://yormaris.pythonanywhere.com/menu/' + id,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.foto = data.foto
                    this.descripcion = data.descripcion
                    this.precio = data.precio
                    this.categoria = data.categoria
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let plato = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                foto: this.foto,
                precio: this.precio,
                categoria: this.categoria
            }
            console.log(plato)
            var options = {
                body: JSON.stringify(plato),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Plato modificado")
                    window.location.href = "./gestor_menu.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar el Registro")
                })
        },
        volver(){
            window.location.href = "./gestor_menu.html";
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')