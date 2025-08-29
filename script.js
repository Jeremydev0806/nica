const productos = [
  {
    id: 1,
    nombre: "Traje Folklorico",
    precio: 30,
    imagen: "images/Traje folklorico.jfif",
    categoria:"Trajes"
  },
  {
    id: 2,
    nombre: "Mascara",
    precio: 20,
    imagen: "images/mascara.jpg",
    categoria: "Arte"
  },
  {
    id: 2,
    nombre: "Vasijas de madera",
    precio: 20,
    imagen: "images/Vasijas.jfif",
    categoria:"Artesania"

  },
  {
    id: 4,
    nombre: "Traje folklorico",
    precio: 40,
    imagen: "images/WhatsApp_Image_2024-09-13_at_9.51.39_AM-removebg-preview_2048x.webp",
    categoria:"Trajes"
  },

  {
    id: 5,
    nombre: "Trompo",
    precio: 5,
    imagen: "images/Trompos.jpeg",
    categoria:"Juguetes"
  },
  {
    id: 6,
    nombre: "Carro de madera",
    precio: 15,
    imagen: "images/carrito.jfif",
    categoria:"Juguetes"
  },
   {
    id: 7,
    nombre: "Hamaca",
    precio: 100,
    imagen: "images/amaca.jpg",
    categoria:"Artesania"
  },
   {
    id: 8,
    nombre: "Pintura",
    precio: 25,
    imagen: "images/pintura1.jfif",
    categoria:"Arte"
  },
   {
    id: 9,
    nombre: "Pintura",
    precio: 20,
    imagen: "images/pintura2.jfif",
    categoria:"Arte"
  },
 {
    id: 10,
    nombre: "Sombrero",
    precio: 10,
    imagen: "images/sombrero.jpg",
    categoria:"Artesania"
  }



];
const carrito=[];
function mostrarProductos() {
  const contenedor = document.getElementById("product-list");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="imagen">
  <img src="${p.imagen}" alt="${p.nombre}">
                    </div>
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += 1;
    mostrarToast("Cantidad aumentada");
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    mostrarToast("🛒 Producto agregado al carrito.");
  }

  localStorage.setItem("🛒", JSON.stringify(carrito));
  actualizarCarrito();
}
function actualizarCarrito() {
  const btn = document.getElementById("cart-btn");
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  btn.textContent = `carrito (${total})`;
}

function buscarProductos()
 {
  const termino = document.getElementById("buscador").value.toLowerCase();

  const resultados = productos.filter(p =>
    p.nombre.toLowerCase().includes(termino)
  );

  const contenedor = document.getElementById("product-list");
  contenedor.innerHTML = "";

  resultados.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="imagen">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

document.querySelector('.search').addEventListener('input', (e) => {
  const filtro = e.target.value.toLowerCase();
  const resultados = productos.filter(p => p.nombre.toLowerCase().includes(filtro));
  const contenedor = document.getElementById("product-list");

  contenedor.innerHTML = "";
  resultados.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="imagen">
        <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
});

mostrarProductos();

//Menú desplegable lateral///////////
document.getElementById("menu-toggle").addEventListener("click", function() {
  document.getElementById("side-menu").classList.toggle("active");
});

document.getElementById("cart-btn").addEventListener("click", mostrarCarrito);
function mostrarCarrito() {
  const modal = document.getElementById("cart-modal");
  const itemsContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  itemsContainer.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    itemsContainer.appendChild(li);
    total += item.precio;
  });

  totalContainer.textContent = `Total: $${total}`;
  modal.style.display = "block";
}

function cerrarCarrito() {
  document.getElementById("cart-modal").style.display = "none";
}


document.getElementById("cart-btn").addEventListener("click", function () {
  mostrarCarrito();
});

////////// Mostrar productos del carrito en el modal
function mostrarCarrito() {
  const modal = document.getElementById("cart-modal");
  const lista = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nombre}</span>
      <div style="display: flex; align-items: center; gap: 5px;">
        <button onclick="cambiarCantidad(${index}, -1)">−</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidad(${index}, 1)">+</button>
        <button onclick="eliminarDelCarrito(${index})">✖</button>
      </div>
    `;
    lista.appendChild(li);
    suma += item.precio * item.cantidad;
  });

  total.textContent = `Total: $${suma}`;
  modal.classList.add("active");
}
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  localStorage.setItem("🛒", JSON.stringify(carrito));
  actualizarCarrito();
  mostrarCarrito();
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem("Carrito", JSON.stringify(carrito));
  actualizarCarrito();
  mostrarCarrito(); //////// actualizar visualmente 
}

function cerrarCarrito() {
  document.getElementById("cart-modal").classList.remove("active");
}

function filtrarPorCategoria(categoria) {
  let productosFiltrados;

  if (categoria === 'todos') {
    productosFiltrados = productos;
  } else {
    productosFiltrados = productos.filter(p => p.categoria === categoria);
  }

  const contenedor = document.getElementById("product-list");
  contenedor.innerHTML = "";

  productosFiltrados.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="imagen">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    document.querySelectorAll(".nav a").forEach(el => el.classList.remove("active"));
    
    this.classList.add("active");
  });
});
// Establecer "Todos" como categoría activa por defecto
window.addEventListener("DOMContentLoaded", () => {
  const defaultLink = document.querySelector(".nav a[data-categoria='todos']");
  if (defaultLink) defaultLink.classList.add("active");
});

let usuarioActual = null;

document.getElementById("account-btn").addEventListener("click", () => {
  document.getElementById("account-modal").style.display = "block";
});

function cerrarCuenta() {
  document.getElementById("account-modal").style.display = "none";
}

function registrarUsuario() {
  const nombre = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;
  const esVendedor = document.getElementById("esVendedor").checked;

  if (nombre && pass) {
    usuarioActual = {
      nombre,
      esVendedor
    };

    alert(`Bienvenido ${nombre}!`);
    cerrarCuenta();
    mostrarOpcionesVendedor();
  } else {
    alert("Por favor completa todos los campos.");
  }
}

function mostrarOpcionesVendedor() {
  if (usuarioActual && usuarioActual.esVendedor) {
    const menu = document.getElementById("side-menu").querySelector("ul");
    const itemVender = document.createElement("li");
    itemVender.innerHTML = `<a href="#" onclick="abrirFormularioProducto()">Vender Producto</a>`;
    menu.appendChild(itemVender);
  }
}

function abrirModalVender() {
  document.getElementById("vender-modal").style.display = "block";
}

function cerrarModalVender() {
  document.getElementById("vender-modal").style.display = "none";
}

////////// registrar producto (frontend por ahora)
function registrarProducto() {
  const nombre = document.getElementById("producto-nombre").value;
  const precio = parseFloat(document.getElementById("producto-precio").value);
  const imagen = document.getElementById("producto-imagen").value;
  const categoria = document.getElementById("producto-categoria").value;
  const descripcion = document.getElementById("producto-descripcion").value;

  if (!nombre || !precio || !imagen || !categoria) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio,
    imagen,
    categoria,
    descripcion
  };

  productos.push(nuevoProducto);
  mostrarProductos();
  cerrarModalVender();
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
  // Oculta slide actual
  slides[currentSlide].classList.remove('active');
  
  // Calcula siguiente
  currentSlide = (currentSlide + 1) % totalSlides;
  
  // Muestra el siguiente
  slides[currentSlide].classList.add('active');
}

// Cambiar cada 3 segundos
setInterval(showNextSlide, 3000);

// Accede a los elementos
const otrasCatLink = document.getElementById("otras-cat-link");
const otrasSubmenu = document.getElementById("otras-categorias-submenu");
const mainMenu = document.getElementById("main-menu");
const volverBtn = document.getElementById("volver-menu");

// Cuando se hace clic en "📦 Otras categorías"
otrasCatLink.addEventListener("click", function (e) {
  e.preventDefault();

  // Oculta el menú principal y muestra el submenú
  mainMenu.style.display = "none";
  otrasSubmenu.style.display = "block";
});

// Cuando se hace clic en "← Volver"
volverBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Oculta el submenú y muestra el menú principal
  otrasSubmenu.style.display = "none";
  mainMenu.style.display = "block";
});


function mostrarDecoracion() {
  // Ocultar página principal
  document.getElementById("pagina-principal").style.display = "none";

  // Mostrar sección decoración
  document.getElementById("pagina-decoracion").style.display = "block";

  // Mostrar productos de decoración
  mostrarProductosDecoracion();
}

// Lógica del slider de decoración
let decoSlideIndex = 0;
function cambiarSlideDecoracion() {
  const slides = document.querySelectorAll(".slide-deco");
  slides.forEach(slide => slide.classList.remove("active"));
  decoSlideIndex = (decoSlideIndex + 1) % slides.length;
  slides[decoSlideIndex].classList.add("active");
}
setInterval(cambiarSlideDecoracion, 4000); // cambia cada 4s

// Productos exclusivos de decoración
const decoracion = [
  {
    nombre: "Centro de mesa de madera",
    precio: 35,
    imagen: "images/WhatsApp Image 2025-06-22 at 5.51.57 PM.jpeg"
  },
  {
    nombre: "Portavelas artesanal",
    precio: 15,
    imagen: "images/portavela.jpg"
  },
  {
    nombre: "Cuadro decorativo tallado",
    precio: 45,
    imagen: "images/cuadro tallado.jpg"
  }
];

function mostrarProductosDecoracion() {
  const contenedor = document.getElementById("decoracion-productos");
  contenedor.innerHTML = "";

  decoracion.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="imagen">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarAlCarritoDesdeDecoracion('${p.nombre}', ${p.precio}, '${p.imagen}')">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Agregar desde decoración
function agregarAlCarritoDesdeDecoracion(nombre, precio, imagen) {
  const existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad += 1;
    mostrarToast("Cantidad aumentada");
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
    mostrarToast("🛒 Producto agregado al carrito.");
  }

  localStorage.setItem("🛒", JSON.stringify(carrito));
  actualizarCarrito();
}
function mostrarDecoracion() {
  /// Ocultar lo que no pertenece a la sección decoración
  document.getElementById("pagina-principal").style.display = "none";
  document.getElementById("slider-principal").style.display = "none";
  document.getElementById("barra-categorias").style.display = "none";

  /// Mostrar la sección especial de decoración
  document.getElementById("pagina-decoracion").style.display = "block";

  /// Mostrar los productos decorativos
  mostrarProductosDecoracion();
}
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); 
}