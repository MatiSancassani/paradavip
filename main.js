const productos = [
   {
      id: "coca",
      nombre: "Coca Cola",
      imagen: "./img/coca-medio.jpg",
      descripcion: "Coca 500cc",
      precio: 530,
      categoria: {
         nombre: "Coca Cola",
         id: "gaseosas"
      },
   },
   {
      id: "pepsi",
      nombre: "Pepsi",
      imagen: "./img/pepsi-medio.jpeg",
      descripcion: "Pepsi 500cc",
      precio: 530,
      categoria: {
         id: "gaseosas",
      }
   },
   {
      id: "fanta",
      nombre: "Fanta",
      imagen: "./img/fanta-medio.png",
      descripcion: "Fanta 500cc",
      precio: 530,
      categoria: {
         id: "gaseosas",
      }
   },
   {
      id: "chestefield",
      nombre: "Chesterfield 20 Box",
      imagen: "./img/chester-caps-20.png",
      descripcion: "Chesterfield 20 Box",
      precio: 500,
      categoria: {
         nombre: "Chesterfield 20 Box",
         id: "cigarros"
      },
   },
   {
      id: "malboro",
      nombre: "Malboro 20 Box",
      imagen: "./img/malboro20.png",
      descripcion: "Malboro 20 Box",
      precio: 800,
      categoria: {
         id: "cigarros",
      }
   },
   {
      id: "phillips",
      nombre: "Phillips 12 Caps",
      imagen: "./img/phillip12.png",
      descripcion: "Phillips 12 Caps",
      precio: 580,
      categoria: {
         id: "cigarros",
      }
   },   
]

const productosHtml = document.querySelector("#productosHtml");
let botonCarrito = document.querySelectorAll(".botonCarrito");
const numerito = document.querySelector("#numerito");
const numerito2 = document.querySelector("#numerito-mobile");
const botonesCategorias = document.querySelectorAll(".filtro");
const abrirMenu = document.querySelector("#open");
const cerrarMenu = document.querySelector("#close");
const productos2 = document.querySelector("#agregar");
const active = document.querySelector(".boton-categoria");




function cargarAlHtml(productosEnHtml) {
   productosHtml.innerHTML = ""; 
   productosEnHtml.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("articulo");   
      div.innerHTML = `
         <img class="img-producto" src="${producto.imagen}" alt="${producto.nombre}">
         <small>${producto.descripcion}</small>
         <small>$${producto.precio}</small>
         <button class="botoncarrito" id="${producto.id}"><i class="bi bi-cart4"></i> Agregar</button>
      `;
      productosHtml.append(div);  
   })
   actualizarBoton();
   
}
cargarAlHtml(productos);

botonesCategorias.forEach(boton => {
   boton.addEventListener("click", (e) => {
      botonesCategorias.forEach(boton => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");

      if (e.currentTarget.id != "todas") {
         const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
         cargarAlHtml(productosBoton);
      } else {
         cargarAlHtml(productos);
      }
   })
})
function actualizarBoton() {
   botonCarrito = document.querySelectorAll(".botoncarrito");
   botonCarrito.forEach(button => {
      button.addEventListener("click", agregarAlCarrito);      
   });
}

let productosCarro;
let productosCarroLS = localStorage.getItem("carrito");

if (productosCarroLS) {
   productosCarro = JSON.parse(productosCarroLS);
   actualizarNumerito();
} else {
   productosCarro = [];
}

function agregarAlCarrito(e) {
   const idBoton = e.currentTarget.id;
   const productosAdd = productos.find(productos => productos.id === idBoton);

   if (productosCarro.some(productos => productos.id === idBoton)) {
      const index = productosCarro.findIndex(productos => productos.id === idBoton);
      productosCarro[index].cantidad++;
   } else {
      productosAdd.cantidad = 1;
      productosCarro.push(productosAdd);
   }
   Toastify({
      text: "Producto agregado",
      duration: 2300,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "black",
        color: "white",
        border: "2px solid white",
        borderRadius: "10% / 50%",
        fontSize: "1rem",
      },
      onClick: function(){} // Callback after click
    }).showToast();

   localStorage.setItem("carrito", JSON.stringify(productosCarro));
   actualizarNumerito();
}

function actualizarNumerito() {
      let nuevoNumero = productosCarro.reduce((acc, producto) => acc + producto.cantidad, 0);
      numerito.innerText = nuevoNumero;
      numerito2.innerText = nuevoNumero;
}

abrirMenu.addEventListener("click", () =>{
   productos2.classList.add("categorias-visible");
})
cerrarMenu.addEventListener("click", () =>{
   productos2.classList.remove("categorias-visible");
})