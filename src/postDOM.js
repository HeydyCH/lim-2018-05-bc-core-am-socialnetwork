const preObject = document.getElementById("object");
const nameUser = document.getElementById('name');
const listposts = document.getElementById('listposts');

initFirebase()
console.log("ya estoy en postDOM.js")

welcomeUsers()

document.getElementById("close").addEventListener("click", close);
document.getElementById("btnPost").addEventListener("click", () => {
  let userUID = firebase.auth().currentUser.uid;
  let optionValue = document.getElementById('privateOptions');
  savePost(userUID,optionValue)
});
