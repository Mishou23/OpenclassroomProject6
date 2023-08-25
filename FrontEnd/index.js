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
  ``

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
  const filterObject = fullData.filter(function (data) {
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
  const filterApt = fullData.filter(function (data) {
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
  const filterHotRes = fullData.filter(function (data) {
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
  const removeSpace = document.querySelector('.contentContainer');
  logout.innerHTML = 'logout';
  logout.addEventListener('click', () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    token = null;
  });
removeSpace.classList.remove('add')
  photoEdit.classList.remove('hidden');
  navbar.classList.remove('hidden');
  galleryEdit.classList.remove('hidden');
  galleryEditMod.classList.remove('hidden');
  allBtns.forEach(btn => {
    btn.remove();
  });

  //------------------------------------------------------------------Gallery Modale------------------------------------------------------------------------------------//
  
  galleryPhoto.style.setProperty('--my-variable', 'your-value');
const projetFade = document.querySelector('.galleryEdit');
const navSpace = document.querySelector('.contentContainer');

editGallery.addEventListener('click', handleEditGallery);

function handleEditGallery() {

    galleryPhoto.innerHTML = '<div class="galleryWindow"><div class="exit"><div class="exitContainer"><div class="title"><h2>Galerie photo</h2></div> <div class="return"><a href="./index.html"><i class="fa-solid fa-xmark" style="color: #000000;"></i></a></div></div><div class="allPhotos"></div><div class="moveIcon"><i class="fa-solid fa-arrows-up-down-left-right" style="color: #ffffff;"></i></div><div class="galleryEdited"><button class="btnEdit">Ajouter une photo</button><div class="deleteGallery"><p>Supprimer la galerie</p></div></div></div></div>';
    projetFade.classList.add('fade');
    navSpace.classList.add('show');
    galleryPhoto.classList.add('update');
    background.classList.add('update');
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
      imageContainer.style.position = 'relative';
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
              'Authorization': 'Bearer ' + token
            },
            body: `${photoId}`
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

      const longueurDonnees = fullData.length;

      for (let i = 0; i < longueurDonnees; i++) {
        const photoId = fullData[i].id;

        // Faire une requête DELETE vers le point d'extrémité de l'API pour supprimer la photo
        fetch(`http://localhost:5678/api/works/${photoId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            body: `${photoId}`
          })
          .then(response => {
            if (response.ok) {
              // Suppression de la photo réussie
              // Retirer la photo du tableau fullData
              fullData.splice(i, 1);
              // Retirer le conteneur de l'image de la galerie
              imageContainer.remove();
              console.log('SUCCÈS !!');
            } else {
              // Échec de la suppression de la photo
              console.error('Échec de la suppression de la photo :', response.status);
            }
          });
      }
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
            <a href="./index.html"><i class="fa-solid fa-xmark" style="color: #000000;"></i></a>
            </div>
          </div>
          <div class="dropZone">
            <div class="imageContainer"></div>
            <div class="imageContent">
            <div class="imageIcon">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
  <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" fill="rgba(185, 197, 204, 1)"/>
</svg>
            </div>
            <div class="photoBtn">
            <span class="selectPhoto">+ Ajout photo</span>
            </div>
          </div>
          <div class="photoDetail">
          <p>jpg, png : 4mo max</p>
          </div>
       
            </div>
          <form>
            <div class="photoInputs">
              <div class="photoTitle">
                <h3>Titre</h3>
                <input type="text" class="title" id="photoTitle" name="title">
              </div>
<div class="photoCategory">
                <h3>Catégorie</h3>
                <div class="dropdown">
                  <select class="categoryOptions">
                    <option value="1">Objects</option>
                    <option value="2">Apartments</option>
                    <option value="3">Hotels & Restaurants</option>
                    <option value="3">Bar & Restaurants</option>
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


      const backBtn = document.querySelector('.arrow')
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