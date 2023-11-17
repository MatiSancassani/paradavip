let carrito = localStorage.getItem("carrito");
carrito = JSON.parse(carrito);
let carritoHtml = document.querySelector("#carritoProductos");
let carritoEliminar = document.querySelectorAll(".carrito-eliminar");
let carritoVacio = document.querySelector("#vacio");

function mostrarCarrito() {
    if (carrito && carrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoHtml.innerHTML = "";
        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-productos");
            div.innerHTML = `
            <div class="general">            
            <img src="${producto.imagen}" alt="">
            <div class="productos">
                <small>Producto</small>
                <p>${producto.descripcion}</p>
            </div>
            <div class="cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            </div>
            `  
            carritoHtml.append(div);      
        })
    }    else {
        carritoVacio.classList.remove("disabled");
    }
}

mostrarCarrito();