
const productos = [
  {
    id: 1,
    nombre: "Traje Folklorico",
    precio: 30,
    imagen: "images/Traje folklorico.jfif",
    categoria: "Trajes",
    descripcion: "Traje folklórico nicaragüense color blanco con estampados de flores amarillas; falda amplia con volantes y cinta azul en la cintura; incluye blusa de manga corta."
  },
  {
    id: 2,
    nombre: "Mascara",
    precio: 20,
    imagen: "images/mascara.jpg",
    categoria: "Arte",
    descripcion: "Máscara artesanal de madera pintada a mano en tonos negro y dorado con detalles blancos y motivos geométricos; tamaño facial completo con correa trasera.."
  },
  {
    id: 3,
    nombre: "Vasijas de madera",
    precio: 20,
    imagen: "images/Vasijas.jfif",
    categoria: "Artesania",
    descripcion: "Juego de vasijas y copas en madera barnizada color miel (platina y copas pequeñas); base circular con terminado pulido; piezas torneadas a mano."
  },
  {
    id: 4,
    nombre: "Traje folklorico",
    precio: 40,
    imagen: "images/WhatsApp_Image_2024-09-13_at_9.51.39_AM-removebg-preview_2048x.webp",
    categoria: "Trajes",
    descripcion: "Traje folklórico blanco con bordados azules y aplicaciones de colores; blusa con cuello decorado y pantalón a juego; acabado premium en costuras."
  },
  {
    id: 5,
    nombre: "Trompo",
    precio: 5,
    imagen: "images/Trompos.jpeg",
    categoria: "Juguetes",
    descripcion: "Trompo de madera pintado a mano con franjas multicolor (rojo, amarillo, verde y azul); diámetro aprox. de palma de mano; listo para jugar o coleccionar.."
  },
  {
    id: 6,
    nombre: "Carro de madera",
    precio: 15,
    imagen: "images/carrito.jfif",
    categoria: "Juguetes",
    descripcion: "Carrito artesanal elaborado con madera y pintura no tóxica."
  },
  {
    id: 7,
    nombre: "Hamaca",
    precio: 100,
    imagen: "images/amaca.jpg",
    categoria: "Artesania",
    descripcion: "Hamaca tejida a mano, resistente y cómoda para relajarse."
  },
  {
    id: 8,
    nombre: "Pintura",
    precio: 25,
    imagen: "images/pintura1.jfif",
    categoria: "Arte",
    descripcion: "Obra de arte original inspirada en paisajes de Nicaragua y Ave Nacional."
  },
  {
    id: 9,
    nombre: "Pintura",
    precio: 20,
    imagen: "images/pintura2.jfif",
    categoria: "Arte",
    descripcion: "Cuadro de Ave Nacional representativa del pais"
  },
  {
    id: 10,
    nombre: "Sombrero",
    precio: 10,
    imagen: "images/sombrero.jpg",
    categoria: "Artesania",
    descripcion: "Sombrero típico nicaragüense, fresco y elegante para el clima cálido."
  }
];
const carrito = [];

// ==== FUNCIÓN DE VOZ ====
function leerDescripcion(texto) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'es-ES';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } else {
    alert('Tu navegador no soporta la lectura por voz.');
  }
}


// MOSTRAR PRODUCTOS (con DESCRIPCIÓN y BOTÓN VOZ)

function mostrarProductos() {
  const contenedor = document.getElementById("product-list"); // O Lista-Producto si lo usas así
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
      <p class="descripcion">${p.descripcion}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')">Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
}

// FUNCIONES CART / CATEGORÍA / BÚSQUEDA / ETC


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

function buscarProductos() {
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
      <p class="descripcion">${p.descripcion}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')">Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
}

// Buscar desde la barra (input)
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
      </div>
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <p class="descripcion">${p.descripcion}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')"> Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
});

mostrarProductos();

// Menú lateral desplegable
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

// Mostrar productos del carrito en el modal
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
  mostrarCarrito();
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
      <p class="descripcion">${p.descripcion}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')">Escuchar</button>
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
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
}
setInterval(showNextSlide, 3000);

const otrasCatLink = document.getElementById("otras-cat-link");
const otrasSubmenu = document.getElementById("otras-categorias-submenu");
const mainMenu = document.getElementById("main-menu");
const volverBtn = document.getElementById("volver-menu");

otrasCatLink.addEventListener("click", function (e) {
  e.preventDefault();
  mainMenu.style.display = "none";
  otrasSubmenu.style.display = "block";
});

volverBtn.addEventListener("click", function (e) {
  e.preventDefault();
  otrasSubmenu.style.display = "none";
  mainMenu.style.display = "block";
});

// Mostrar decoración
function mostrarDecoracion() {
  document.getElementById("pagina-principal").style.display = "none";
  document.getElementById("pagina-decoracion").style.display = "block";
  mostrarProductosDecoracion();
}

// Slider decoración
let decoSlideIndex = 0;
function cambiarSlideDecoracion() {
  const slides = document.querySelectorAll(".slide-deco");
  slides.forEach(slide => slide.classList.remove("active"));
  decoSlideIndex = (decoSlideIndex + 1) % slides.length;
  slides[decoSlideIndex].classList.add("active");
}
setInterval(cambiarSlideDecoracion, 4000); 

const decoracion = [
  { nombre: "Centro de mesa de madera", precio: 35, imagen: "images/WhatsApp Image 2025-06-22 at 5.51.57 PM.jpeg" },
  { nombre: "Portavelas artesanal", precio: 15, imagen: "images/portavela.jpg" },
  { nombre: "Cuadro decorativo tallado", precio: 45, imagen: "images/cuadro tallado.jpg" }
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
  document.getElementById("pagina-principal").style.display = "none";
  document.getElementById("slider-principal").style.display = "none";
  document.getElementById("barra-categorias").style.display = "none";
  document.getElementById("pagina-decoracion").style.display = "block";
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

const zapatos = [
  {
    nombre: "Zapatos de cuero",
    precio: 1200,
    imagen: "images/zapato de cuero.jpg",
    descripcion: "Elegantes y cómodos, hechos a mano."
  },
  {
    nombre: "Sandalias artesanales",
    precio: 800,
    imagen: "images/sandalias-artesanales.jpg",
    descripcion: "Perfectas para el verano."
  },
  {
    nombre: "Botines tradicionales",
    precio: 1500,
    imagen: "images/botas2.jfif",
    descripcion: "Hechos con cuero nacional de alta calidad."
  }
];

function mostrarProductosZapatos() {
  const contenedor = document.getElementById("zapatos-productos");
  contenedor.innerHTML = "";
  zapatos.forEach(prod => {
    const item = document.createElement("div");
    item.classList.add("product-card");
    item.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <span>C$ ${prod.precio}</span>
      <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio}, '${prod.imagen}')">Agregar al carrito</button>
    `;
    contenedor.appendChild(item);
  });
}
function mostrarZapatos() {
  document.getElementById("pagina-principal").style.display = "none";
  document.getElementById("pagina-decoracion").style.display = "none";
  document.getElementById("pagina-zapatos").style.display = "block";
  mostrarProductosZapatos(); 
}

// Más vendidos
const productosSemana = [
  { nombre: "Cuadro Tallado", imagen: "images/cuadro tallado.jpg", precio: "C$ 800", destacado: true },
  { nombre: "Juguete Tradicional", imagen: "images/juguete tra.jfif", precio: "C$ 120", destacado: false },
  { nombre: "Sombrero Artesanal", imagen: "images/sombrero.jpg", precio: "C$ 350", destacado: false },
  { nombre: "Bolso Hecho a Mano", imagen: "images/bolso nica.jfif", precio: "C$ 420", destacado: true },
];
const productosMes = [
  { nombre: "Camiseta Folklore", imagen: "images/camisa folklo.jpg", precio: "C$ 240", destacado: false },
  { nombre: "Taza Pintada", imagen: "images/taza.jpg", precio: "C$ 110", destacado: true },
  { nombre: "Muñeca Típica", imagen: "images/muñeca.jfif", precio: "C$ 185", destacado: false },
  { nombre: "Cuadro Moderno", imagen: "images/cuadro moderno.jpg", precio: "C$ 950", destacado: false },
];
const productosRecomendados = [
  { nombre: "Pulsera Artesanal", imagen: "images/pulsera.jfif", precio: "C$ 60", destacado: false },
  { nombre: "Cartera de Cuero", imagen: "images/cartera.jpg", precio: "C$ 390", destacado: false },
  { nombre: "Jarra Cerámica", imagen: "images/jarra.jfif", precio: "C$ 150", destacado: true },
  { nombre: "Llaveros Nicas", imagen: "images/llavero.jpg", precio: "C$ 40", destacado: false },
];

function renderHotSlider(array, sliderId) {
  const slider = document.getElementById(sliderId);
  slider.innerHTML = "";
  array.forEach(prod => {
    const div = document.createElement("div");
    div.className = "hot-product-card";
    div.innerHTML = `
      ${prod.destacado ? `<span class="hot-badge">HOT</span>` : ""}
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="price">${prod.precio}</p>
      <button class="btn-hot">Agregar al carrito</button>
    `;
    slider.appendChild(div);
  });
}
renderHotSlider(productosSemana, 'slider-semana');
renderHotSlider(productosMes, 'slider-mes');
renderHotSlider(productosRecomendados, 'slider-recomendados');

document.querySelectorAll('.hot-tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.hot-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tipo = btn.getAttribute('data-slider');
    document.querySelectorAll('.hot-slider-wrap').forEach(wrap => {
      wrap.style.display = wrap.getAttribute('data-slider-wrap') === tipo ? 'flex' : 'none';
    });
  });
});

document.querySelectorAll(".slider-arrow").forEach(btn => {
  btn.addEventListener("click", function() {
    const tipo = btn.getAttribute("data-slider");
    const slider = document.getElementById(
      tipo === "semana"
        ? "slider-semana"
        : tipo === "mes"
        ? "slider-mes"
        : "slider-recomendados"
    );
    const dir = btn.classList.contains("left") ? -1 : 1;
    const cardWidth = slider.querySelector(".hot-product-card")?.offsetWidth || 180;
    slider.scrollBy({ left: dir * cardWidth * 2, behavior: "smooth" });
  });
});

document.getElementById('mas-vendidos-link').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('pagina-principal').style.display = 'none';
  document.getElementById('pagina-decoracion').style.display = 'none';
  document.getElementById('pagina-zapatos').style.display = 'none';
  document.getElementById('mas-vendidos-section').style.display = 'block';
});
document.querySelector('#main-menu li a[href="index.html"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('mas-vendidos-section').style.display = 'none';
  document.getElementById('pagina-principal').style.display = 'block';
  document.getElementById('pagina-decoracion').style.display = 'none';
  document.getElementById('pagina-zapatos').style.display = 'none';
});

document.getElementById("novedades-toggle").addEventListener("click", function () {
  document.getElementById("pagina-principal").style.display = "none";
  document.getElementById("pagina-decoracion").style.display = "none";
  document.getElementById("pagina-zapatos").style.display = "none";
  document.getElementById("mas-vendidos-section").style.display = "none";
  document.getElementById("pagina-novedades").style.display = "block";
  document.getElementById("side-menu").classList.remove("active");
});

function abrirFormularioProducto() {
  document.getElementById("form-vender").style.display = "block";
}

function cerrarFormularioProducto() {
  document.getElementById("form-vender").style.display = "none";
}

document.addEventListener("click", function(e) {
  const sideMenu = document.getElementById("side-menu");
  const menuToggle = document.getElementById("menu-toggle");
  if (sideMenu.classList.contains("active") &&
      !sideMenu.contains(e.target) &&
      !menuToggle.contains(e.target)) {
    sideMenu.classList.remove("active");
  }
});


// Guardar producto subido
function guardarProducto() {
  const nombre = document.getElementById("nuevoNombre").value;
  const precio = parseFloat(document.getElementById("nuevoPrecio").value);
  const categoria = document.getElementById("nuevaCategoria").value;
  const descripcion = document.getElementById("nuevaDescripcion").value;
  const imagenInput = document.getElementById("nuevaImagenFile");
  const imagenFile = imagenInput.files[0];

  if (!nombre || isNaN(precio) || !categoria || !descripcion || !imagenFile) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (ev) {
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio,
      imagen: ev.target.result,
      categoria,
      descripcion
    };

    // Guardar producto en localStorage
    let productosSubidos = [];
    const guardados = localStorage.getItem("productosSubidos");
    if (guardados) productosSubidos = JSON.parse(guardados);
    productosSubidos.push(nuevoProducto);
    localStorage.setItem("productosSubidos", JSON.stringify(productosSubidos));

    // Agregar y mostrar
    productos.push(nuevoProducto);
    mostrarProductos();
    cerrarFormularioProducto();
    mostrarToast("Producto subido correctamente");
    limpiarFormularioSubida();
  };
  reader.readAsDataURL(imagenFile);
}

// Cargar productos subidos al inicio
function cargarProductosSubidos() {
  const guardados = localStorage.getItem("productosSubidos");
  if (guardados) {
    const productosSubidos = JSON.parse(guardados);
    productos = [...productosIniciales, ...productosSubidos];
  } else {
    productos = [...productosIniciales];
  }
}

// Limpia el formulario de subida
function limpiarFormularioSubida() {
  document.getElementById("nuevoNombre").value = "";
  document.getElementById("nuevoPrecio").value = "";
  document.getElementById("nuevaCategoria").value = "";
  document.getElementById("nuevaDescripcion").value = "";
  document.getElementById("nuevaImagenFile").value = "";
}

// Sobrescribe el inicio para mostrar los subidos
window.addEventListener("DOMContentLoaded", () => {
  cargarProductosSubidos();
  mostrarProductos();
  const defaultLink = document.querySelector(".nav a[data-categoria='todos']");
  if (defaultLink) defaultLink.classList.add("active");
});

// 
function toggleDescripcion(btn) {
  const desc = btn.nextElementSibling;
  if (desc.classList.contains("oculto")) {
    desc.classList.remove("oculto");
    btn.innerHTML = "&#9650; Ocultar descripción";
  } else {
    desc.classList.add("oculto");
    btn.innerHTML = "&#9660; Ver descripción";
  }
}


// MOSTRAR PRODUCTOS (DESCRIPCIÓN OCULTA)

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
      <button class="toggle-desc-btn" onclick="toggleDescripcion(this)">&#9660; Ver descripción</button>
      <div class="descripcion oculto">${p.descripcion}</div>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')">Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
}


// BUSCAR PRODUCTOS 

function buscarProductos() {
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
      <button class="toggle-desc-btn" onclick="toggleDescripcion(this)">&#9660; Ver descripción</button>
      <div class="descripcion oculto">${p.descripcion}</div>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')">Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
}


// BUSCAR DESDE LA BARRA 

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
      </div>
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button class="toggle-desc-btn" onclick="toggleDescripcion(this)">&#9660; Ver descripción</button>
      <div class="descripcion oculto">${p.descripcion}</div>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')">Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
});


// FILTRAR POR CATEGORIA 

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
      <button class="toggle-desc-btn" onclick="toggleDescripcion(this)">&#9660; Ver descripción</button>
      <div class="descripcion oculto">${p.descripcion}</div>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      <button class="btn-voz" onclick="leerDescripcion('${p.descripcion.replace(/'/g, "\\'")}')"> Escuchar</button>
    `;
    contenedor.appendChild(div);
  });
}


// En mostrarProductosDecoracion
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
      <button class="toggle-desc-btn" onclick="toggleDescripcion(this)">&#9660; Ver descripción</button>
      <div class="descripcion oculto">${p.descripcion || ''}</div>
      <button onclick="agregarAlCarritoDesdeDecoracion('${p.nombre}', ${p.precio}, '${p.imagen}')">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// ===============================================