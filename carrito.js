let carrito = localStorage.getItem("carrito");
carrito = JSON.parse(carrito);

const carritoProductos = document.querySelector("#carritoProductos");
const contenedor = document.querySelector(".general");
const botonComprar = document.querySelector(".boton-comprar");
const botonVaciar = document.querySelector("#accion-vaciar")
const menuCompras = document.querySelector(".resumen-compras");
let carritoHtml = document.querySelector("#carritoProductos");
let carritoEliminar = document.querySelectorAll(".carrito-eliminar");
let carritoVacio = document.querySelector("#vacio");
const accionVacio = document.querySelector("#accion-vaciar");
const total = document.querySelector("#total");




function mostrarCarrito() {
    if (carrito && carrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        menuCompras.classList.remove("disabled");
        botonVaciar.classList.remove("disabled");
        botonComprar.classList.remove("disabled");

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
        carritoProductos.classList.add("disabled");
        menuCompras.classList.add("disabled");
        botonVaciar.classList.add("disabled");
        botonComprar.classList.add("disabled");
    }
        actualizarTotal();
}

mostrarCarrito();

function actualizarTotal() {
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}



accionVacio.addEventListener("click", cartVacio);
function cartVacio() {
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
