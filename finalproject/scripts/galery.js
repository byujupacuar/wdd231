let allPhotos = [];

fetch('data/galery.json')
  .then(response => response.json())
  .then(data => {
    allPhotos = data;
    populateFilterOptions(data);
    renderGallery(data);
  });

function populateFilterOptions(data) {
  const filter = document.getElementById("serviceFilter");
  const uniqueServices = [...new Set(data.map(photo => photo.service))];

  uniqueServices.forEach(service => {
    const option = document.createElement("option");
    option.value = service;
    option.textContent = service;
    filter.appendChild(option);
  });

  filter.addEventListener("change", () => {
    const selected = filter.value;
    const filtered = selected === "all"
      ? allPhotos
      : allPhotos.filter(photo => photo.service === selected);
    renderGallery(filtered);
  });
}

function renderGallery(photos) {
  const container = document.getElementById("galleryContainer");
  container.innerHTML = "";

  photos.forEach(photo => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <img src="${photo.image}" alt="${photo.caption}" loading="lazy" />
      <div class="caption">${photo.caption}</div>
    `;
    container.appendChild(item);
  });
}