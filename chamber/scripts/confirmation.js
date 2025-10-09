// confirmation.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  const fields = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    mobile: 'Teléfono',
    organization: 'Empresa',
    membershipLevel: 'Nivel de membresía',
    timestamp: 'Fecha de envío'
  };

  const ul = document.querySelector('.confirmation ul');

  Object.entries(fields).forEach(([key, label]) => {
    const value = params.get(key) || 'No disponible';
    const li = document.createElement('li');
    li.innerHTML = `<strong>${label}:</strong> ${value}`;
    ul.appendChild(li);
  });
});