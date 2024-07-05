const dropZone = document.getElementById('dropZone');
const croppedImage = document.getElementById('croppedImage');
const toggleButton = document.getElementById('toggleButton');
let cropper;
let textOverlayActive = false;

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

        // Initialiser Cropper.js avec l'image
        cropper = new Cropper(img, {
          aspectRatio: NaN, // Permettre un recadrage libre en hauteur et en largeur
          viewMode: 1, // Mode de visualisation
          autoCropArea: 1, // Zone de recadrage automatique
        });

        // Ajouter un bouton pour télécharger l'image une fois le recadrage terminé
        const fullscreenButton = document.createElement('button');
        fullscreenButton.innerText = "Télécharger l'image";
        fullscreenButton.addEventListener('click', () => {
          const canvas = cropper.getCroppedCanvas();
          drawTextOnCanvas(canvas, textOverlay);
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            downloadImage(url, 'image_recadree.png');
          });
        });
        dropZone.appendChild(fullscreenButton);

        // Ajouter la zone de texte transparente
        const textOverlay = document.createElement('div');
        textOverlay.id = 'textOverlay';
        textOverlay.contentEditable = true;
        textOverlay.innerText = 'Texte modifiable';
        textOverlay.style.display = 'none';
        dropZone.appendChild(textOverlay);

        // Rendre la zone de texte déplaçable
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        textOverlay.addEventListener('mousedown', (e) => {
          isDragging = true;
          offset.x = e.clientX - textOverlay.offsetLeft;
          offset.y = e.clientY - textOverlay.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
          if (isDragging) {
            textOverlay.style.left = `${e.clientX - offset.x}px`;
            textOverlay.style.top = `${e.clientY - offset.y}px`;
          }
        });

        document.addEventListener('mouseup', () => {
          isDragging = false;
        });

        // Gérer l'activation et la désactivation de la zone de texte
        toggleButton.addEventListener('click', () => {
          textOverlayActive = !textOverlayActive;
          textOverlay.style.display = textOverlayActive ? 'block' : 'none';
          toggleButton.innerText = textOverlayActive ? 'Désactiver zone de texte' : 'Activer zone de texte';
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez déposer une image.');
    }
  }
});

function drawTextOnCanvas(canvas, textOverlay) {
  const ctx = canvas.getContext('2d');
  const text = textOverlay.innerText;
  const x = parseInt(textOverlay.style.left, 10) - dropZone.offsetLeft;
  const y = parseInt(textOverlay.style.top, 10) - dropZone.offsetTop + parseInt(window.getComputedStyle(textOverlay).fontSize, 10); // Ajuster pour la hauteur du texte
  ctx.font = `${window.getComputedStyle(textOverlay).fontSize} ${window.getComputedStyle(textOverlay).fontFamily}`;
  ctx.fillStyle = 'black';
  ctx.fillText(text, x, y);
}

function downloadImage(imageUrl, fileName) {
  const a = document.createElement('a');
  a.href = imageUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}