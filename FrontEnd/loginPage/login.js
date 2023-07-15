const connectForm = document.querySelector('form');
const homepage = document.querySelector('.homepage');
homepage.addEventListener('click',()=>{
  token = null;
  console.log(token);
})

connectForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let user = {
    "email": document.getElementById("email").value,
    "password": document.getElementById("password").value
  };

  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  let result = await response.json();
  const token = result.token; // Récupère le jeton (token) de la réponse
  if (response.status === 200) {
    // Stocke le jeton (token) dans le localStorage
    localStorage.setItem('token', token);

    // Redirige vers la page "../index.html"
    window.location.href = "../index.html";
  } else if(response.status === 401) {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    })
    
  // Display an error message underneath the inputs
const emailErrorMessage = document.createElement('span');
emailErrorMessage.classList.add('error-message');
emailErrorMessage.textContent = 'Incorrect email.';
emailErrorMessage.id = 'email-error';
connectForm.insertBefore(emailErrorMessage, document.getElementById('password').previousSibling);

const passwordErrorMessage = document.createElement('span');
passwordErrorMessage.classList.add('error-message');
passwordErrorMessage.textContent = 'Incorrect password.';
passwordErrorMessage.id = 'password-error';
connectForm.insertBefore(passwordErrorMessage, document.getElementById('log-in'));


    // Clear the input fields
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
  
  }
});
