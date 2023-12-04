const { createApp } = Vue
createApp({
    data() {
        return {
            menu: [],
            url: 'https://yormaris.pythonanywhere.com/menu',
            error: false,
            cargando: true,
            /*atributos para guardar los valores del formulario */
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
            ]
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    this.menu = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(plato) {
            const url = this.url + '/' + plato;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    alert("Plato eliminado")
                    location.reload();
                })
        },
        agregar() {
            // Verificar si ya existe un plato con el mismo nombre
            const platoExistente = this.menu.find(item => item.nombre.toLowerCase() === this.nombre.toLowerCase());
            if (platoExistente) {
                // Si el plato ya existe, muestra un mensaje de error
                alert("Error: Ya existe un plato con el mismo nombre en el menú.");
            }
            else {
                // Si el plato no existe, se agrega
                let plato = {
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    foto: this.foto,
                    precio: this.precio,
                    categoria: this.categoria
                }
                var options = {
                    body: JSON.stringify(plato),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }

                fetch(this.url, options)
                    .then(function () {
                        alert("Plato añadido al menu")
                        window.location.href = "../templates/gestor_menu.html";
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Guardar");
                    })
                   
                }
            },
            volver(){
                window.location.href = "../templates/gestor_menu.html"}

        },
        created() {
            this.fetchData(this.url)
        },

    }).mount('#app')