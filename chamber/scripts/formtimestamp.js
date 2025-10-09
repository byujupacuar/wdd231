// form-timestamp.js
document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    const now = new Date();
    const formatted = now.toLocaleString('es-BO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    timestampField.value = formatted;
  }
});