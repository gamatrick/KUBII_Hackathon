const dropZone = document.getElementById('dropZone');
const croppedImage = document.getElementById('croppedImage');
let cropper;
let textAreaActive = false;

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
          aspectRatio: NaN,
          viewMode: 1,
          autoCropArea: 1,
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

        // Ajouter une zone de texte modifiable et transparente sur l'image
        const textArea = document.createElement('textarea');
        textArea.placeholder = 'Saisir du texte...';
        textArea.style.position = 'absolute';
        textArea.style.top = '50%';
        textArea.style.left = '50%';
        textArea.style.transform = 'translate(-50%, -50%)';
        textArea.style.backgroundColor = 'transparent';
        textArea.style.border = 'none';
        textArea.style.width = '50%';
        textArea.style.height = 'auto';
        textArea.style.display = 'none';
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(textArea);

        // Ajouter un bouton pour activer/désactiver la zone de texte
        const toggleTextAreaButton = document.createElement('button');
        toggleTextAreaButton.innerText = 'Activer/ Désactiver texte';
        toggleTextAreaButton.addEventListener('click', () => {
          textAreaActive = !textAreaActive;
          textArea.style.display = textAreaActive ? 'block' : 'none';
        });
        dropZone.appendChild(toggleTextAreaButton);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Veuillez déposer une image.');
    }
  }
});