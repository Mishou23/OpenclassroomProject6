const data = await fetch('http://localhost:5678/api/works');
const fullData = await data.json();
const gallery = document.querySelector('.gallery');

for (let i = 0; i < fullData.length; i++) {
  const imageContainer = document.createElement("div"); // Créez un conteneur pour l'image et le titre
  const image = document.createElement("img");
  const title = document.createElement("p");
  image.src = fullData[i].imageUrl;
  title.textContent = fullData[i].title;

  imageContainer.appendChild(image); // Ajoutez l'image au conteneur
  imageContainer.appendChild(title); // Ajoutez le titre au conteneur
  gallery.appendChild(imageContainer); // Ajoutez le conteneur à la galerie
}

console.log(fullData);

