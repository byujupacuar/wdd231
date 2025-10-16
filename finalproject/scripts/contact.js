 // Guardar datos en localStorage y redirigir
    document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      localStorage.setItem("contactName", name);
      localStorage.setItem("contactEmail", email);
      localStorage.setItem("contactMessage", message);

      window.location.href = "confirmation.html";
    });

    // Google Maps
    function initMap() {
      const location = { lat: -16.5000, lng: -68.1500 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location,
      });
      new google.maps.Marker({ position: location, map: map });
    }
