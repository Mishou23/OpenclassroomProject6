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
const objectBtn = document.querySelector('.btn.objects');
objectBtn.addEventListener('click', () => {
  const filterObject = fullData.filter(function(data) {
    return data.category.name === "Objets";
  });
  console.log(filterObject);

});
const aptBtn = document.querySelector('.btn.apt');
aptBtn.addEventListener('click', () => {
  const filterApt = fullData.filter(function(data) {
    return data.category.name === "Appartements";
  });
  console.log(filterApt);

});
const hotResBtn = document.querySelector('.btn.hotel-res');
hotResBtn.addEventListener('click', () => {
  const filterHotRes = fullData.filter(function(data) {
    return data.category.name === "Hotels & restaurants";
  });
  console.log(filterHotRes);

});
