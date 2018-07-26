const preObject = document.getElementById("object");
const nameUser = document.getElementById('name');
const listposts = document.getElementById('listposts');
const listPostsGeneral = document.getElementById('listpostsgeneral');

initFirebase();
console.log("ya estoy en postDOM.js");

welcomeUsers();

document.getElementById("close").addEventListener("click", close);
document.getElementById("btnPost").addEventListener("click", () => {
  let user = firebase.auth().currentUser;
  let optionValue = document.getElementById('privateOptions');
  savePost(user,optionValue)
});

document.getElementById("addPost").addEventListener("click", ()=>{

  let userUID = firebase.auth().currentUser.uid;
  let userName = firebase.auth().currentUser.displayName;
  console.log(firebase.auth().currentUser);
  const dbRefObjectUsers = firebase.database().ref().child('users/');
  const dataUser = dbRefObjectUsers.child(userUID);
  // dUser(userUID);
  const dbRefObjectUsersPosts = firebase.database().ref().child('users-posts')
  mostrarPostUser(dbRefObjectUsersPosts,userUID,userName)

});

document.getElementById("addPostPublica").addEventListener("click", ()=>{

  let userUID = firebase.auth().currentUser.uid;
  let userName = firebase.auth().currentUser.displayName;
  // let dbRefObjectUsers = firebase.database().ref().child('post/');

  const dbRefObjectUsersPosts = firebase.database().ref().child('users-posts')
  mostrarPostUserPublic(dbRefObjectUsersPosts,userUID,userName)

});