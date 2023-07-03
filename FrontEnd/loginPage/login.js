const connectForm = document.querySelector('form');
connectForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let user = {
    "email": "sophie.bluel@test.tld",
    "password": "S0phie"
  };

  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  let result = await response.json();

  if (response.status === 200) {
    const token = result.token; // Récupère le jeton (token) de la réponse
alert('token : ' + token)
alert(result.userId)
    // Stocke le jeton (token) dans le localStorage
    localStorage.setItem('token', token);

    // Redirige vers la page "../index.html"
    window.location.href = "../index.html";
  } else if(response.status === 401) {
    alert('ERREUR !!!!');
    window.location.href = "./login.html";
  }
});
