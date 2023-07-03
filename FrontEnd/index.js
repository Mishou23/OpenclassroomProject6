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
    return data.category.name === "Hotels & restaurants";
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

// Récupère le jeton (token) du localStorage
const token = localStorage.getItem('token');

// Vérifie si le jeton existe
if (token) {
    const navbar = document.querySelector('.navbar.hidden');
    const allBtns = document.querySelectorAll('.btn');
    navbar.classList.remove('hidden');
    allBtns.forEach(btn => {
      btn.remove();
    });
    console.log('Token:', token);
  } else {
    // Le jeton n'existe pas, gérer le cas où l'utilisateur n'est pas connecté
    console.log('Utilisateur non connecté');
  }
  