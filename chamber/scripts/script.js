
  const lastModified = document.lastModified;
  document.getElementById("lastModified").textContent = `Last modification: ${lastModified}`;


const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-bar');
toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid');
  } catch (error) {
    console.error('Error al cargar miembros:', error);
  }
}

function displayMembers(members) {
  const container = document.getElementById('membersContainer');
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

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
})


  ;