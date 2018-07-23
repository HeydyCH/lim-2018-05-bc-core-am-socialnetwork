// Inicializando  Firebase
var config = {
  apiKey: "AIzaSyC4saWEKhESE7xPJUu-o02qa9a5Oh3y1yA",
  authDomain: "usuarios-b983e.firebaseapp.com",
  databaseURL: "https://usuarios-b983e.firebaseio.com",
  projectId: "usuarios-b983e",
  storageBucket: "usuarios-b983e.appspot.com",
  messagingSenderId: "953796606000"
};
firebase.initializeApp(config);
let userUID = localStorage.currentUser;
welcomeUser(userUID);
//redireccionando al muro
function welcomeUser(uid) {
  console.log(uid);
  var profile = firebase.database().ref().child('users/'+uid);
  profile.on('value', snap => {
    let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    userData = JSON.parse(userData);
    console.log(userData);
    console.log(userData.nombre);
    document.getElementById("userName").innerHTML = userData.nombre;
    document.getElementById('userPhoto').innerHTML = "<img width='100px' src='"+userData.foto+"  '/>"
  })
  let muroPosts = document.getElementById('myPosts');
  chargePosts(userUID,muroPosts);
  chargeFriendPosts();
}
//escribiendo publicaciones
document.getElementById('savePost').addEventListener("click", savePost)
function savePost() {
  let message = document.getElementById('currentPost').value;
  document.getElementById('currentPost').value = '';
  let userUID = firebase.auth().currentUser.uid;
  let optionValue = document.getElementById('privateOptions');
  optionValue = optionValue.options[optionValue.selectedIndex].value;
  firebase.database().ref('users/'+userUID+'/publicaciones').push({
    optionValue,
    message
  });
  let muroPosts = document.getElementById('myPosts');
  chargePosts(userUID, muroPosts);
};
//mostrando todos las publicaciones del usuario actual
function chargePosts(userUID, muroPosts) {
  firebase.database().ref('users/'+userUID+'/publicaciones')
  .on('value', function(snapshot) {
    // muroPosts.innerHTML = '';
    let postData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
    postData = JSON.parse(postData);
    let postUIDs = Object.keys(postData);
    for(i=0; i<postUIDs.length; i++) {
      let mensaje = (postData[postUIDs[i]].message);
      muroPosts.innerHTML += '<li><b>' + mensaje + '</b></li>';
    }
  });
}
//mostrando todas las publicaciones de personas a las que sigo
function chargeFriendPosts() {
  let usersIFollow =[];
  firebase.database().ref('users/'+userUID+'/quienes-sigo')
  .on('value', function(snapshot) {

    let usersIFollow = [];
    let postData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
    postData = JSON.parse(postData);
    let postUIDs = Object.keys(postData);
    for(i=0; i<postUIDs.length; i++) {
      let mensaje = (postData[postUIDs[i]].uidFollow);
      console.log(mensaje);
      usersIFollow.push(mensaje);
      console.log(usersIFollow);
    }
    console.log(usersIFollow);
    let friendPosts = document.getElementById('myFriendsPost');
    console.log(usersIFollow.length);
    for(i=0; i< usersIFollow.length; i++) {
      console.log(usersIFollow[i]);
      chargePosts(usersIFollow[i], friendPosts);
    }
  });
}
//mostrando la lista de usuarios registrados por busqueda
document.getElementById('searchText').addEventListener('input', () =>{
  let wordSearch = document.getElementById('searchText').value;
})
document.getElementById('buttonSearch').addEventListener('click', ()=>{
  document.getElementById('userFilterList').innerHTML = '';
  firebase.database().ref("users")
    .on("child_added", function(s){
      let wordSearch = document.getElementById('searchText').value;
      var user = s.val();
      if((user.nombre.toUpperCase()).indexOf(wordSearch.toUpperCase())!==-1){
        $('#userFilterList').append(`
        <div>
          <img width=100px src= ${user.foto} />
          <p> ${user.nombre} </p>
          <button value= ${user.uid} onclick= "followPeople()">Seguir</button>
        </div>
        `);
      }
    })
})
//funcion para almacenar uid de seguidores
function followPeople() {
  let uidFollow = event.target.value;
  firebase.database().ref('users/'+userUID+'/quienes-sigo').push({
    uidFollow
  });
  console.log(uidFollow);
}
//funcion para dejar de seguir a alguie

document.getElementById('signOut').addEventListener('click', closeSession);
//funcion para cerrar sesion
function closeSession() {
  firebase.auth().signOut()
    .then(function () {
      document.location.href = 'index.html';
    })
    .catch(function (error) {
      console.log(error);
    })
}
