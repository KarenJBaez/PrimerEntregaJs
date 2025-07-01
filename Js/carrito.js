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
  const productosDOM = document.querySelectorAll(".product");

  productosDOM.forEach((prod, index) => {
    const btn = document.createElement("button");
    btn.textContent = "Agregar al carrito";
    btn.className = "btn btn-primary mt-2";

    btn.addEventListener("click", () => {
      carrito.push(productos[index]);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    });

    prod.appendChild(btn);
  });

  document.getElementById("abrir-carrito").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("modalCarrito"));
    renderizarCarrito();
    modal.show();
  });

  document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const resumen = carrito.map((item, i) => `${i + 1}. ${item.nombre} - $${item.precio.toLocaleString()}`).join("\n");
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

    const confirmar = confirm(`Resumen de tu compra:\n${resumen}\n\nTotal: $${total.toLocaleString()}\n\n¿Deseás confirmar tu compra?`);

    if (confirmar) {
      alert("¡Gracias por tu compra!");
      carrito = [];
      localStorage.removeItem("carrito");
      renderizarCarrito();
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalCarrito"));
      modal.hide();
    }
  });

  renderizarCarrito();
});

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  const totalTexto = document.getElementById("total-carrito");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    totalTexto.textContent = "Total: $0";
    return;
  }

  let total = 0;

  carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

    const nombrePrecio = document.createElement("span");
    nombrePrecio.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;

    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "Quitar";
    btnQuitar.className = "btn btn-sm btn-danger";

    btnQuitar.addEventListener("click", () => {
      carrito.splice(i, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    });

    div.appendChild(nombrePrecio);
    div.appendChild(btnQuitar);
    contenedor.appendChild(div);

    total += item.precio;
  });

  totalTexto.textContent = `Total: $${total.toLocaleString()}`;
}