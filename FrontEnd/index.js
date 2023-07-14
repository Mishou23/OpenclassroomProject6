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
      const deleteButton = document.createElement("button"); // Create the delete button
      const deleteIcon = document.createElement("i"); // Create the delete icon
      const title = document.createElement("p");
      title.textContent="éditer"
      image.src = fullData[i].imageUrl;
      
      deleteIcon.className = "fa-solid fa-trash-can";
      deleteButton.appendChild(deleteIcon); // Append the delete icon to the delete button
      deleteButton.classList.add("delete-button"); // Add a class for styling
      
      // Add event listener to delete the photo on button click
      deleteButton.addEventListener('click', () => {
        // Code to delete the photo goes here
        // You can use `fullData[i]` to access the data of the corresponding photo
        // For example: const photoId = fullData[i].id; (assuming there's an `id` property in the photo data)
      });
      
      imageContainer.appendChild(image);
      imageContainer.appendChild(title)
      imageContainer.appendChild(deleteButton); // Append the delete button to the image container
      allPhotosContainer.appendChild(imageContainer);
     
    }
  
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
    
    const editGalleryPhoto = document.querySelector(".btnEdit");
    const backBtn = document.querySelector(".return a");
    
    editGalleryPhoto.addEventListener('click', () => {
      const galleryPhoto = document.querySelector(".galleryPhoto");
      galleryPhoto.innerHTML = `
        <div class="arrow">
          <i class="fa-solid fa-arrow-left" style="color: #000000"></i>
        </div>
        <div class="exitPhoto">
          <div class="exitContainer">
            <div class="ajoutPhotoTitle">
              <h2>Ajouter Photo</h2>
            </div>
            <div class="photoReturn">
              <a href="./index.html">
                <i class="fa-solid fa-xmark" style="color: #000000;"></i>
              </a>
            </div>
          </div>
          <div class="dropZone">
            <div class="imageContainer"></div>
            <div class="imageIcon">
              <i class="fa-thin fa-image-landscape" style="color: #6f7276;"></i>
            </div>
            <span class="selectPhoto">+ Ajouter Photo</span>
          </div>
          <form>
            <div class="photoInputs">
              <div class="photoTitle">
                <h3>Title</h3>
                <input type="text" class="title" id="photoTitle" name="title">
              </div>
              <div class="photoCategory">
                <h3>Category</h3>
                <div class="dropdown">
                  <input type="text" class="categories" name="category" id="photoCategory" readonly>
                  <i class="fa-solid fa-chevron-down"></i>
                  <ul class="categoryOptions hidden">
                    <li value="Objects">Objects</li>
                    <li value="Apartments">Apartments</li>
                    <li value="Hotels & Restaurants">Hotels & Restaurants</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="subBtn">
              <input type="submit" class="photoSub" value="Valider" name="submit">
            </div>
          </form>
        </div>
      `;
    
      const categoryInput = document.querySelector('#photoCategory');
      const dropdown = document.querySelector('.dropdown');
      const chevronIcon = document.querySelector('.fa-chevron-down');
      const categoryOptions = document.querySelector('.categoryOptions');
    
      function toggleCategoryOptions() {
        categoryOptions.classList.toggle('hidden');
        chevronIcon.classList.toggle('rotate');
      }
    
      dropdown.addEventListener('click', toggleCategoryOptions);
    
      const categoryOptionItems = categoryOptions.querySelectorAll('li');
      categoryOptionItems.forEach(option => {
        option.addEventListener('click', () => {
          const selectedCategory = option.getAttribute('value');
          categoryInput.value = selectedCategory;
          toggleCategoryOptions();
    
          // Hide the dropdown after an option is clicked
          categoryOptions.classList.add('hidden');
          chevronIcon.classList.remove('rotate');
    
          // Display the selected option in the input field
          categoryInput.value = selectedCategory;
        });
      });
    
      // Adding file drop zone functionality
      const dropZone = document.querySelector('.dropZone');
      const selectPhoto = document.querySelector('.selectPhoto');
      const gallery = document.querySelector('.gallery');
    
      backBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default behavior of the link
        alert('Hello, World!');
      });
    
      let selectedFile = null;
    
      // Function to display the selected photo in the drop zone
      const displaySelectedPhoto = (file) => {
        const imageContainer = document.querySelector('.imageContainer');
        const image = document.createElement('img');
        imageContainer.classList.add('styled');
        image.src = URL.createObjectURL(file);
        imageContainer.appendChild(image);
        dropZone.innerHTML = '';
        dropZone.appendChild(imageContainer);
      };
    
      // Adding file drop functionality
      dropZone.addEventListener('drop', (event) => {
        event.preventDefault();
    
        const file = event.dataTransfer.files[0];
    
        if (file.size > 4 * 1024 * 1024) {
          alert("The file exceeds the maximum allowed size (4 MB).");
          return;
        }
    
        if (!file.type.startsWith("image/")) {
          alert("The file must be an image.");
          return;
        }
    
        selectedFile = file;
    
        // Display the selected photo in the drop zone
        displaySelectedPhoto(file);
      });
    
      dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
    
      // Adding photo upload functionality on clicking the "+ Add Photo" button
      selectPhoto.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png'; // Limit to JPEG and PNG formats
        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0];
    
          if (file) {
            if (file.size > 4 * 1024 * 1024) {
              alert("The file exceeds the maximum allowed size (4 MB).");
              return;
            }
    
            if (!file.type.startsWith("image/")) {
              alert("The file must be an image in JPEG or PNG format.");
              return;
            }
    
            selectedFile = file;
    
            // Display the selected photo in the drop zone
            displaySelectedPhoto(file);
          }
        });
    
        fileInput.click();
      });
    
  
// Adding photo upload functionality on clicking the "Submit" button
const submitBtn = document.querySelector('.subBtn input[type="submit"]');
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titleInput = document.querySelector('.photoTitle input');
  const selectedTitle = titleInput.value.trim();
  const selectedCategory = categoryInput.value; // Retrieve the selected category

  if (selectedFile && selectedTitle) {
    const reader = new FileReader();
    reader.onload = async () => {
      const imageContainer = document.createElement('div');
      const image = document.createElement('img');
      const title = document.createElement('p');

      image.src = reader.result;
      title.textContent = selectedTitle;

      imageContainer.appendChild(image);
      imageContainer.appendChild(title);
      gallery.appendChild(imageContainer);

      // Prepare the data to be sent to the API
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', selectedTitle);
      formData.append('category', selectedCategory);

      try {
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: formData,
        });

        if (response.ok) {
          // API call was successful
          const data = await response.json();
          console.log('API response:', data);
        } else {
          // API call failed
          console.error('API request failed:', response.status);
          console.log(selectedFile.name);
        }
      } catch (error) {
        console.error('API request failed:', error);
      }
    };
    reader.readAsDataURL(selectedFile);

    // Reset values
    titleInput.value = '';
    categoryInput.value = '';
    dropZone.innerHTML = '<div class="imageIcon"><i class="fa-thin fa-image-landscape" style="color: #6f7276;"></i></div><span class="selectPhoto">+ Ajouter Photo</span>';
  } else {
    alert("Please select a photo and enter a title before submitting.");
  }
});
    });
  })
}    