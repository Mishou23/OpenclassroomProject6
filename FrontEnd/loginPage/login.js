let user = {
  "email": "sophie.bluel@test.tld",
  "password": "S0phie"
};

const login = await fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
console.log(result.message);