//hamburguer button
const menuButton = document.getElementById('menu');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  menuButton.classList.toggle('open');
});
// last update
document.addEventListener("DOMContentLoaded", () => {
  const lastUpdated = document.getElementById("lastUpdated");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/La_Paz",
    timeZoneName: "short"
  };

  const now = new Date();
  const formatted = now.toLocaleString("es-BO", options);

  lastUpdated.textContent = formatted;
});

//active
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navigation li a");
    const currentPage = window.location.pathname.split("/").pop(); // Extrae solo el nombre del archivo

    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href");

      // Compara y aplica la clase 'active' al <li> correspondiente
      if (linkPage === currentPage) {
        link.parentElement.classList.add("active");
      } else {
        link.parentElement.classList.remove("active");
      }
    });
  });


//services
fetch('data/services.json')
  .then(response => response.json())
  .then(services => {
    allServices = services; // Guardar para uso en el modal

    const container = document.getElementById("services-container");

    services.forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <img src="${service.image}" alt="${service.name}" />
        <h3>${service.name}</h3>
        <p class="price">${service.price}</p>
        <button onclick="openModal('${service.id}')">Ver más</button>
      `;
      container.appendChild(card);
    });
  });

// Almacena los servicios para acceso global
let allServices = [
  {
    id: "svc01",
    title: "Corte de cabello",
    description: "Corte profesional para dama, caballero o niños.",
    price: "Bs 50",
    image: "images/cortes.webp"
  },
  {
    id: "svc02",
    title: "Coloración",
    description: "Aplicación de tintes permanentes o semi-permanentes.",
    price: "Bs 120",
    image: "images/tinte.webp"
  },
  {
    id: "svc03",
    title: "Peinado para eventos",
    description: "Peinados elegantes para bodas, graduaciones y fiestas.",
    price: "Bs 80",
    image: "images/peinado.webp"
  },
  {
    id: "svc04",
    title: "Manicure",
    description: "Cuidado de uñas con esmaltado tradicional o semipermanente.",
    price: "Bs 40",
    image: "images/unas.webp"
  },
  {
    id: "svc05",
    title: "Pedicure",
    description: "Tratamiento completo para pies con exfoliación y esmaltado.",
    price: "Bs 50",
    image: "images/pedic.webp"
  },
  {
    id: "svc06",
    title: "Limpieza facial",
    description: "Limpieza profunda con extracción de impurezas y mascarilla.",
    price: "Bs 90",
    image: "images/facial.webp"
  },
  {
    id: "svc07",
    title: "Depilación con cera",
    description: "Depilación de rostro, piernas, brazos o zona íntima.",
    price: "Bs 60",
    image: "images/depil.webp"
  },
  {
    id: "svc08",
    title: "Maquillaje profesional",
    description: "Maquillaje para eventos, sesiones fotográficas o diario.",
    price: "Bs 100",
    image: "images/maqui.webp"
  },
  {
    id: "svc09",
    title: "Tratamiento capilar",
    description: "Hidratación, keratina o botox capilar para revitalizar el cabello.",
    price: "Bs 150",
    image: "images/capi.webp"
  },
  {
    id: "svc10",
    title: "Uñas acrílicas",
    description: "Aplicación de uñas acrílicas con diseño personalizado.",
    price: "Bs 130",
    image: "images/acril.webp"
  },
  {
    id: "svc11",
    title: "Masaje relajante",
    description: "Masaje corporal para aliviar el estrés y mejorar la circulación.",
    price: "Bs 100",
    image: "images/masaje.webp"
  },
  {
    id: "svc12",
    title: "Alisado permanente",
    description: "Tratamiento para alisar el cabello de forma duradera.",
    price: "Bs 180",
    image: "images/alisado.webp"
  },
  {
    id: "svc13",
    title: "Diseño de cejas",
    description: "Perfilado y diseño de cejas con hilo o cera.",
    price: "Bs 30",
    image: "images/cejas.webp"
  },
  {
    id: "svc14",
    title: "Extensiones de pestañas",
    description: "Aplicación de pestañas pelo a pelo o volumen ruso.",
    price: "Bs 140",
    image: "images/pestanas.webp"
  },
  {
    id: "svc15",
    title: "Peinado infantil",
    description: "Peinados divertidos y cómodos para niños.",
    price: "Bs 35",
    image: "images/infantil.webp"
  }
];

function openModal(serviceId) {
  const service = allServices.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");

  modalTitle.textContent = service.name;
  modalImage.src = service.image;
  modalImage.alt = service.name;
  modalDescription.textContent = service.description || "Sin descripción disponible.";
  modalPrice.textContent = `Precio: ${service.price}`;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("serviceModal").style.display = "none";
}

//galery