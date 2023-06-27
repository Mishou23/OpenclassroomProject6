const data= await fetch('http://localhost:5678/api/works');
const fullData = await data.json();
console.log(fullData)