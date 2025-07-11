const productos = [
  { nombre: "Bajo mesada, alacena e isla", precio: 180000 },
  { nombre: "Bajo mesada, alacena y especiero", precio: 180000 },
  { nombre: "Bajo mesada en U", precio: 180000 },
  { nombre: "Bajo mesada, alacena y especiero blanco", precio: 180000 },
  { nombre: "Bajo mesada en L y alacena simple", precio: 180000 },
  { nombre: "Bajo mesada simple", precio: 180000 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  const contenedores = document.querySelectorAll(".product");

  contenedores.forEach((productoDOM, index) => {
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.className = "btn btn-primary mt-2";

    botonAgregar.addEventListener("click", () => {
      carrito.push(productos[index]);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    });

    productoDOM.appendChild(botonAgregar);
  });

  const botonFinalizar = document.getElementById("boton-finalizar");
  botonFinalizar.addEventListener("click", () => {
    const resumen = carrito.map(
      (prod, i) => `${i + 1}. ${prod.nombre} - $${prod.precio.toLocaleString()}`
    ).join("\n");

    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

    const confirmar = confirm(`Resumen de tu compra:\n${resumen}\n\nTotal: $${total.toLocaleString()}\n\n¿Deseás confirmar tu compra?`);

    if (confirmar) {
      alert("¡Gracias por tu compra!");
      carrito = [];
      localStorage.removeItem("carrito");
      renderizarCarrito();
    }
  });

  renderizarCarrito();
});

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  const totalTexto = document.getElementById("total-carrito");
  const botonFinalizar = document.getElementById("boton-finalizar");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    totalTexto.textContent = "Total: $0";
    botonFinalizar.style.display = "none";
    return;
  }

  let total = 0;

  carrito.forEach((item, i) => {
    const divItem = document.createElement("div");
    divItem.classList.add("mb-2");

    const texto = document.createElement("span");
    texto.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;

    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";
    botonQuitar.className = "btn btn-sm btn-danger ms-2";

    botonQuitar.addEventListener("click", () => {
      carrito.splice(i, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    });

    divItem.appendChild(texto);
    divItem.appendChild(botonQuitar);
    contenedor.appendChild(divItem);

    total += item.precio;
  });

  totalTexto.textContent = `Total: $${total.toLocaleString()}`;
  botonFinalizar.style.display = "inline-block";
}