
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modification: ${lastModified}`;


const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-bar');
toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const apiKey = '8bf26a75f26df8b69bc7620880c9057a'; // Reemplaza con tu clave de OpenWeatherMap
const lat = -16.5; // Latitud de La Paz
const lon = -68.15; // Longitud de La Paz
const units = 'imperial'; // Para Fahrenheit. Usa 'metric' para Celsius

async function fetchWeather() {

  const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
  const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  // 🌡 Datos actuales
  const temp = Math.round(currentData.main.temp);
  const description = currentData.weather[0].description;
  const high = Math.round(currentData.main.temp_max);
  const low = Math.round(currentData.main.temp_min);
  const wind = Math.round(currentData.wind.speed);
  const humidity = currentData.main.humidity;
  const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  document.querySelector('.current-weather ul').innerHTML = `
        <li>🌤 ${temp}°F - ${description}</li>
        <li>High: ${high}°F / Low: ${low}°F</li>
        <li>Wind: ${wind}mph</li>
        <li>Humidity: ${humidity}%</li>
        <li>Sunrise: ${sunrise} / Sunset: ${sunset}</li>
      `;

  // 📅 Pronóstico de 3 días (cada 24h a las 12:00pm)
  const forecastList = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
  const forecastHTML = forecastList.map(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(item.main.temp);
    return `<li>${day}: ${temp}°F</li>`;
  }).join('');

  document.querySelector('.forecast ul').innerHTML = forecastHTML;

}

fetchWeather();





async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    highlightSpotlights(members);
    displayMembers(members, 'grid');

  } catch (error) {
    console.error('Error al cargar miembros:', error);
  }
}
function highlightSpotlights(members) {
  // Filtrar solo Gold (3) y Silver (2)
  const eligible = members.filter(m => m.membership === 3 || m.membership === 2);

  // Mezclar aleatoriamente
  const shuffled = eligible.sort(() => 0.5 - Math.random());

  // Seleccionar 2 miembros destacados
  const selected = shuffled.slice(0, 2);

  // Marcar los destacados con propiedad extra
  selected.forEach(member => member.isSpotlight = true);
}

function displayMembers(members) {
  const container = document.getElementById('membersContainer');
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.className = member.isSpotlight ? 'member-card spotlight-card' : 'member-card';

    card.innerHTML = `
        <section>
        <img src="./images/${member.image}" alt="${member.name}" />
        <h3>${member.name}</h3>
        <p><strong>Dirección:</strong> ${member.address}</p>
        <p><strong>Teléfono:</strong> ${member.phone}</p>
        <p><strong>Web:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Nivel:</strong> ${getMembershipLabel(member.membership)}</p>
        <p>${member.description}</p>
        </section>
      `;
    container.appendChild(card);
  });
}

function getMembershipLabel(level) {
  return level === 3 ? '🥇 Gold' : level === 2 ? '🥈 Silver' : '👤 Member';
}
fetchMembers();

const container = document.getElementById('membersContainer');
const listViewBtn = document.getElementById('listViewBtn');

listViewBtn.addEventListener('click', () => {
  container.classList.remove('grid-view');
  container.classList.add('list-view');
})

gridViewBtn.addEventListener('click', () => {
  container.classList.remove('list-view');
  container.classList.add('grid-view');
});

