const dropZone = document.getElementById('dropZone');
const croppedImage = document.getElementById('croppedImage');
let cropper;

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
        fullscreenButton.innerText = 'Télécharger l\'image';
        fullscreenButton.addEventListener('click', () => {
          cropper.getCroppedCanvas().toBlob((blob) => {
            function downloadImage(imageUrl, fileName) {
              const a = document.createElement('a');
              a.href = imageUrl;
              a.download = `S:\\école\\Sup_de_Vinci\\B1\\éval\\HACKATHON\\KUBII_Hackathon-main\\KUBII_Hackathon-main\\Slide${fileName}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          });
        });
        dropZone.appendChild(fullscreenButton);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez déposer une image.');
    }
  }
});