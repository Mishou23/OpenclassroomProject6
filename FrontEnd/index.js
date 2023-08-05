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
  gallery.innerHTML = '';``

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
// Retrieve the token from localStorage
let token = localStorage.getItem('token');
// Check if the token exists
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
    // Remove the token from localStorage
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

  //------------------------------------------------------------------Gallery Modale------------------------------------------------------------------------------------//
  galleryPhoto.style.setProperty('--my-variable', 'your-value');
  editGallery.addEventListener('click', handleEditGallery);
  function handleEditGallery() {
    galleryPhoto.classList.add('update');
    background.classList.add('update');
    galleryPhoto.innerHTML = '<div class="galleryWindow"><div class="exit"><div class="exitContainer"><div class="title"><h2>Galerie photo</h2></div><div class="return"><a href="./index.html"><i class="fa-solid fa-xmark" style="color: #000000;"></i></a></div></div><div class="allPhotos"></div><div class="galleryEdited"><button class="btnEdit">Ajouter une photo</button><div class="deleteGallery"><p>Supprimer la galerie</p></div></div></div></div>';
    const allPhotosContainer = document.querySelector('.allPhotos');
  
    // Add all the images to the gallery
    for (let i = 0; i < fullData.length; i++) {
      const imageContainer = document.createElement("div");
      const image = document.createElement("img");
      const deleteButton = document.createElement("button"); // Create the delete button
      const deleteIcon = document.createElement("i"); // Create the delete icon
      const title = document.createElement("p");
      title.textContent = "éditer";
      image.src = fullData[i].imageUrl;
  
      deleteIcon.className = "fa-solid fa-trash-can";
      deleteButton.appendChild(deleteIcon); // Append the delete icon to the delete button
      deleteButton.classList.add("delete-button"); // Add a class for styling
  
      // Add event listener to delete the photo on button click
      deleteButton.addEventListener('click', () => {
        const photoId = fullData[i].id;
  
        // Make a DELETE request to the API endpoint to delete the photo
        fetch(`http://localhost:5678/api/works/${photoId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer '+ token
          },
          body:`${photoId}`
         })
        .then(response => {
          if (response.ok) {
            // Photo deletion successful
            // Remove the photo from the fullData array
            fullData.splice(i, 1);
            // Remove the image container from the gallery
            imageContainer.remove();
            console.log('SUCCESS!!');
          } else {
            // Photo deletion failed
            console.error('Failed to delete photo:', response.status);
          }
        })
        .catch(error => {
          console.error('Failed to delete photo:', error);
        });
      })
  //------------------------------------------------DELETE BUTTON---------------------------------------------------------------------------------------
      imageContainer.appendChild(image);
      imageContainer.appendChild(title);
      imageContainer.appendChild(deleteButton); // Append the delete button to the image container
      allPhotosContainer.appendChild(imageContainer);
    }
  
    const deleteGallery = document.querySelector(".deleteGallery p");
deleteGallery.addEventListener('click', async (event) => {
  event.preventDefault();

    // Clear the gallery on the webpage
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

   fullData.length = 0 ;
    // Clear the container for all photos on the webpage
    const allPhotosContainer = document.querySelector('.allPhotos');
    allPhotosContainer.innerHTML = '';
  
    // Redirect to "./index.html" after a short delay
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 500);
  
});

   
// Function to check if an element is scrollable
function isScrollable(el) {
  return el.scrollHeight > el.clientHeight;
}

// Function to handle the click event outside .galleryWindow
function handleOutsideClick(event) {
  const galleryWindow = document.querySelector('.galleryWindow');
  const isOutsideGalleryWindow = !galleryWindow.contains(event.target);
  const isScrolling = isScrollable(event.target);

  if (isOutsideGalleryWindow && !isScrolling) {
    // Redirect to index.html
    window.location.href = './index.html';
  }
}

// Add event listener to detect click outside .galleryWindow
document.addEventListener('mousedown', handleOutsideClick);



  
    //----------------------------------------------------------------------Add Photo to Gallery--------------------------------------------------------------------------------//
    const editGalleryPhoto = document.querySelector(".btnEdit");
    editGalleryPhoto.addEventListener('click', () => {
      const galleryPhoto = document.querySelector(".galleryPhoto");
      galleryPhoto.innerHTML = `
      <div class="galleryWindow">
        <div class="arrow">
          <i class="fa-solid fa-arrow-left" style="color: #000000"></i>
        </div>
        <div class="exitPhoto">
          <div class="exitContainer">
            <div class="ajoutPhotoTitle">
              <h2>Ajouter Photo</h2>
            </div>
            <div class="return">
              <a href="#">
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
                  <select class="categoryOptions">
                    <option value="1">Objects</option>
                    <option value="2">Apartments</option>
                    <option value="3">Hotels & Restaurants</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="subBtn">
              <input type="submit" class="photoSub" value="Valider" name="submit">
            </div>
          </form>
        </div>
        </div>
      `
      const categoryInput = document.querySelector('#photoCategory');
      const dropdown = document.querySelector('.dropdown');
      const backBtn = document.querySelector('.arrow');
        
 // Adding event listener to dynamically created exit button
 const galleryWindow = document.querySelector('.galleryWindow');
 galleryWindow.addEventListener('click', (event) => {
   const exitBtn = event.target.closest('.return a');
   if (exitBtn) {

     // Redirect to index.html
     window.location.href = './index.html';
   }
 });
      backBtn.addEventListener('click', (event) => {
        event.preventDefault();
        handleEditGallery(); // Call the function to go back to the previous code
      });
 
      // Event listener for the category dropdown
      const categoryDropdown = document.querySelector('.categoryOptions');
      categoryDropdown.addEventListener('change', () => {
        newWorkCategory = categoryDropdown.value; // Store the selected category value in the variable
      });
      
      
      // Adding file drop zone functionality
      const dropZone = document.querySelector('.dropZone');
      const selectPhoto = document.querySelector('.selectPhoto');
      const gallery = document.querySelector('.gallery');
    
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
    
      
    // Adding photo upload functionality on clicking the "+ Add Photo" button
selectPhoto.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/jpeg, image/png'; // Limit to JPEG and PNG formats
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const fileSizeLimit = 4 * 1024 * 1024;
    if (file.size > fileSizeLimit) {
      alert("Error: File size exceeds 4 MB");
      fileInput.value = "";
      return;
    }

    selectedFile = file;

    // Display the selected photo in the drop zone
    displaySelectedPhoto(file);
  });

  fileInput.click();
});

// Adding photo upload functionality 
let newWorkCategory;
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Store the selected category value in the variable newWorkCategory
  const categoryDropdown = document.querySelector('.categoryOptions');
  newWorkCategory = categoryDropdown.value;

  const titleInput = document.querySelector('.photoTitle input');
  const selectedTitle = titleInput.value.trim();
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
      formData.append('category', parseInt(newWorkCategory));

      console.log(formData);

      try {
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token
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
          console.log(token);
        }
      } catch (error) {
        console.error('API request failed:', error);
      }

    };
    reader.readAsDataURL(selectedFile);

    // Reset values
    titleInput.value = '';
    categoryDropdown.value = ''; // Clear the selected category value
    dropZone.innerHTML = '<div class="imageIcon"><i class="fa-thin fa-image-landscape" style="color: #6f7276;"></i></div><span class="selectPhoto">+ Add Photo</span>';
  } else {
    alert("Please select a photo and enter a title before submitting.");
  }
})
})
  }

}
