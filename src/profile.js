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
    document.getElementById('userPhoto').innerHTML = "<img width='100px' class='circle img-responsive' src='"+userData.foto+"  '/>"
    document.getElementById('userEmail').innerHTML = userData.email;
  })
  let muroPosts = document.getElementById('myPosts');
  muroPosts.innerHTML = '';
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
  muroPosts.innerHTML = '';
  chargePosts(userUID, muroPosts);
};
//mostrando todos las publicaciones del usuario actual
function chargePosts(userUID, muroPosts) {
  firebase.database().ref('users/'+userUID+'/publicaciones')
  .on('value', function(snapshot) {
    let postData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
    postData = JSON.parse(postData);
    let postUIDs = Object.keys(postData);
    for(i=0; i<postUIDs.length; i++) {
      let mensaje = (postData[postUIDs[i]].message);
      muroPosts.innerHTML += `<li class="collection-item avatar"><h5> ${mensaje} </h5>
      <a href="#!" class="secondary-content"><i class="material-icons">favorite_border</i></a></li>`;
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
        <div class='row'>
          <img class='col s4 m2 circle' width=100px class="circle" src= ${user.foto} />
          <p class='col s6 m10'> ${user.nombre} </p>
          <button class='btn-small col s2 m2' value= ${user.uid} onclick= "followPeople()">Seguir</button>
        </div>
        `);
      }
    })
})
//funcion para almacenar uid de seguidores
function followPeople() {
  //amigos 0 si son amigos y 1 si no son amigos
  let uidFollow = event.target.value;
  firebase.database().ref('users/'+userUID+'/quienes-sigo').push({
    uidFollow,
    habilitado : 1
  });
  let userName = document.getElementById('userName').innerHTML;
  firebase.database().ref('users/'+uidFollow+'/notificaciones').push({
    message : userName + ' quiere ser tu amigo'
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
