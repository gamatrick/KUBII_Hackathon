// Sélection de la zone de dépôt
const dropZone = document.getElementById('dropZone');

// Écouter l'événement de glisser-déposer
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const image = new Image();
    image.src = event.target.result;
    dropZone.innerHTML = '';
    dropZone.appendChild(image);

    // Fonction pour changer la taille de l'image
    function changeSize(newWidth, newHeight) {
      image.style.width = newWidth;
      image.style.height = newHeight;
    }

    // Fonction pour ajouter du texte sur l'image
    function addText(text, x, y) {
      const textElement = document.createElement('div');
      textElement.innerText = text;
      textElement.style.position = 'absolute';
      textElement.style.top = y + 'px';
      textElement.style.left = x + 'px';
      image.parentNode.appendChild(textElement);
    }

    // Exemple d'utilisation des fonctions
    changeSize('200px', '200px');
    addText('Sample Text', 50, 50);
  }

  reader.readAsDataURL(file);
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});