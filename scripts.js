const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('hover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('hover');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('hover');

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        dropZone.innerHTML = '';
        dropZone.appendChild(img);
        img.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez déposer une image.');
    }
  }
});