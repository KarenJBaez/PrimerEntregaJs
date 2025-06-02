// 1. Constantes, variables y arrays
const productos = [
  { nombre: "Bajo mesada, alacena e isla", precio: 180000 },
  { nombre: "Bajo mesada, alacena y especiero", precio: 180000 },
  { nombre: "Bajo mesada en U", precio: 180000 },
  { nombre: "Bajo mesada, alacena y especiero blanco", precio: 180000 },
  { nombre: "Bajo mesada en L y alacena simple", precio: 180000 },
  { nombre: "Bajo mesada simple", precio: 180000 }
];

let carrito = [];

// 2. Función que muestra productos
function mostrarProductos() {
  let mensaje = "Nuestros productos disponibles:\n";
  productos.forEach((prod, index) => {
    mensaje += `${index + 1}. ${prod.nombre} - $${prod.precio.toLocaleString()}\n`;
  });
  alert(mensaje);
}

// 3. Función que simula agregar productos al carrito
function comprarProductos() {
  mostrarProductos();

  let seguirComprando = true;

  while (seguirComprando) {
    let eleccion = prompt("Ingresá el número del producto que querés agregar al carrito:");
    let index = parseInt(eleccion) - 1;

    if (productos[index]) {
      carrito.push(productos[index]);
      alert(`Agregaste "${productos[index].nombre}" al carrito.`);
      console.log(`Producto agregado: ${productos[index].nombre}`);
    } else {
      alert("Número inválido. Intentá de nuevo.");
    }

    seguirComprando = confirm("¿Querés agregar otro producto?");
  }

  mostrarCarrito();
}

// 4. Función que muestra el carrito final
function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let total = 0;
  let resumen = "Productos en tu carrito:\n";

  carrito.forEach((item, i) => {
    resumen += `${i + 1}. ${item.nombre} - $${item.precio.toLocaleString()}\n`;
    total += item.precio;
  });

  resumen += `\nTotal: $${total.toLocaleString()}`;
  alert(resumen);
  console.log("Carrito final:", carrito);
}

// 5. Lanzar la interacción
if (confirm("¿Querés simular una compra de cocina?")) {
  comprarProductos();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agregá productos antes de finalizar la compra.");
    return;
  }

  let resumen = "Resumen de tu compra:\n";
  let total = 0;

  carrito.forEach((item, i) => {
    resumen += `${i + 1}. ${item.nombre} - $${item.precio.toLocaleString()}\n`;
    total += item.precio;
  });

  resumen += `\nTotal: $${total.toLocaleString()}`;

  let confirmar = confirm(`${resumen}\n\n¿Deseás confirmar tu compra?`);

  if (confirmar) {
    alert("¡Gracias por tu compra! En breve nos pondremos en contacto.");
    console.log("Compra finalizada:", carrito);
    carrito = []; // vaciar carrito
  } else {
    alert("Compra cancelada. Podés seguir modificando tu carrito.");
  }
}