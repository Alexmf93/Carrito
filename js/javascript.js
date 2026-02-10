let contenedor = document.getElementById("container")
let contenido = ""

productos.forEach(producto => {
    contenido += `
    <div class="card">
        <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text">Precio: €${producto.precio}</p>
        </div>
    </div>

    `
})

contenedor.innerHTML = contenido