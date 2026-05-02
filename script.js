const form = document.getElementById('dat-lich');
const toast = document.getElementById('toast');

form?.addEventListener('submit', function (event) {
  event.preventDefault();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
});
