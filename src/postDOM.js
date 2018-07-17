const preObject = document.getElementById("object");
const nameUser = document.getElementById('name');
const listposts = document.getElementById('listposts');

initFirebase()
console.log("ya estoy en postDOM.js")

welcomeUsers()

document.getElementById("close").addEventListener("click", close);
document.getElementById("btnPost").addEventListener("click", savePost);
