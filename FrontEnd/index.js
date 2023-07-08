const data = await fetch('http://localhost:5678/api/works');
const fullData = await data.json();
const gallery = document.querySelector('.gallery');

for (let i = 0; i < fullData.length; i++) {
  const imageContainer = document.createElement("div"); // Créez un conteneur pour l'image et le titre
  const image = document.createElement("img");
  const title = document.createElement("p");
  image.src = fullData[i].imageUrl;
  title.textContent = fullData[i].title;

  imageContainer.appendChild(image);
  imageContainer.appendChild(title);
  gallery.appendChild(imageContainer);
}
console.log(fullData);

const allBtn = document.querySelector('.btn.all');
allBtn.addEventListener('click', () => {
  // Vider la galerie existante
  gallery.innerHTML = '';

  // Ajouter tous les éléments à la galerie
  for (let i = 0; i < fullData.length; i++) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    image.src = fullData[i].imageUrl;
    title.textContent = fullData[i].title;

    imageContainer.appendChild(image);
    imageContainer.appendChild(title);
    gallery.appendChild(imageContainer);
  }
});
//-------------------------------------------------------FILTERS------------------------------------------------------------

const categories = await fetch('http://localhost:5678/api/categories');
const categoryData = await categories.json();
const categoryObject = document.querySelector('.btn.objects');
const categoryApt = document.querySelector('.btn.apt');
const categoryHotRes = document.querySelector('.btn.hotel-res');

categoryObject.innerHTML = categoryData[0].name;
categoryApt.innerHTML = categoryData[1].name;
categoryHotRes.innerHTML = categoryData[2].name;

const objectBtn = document.querySelector('.btn.objects');
objectBtn.addEventListener('click', () => {
  const filterObject = fullData.filter(function(data) {
    return data.category.name === "Objets";
  });

  // Vider la galerie existante
  gallery.innerHTML = '';

  // Ajouter les objets filtrés à la galerie
  for (let i = 0; i < filterObject.length; i++) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    image.src = filterObject[i].imageUrl;
    title.textContent = filterObject[i].title;

    imageContainer.appendChild(image);
    imageContainer.appendChild(title);
    gallery.appendChild(imageContainer);
  }
});

const aptBtn = document.querySelector('.btn.apt');
aptBtn.addEventListener('click', () => {
  const filterApt = fullData.filter(function(data) {
    return data.category.name === "Appartements";
  });

  // Vider la galerie existante
  gallery.innerHTML = '';

  // Ajouter les appartements filtrés à la galerie
  for (let i = 0; i < filterApt.length; i++) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    image.src = filterApt[i].imageUrl;
    title.textContent = filterApt[i].title;

    imageContainer.appendChild(image);
    imageContainer.appendChild(title);
    gallery.appendChild(imageContainer);
  }
});

const hotResBtn = document.querySelector('.btn.hotel-res');
hotResBtn.addEventListener('click', () => {
  const filterHotRes = fullData.filter(function(data) {
    returndata.category.name === "Hotels & restaurants";
  });

  // Vider la galerie existante
  gallery.innerHTML = '';

  // Ajouter les hôtels et restaurants filtrés à la galerie
  for (let i = 0; i < filterHotRes.length; i++) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    image.src = filterHotRes[i].imageUrl;
    title.textContent = filterHotRes[i].title;

    imageContainer.appendChild(image);
    imageContainer.appendChild(title);
    gallery.appendChild(imageContainer);
  }
});

const galleryEditMod = document.querySelector(".galleryEdit");
galleryEditMod.classList.add('hidden');
// Récupère le jeton (token) du localStorage
const token = localStorage.getItem('token');
// Vérifie si le jeton existe
if (token) {
  const navbar = document.querySelector('.navbar.hidden');
  const allBtns = document.querySelectorAll('.btn');
  const photoEdit = document.querySelector('.editContainer.hidden');
  const galleryEdit = document.querySelector('.editGalleryContainer.hidden');
  const editGallery = document.querySelector('#editGallery');
  const galleryPhoto = document.querySelector('.galleryPhoto');
  const background = document.querySelector('.contentContainer');
  const logout = document.querySelector('.logout');
  logout.innerHTML = 'logout';
  logout.addEventListener('click', () => {
    // Supprimer le jeton du localStorage
    localStorage.removeItem('token');
    token = null;
  });
  photoEdit.classList.remove('hidden');
  navbar.classList.remove('hidden');
  galleryEdit.classList.remove('hidden');
  galleryEditMod.classList.remove('hidden');
  allBtns.forEach(btn => {
    btn.remove();
  });
  editGallery.addEventListener('click', () => {
    galleryPhoto.classList.add('update');
    background.classList.add('update');
    galleryPhoto.innerHTML = '<div class="exit"><div class="exitContainer"><div class="title"><h2>Galerie photo</h2></div><div class="return"><a href="./index.html"><i class="fa-solid fa-xmark" style="color: #000000;"></i></a></div></div></div><div class="allPhotos"></div><div class="galleryEdited"><button class="btnEdit">Ajouter une photo</button><div class="deleteGallery"><p>Supprimer la galerie</p></div></div>';
    const allPhotosContainer = document.querySelector('.allPhotos');
    // Ajouter toutes les images à la galerie
    for (let i = 0; i < fullData.length; i++) {
      const imageContainer = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("p");
      image.src = fullData[i].imageUrl;
      title.textContent = 'éditer';
      imageContainer.appendChild(image);
      imageContainer.appendChild(title);
      allPhotosContainer.appendChild(imageContainer);
    }
    const deleteGallery = document.querySelector(".deleteGallery p");
    deleteGallery.addEventListener('click', (event) => {
      const deleteGallery = document.querySelector(".deleteGallery p");
      deleteGallery.addEventListener('click', (event) => {
        event.preventDefault();
        fullData.length = 0;
        gallery.innerHTML = '';
        allPhotosContainer.innerHTML = '';
      
        // Rediriger vers "./index.html" après une courte attente
        setTimeout(() => {
          window.location.href = "./index.html";
        }, 500);
      });
    });
    const editGalleryPhoto = document.querySelector(".btnEdit");
const backBtn = document.querySelector(".return a");

editGalleryPhoto.addEventListener('click', () => {
  galleryPhoto.innerHTML = '<div class="arrow"><i class="fa-solid fa-arrow-left" style="color: #000000"></i></div><div class="exit"><div class="exitContainer"><div class="title"><h2>Ajout photo</h2></div><div class="return"><a href="./index.html"><i class="fa-solid fa-xmark" style="color: #000000;"></i></a></div></div><div class="dropZone"><div class="imageIcon"><i class="fa-thin fa-image-landscape" style="color: #6f7276;"></i></div><span class="selectPhoto">+ Ajouter Photo</span></div><div class="photoInputs"><div class="photoTitle"><h3>Titre</h3><input type="text" class="title" name="title"></div><div class="photoCategorie"><h3>Categorie</h3><input type="text" class="categorie" name="categorie"></div></div><div class="subBtn"><input type="submit" class="photoSub" value="Valider" name="submit"></div>';

  // Ajout de la fonctionnalité de la zone de dépôt de fichier
  const dropZone = document.querySelector('.dropZone');
  const selectPhoto = document.querySelector('.selectPhoto');
  const gallery = document.querySelector('.gallery');

  let selectedFile = null;

  // Ajout de la fonctionnalité de dépôt de fichier
  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file.size > 4 * 1024 * 1024) {
      alert("Le fichier dépasse la taille maximale autorisée (4 Mo).");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Le fichier doit être une image.");
      return;
    }

    selectedFile = file;
  });

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  // Ajout de la fonctionnalité d'ajout de photo au clic sur le bouton "+ Ajouter Photo"
  selectPhoto.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg, image/png'; // Limite aux formats JPEG et PNG
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];

      if (file) {
        if (file.size > 4 * 1024 * 1024) {
          alert("Le fichier dépasse la taille maximale autorisée (4 Mo).");
          return;
        }

        if (!file.type.startsWith("image/")) {
          alert("Le fichier doit être une image au format JPEG ou PNG.");
          return;
        }

        selectedFile = file;
      }
    });

    fileInput.click();
  });

  // Ajout de la fonctionnalité d'ajout de photo au clic sur le bouton "Valider"
  const submitBtn = document.querySelector('.subBtn input[type="submit"]');
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('.photoTitle input');
    const selectedTitle = titleInput.value.trim();

    if (selectedFile && selectedTitle) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageContainer = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('p');

        image.src = reader.result;
        title.textContent = selectedTitle;

        imageContainer.appendChild(image);
        imageContainer.appendChild(title);
        gallery.appendChild(imageContainer);
      };
      reader.readAsDataURL(selectedFile);

      // Réinitialiser les valeurs
      selectedFile = null;
      titleInput.value = '';
    } else {
      alert("Veuillez sélectionner une photo et saisir un titre avant de valider.");
    }
  });
});

backBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Empêche le comportement par défaut du lien
  window.location.href = "./index.html";
});
  })
   }
    
  