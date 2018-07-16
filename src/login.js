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

document.getElementById("login").addEventListener("click", login);
document.getElementById("userRegister").style.display = "none" ;
document.getElementById("userProfile").style.display = "none";
// Funcion de Inicio de Sesion para usuario con correo registrado
function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    console.log("ingrese");
    welcomeUser();
  })
  .catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

// Funcion que crea nuevos usuarios con correo
document.getElementById("registerUser").addEventListener("click", ()=>{
  document.getElementById("userLogin").style.display = "none" ;
  document.getElementById("userRegister").style.display = "block" ;
});
document.getElementById("register").addEventListener("click", userRegister)

function userRegister(){
  var email = document.getElementById('email2').value;
  var password = document.getElementById('password2').value;
  let name = document.getElementById('name').value;
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
          console.log('enviando correo .... !!')
          alert("Revisa tu bandeja de entrada por favor :D");
          writeDatabase(user);
      })
    })
    .catch(function (error) {
        var errorMessage = error.message;
        alert(error.message + "Revisa tu bandeja de entrada, ya hemos enviado el mensaje :)");
      });
}
//acceder con google
var providergoogle = new firebase.auth.GoogleAuthProvider();
$('#loginGoogle').click(function(){
  firebase.auth()
    .signInWithPopup(providergoogle)
    .then(function(result) {
      let user = firebase.auth().currentUser;
      writeDatabase(user);
      welcomeUser();
    });
});
//acceder con facebook
var providerfb = new firebase.auth.FacebookAuthProvider();

$('#loginFacebook').click(function(){
  firebase.auth()
    .signInWithPopup(providerfb)
    .then(function(result) {
      let user = firebase.auth().currentUser;
      writeDatabase(user);
      welcomeUser();
    });
})
//Escribiendo en la base de datos el profile del usuario
function writeDatabase(user) {
  if(user.photoURL == null){
    foto = "https://cdn.dribbble.com/users/37144/screenshots/3739334/edit.gif";
  } else {
    foto= user.photoURL;
  }
  if(user.displayName == null){
    nombre = document.getElementById('name').value;
  } else {
    nombre = user.displayName;
  }
  var usuario = {
    uid : user.uid,
    nombre,
    email:user.email,
    foto,
    publicaciones: ["hola"]
  }
  firebase.database().ref("users/" + usuario.uid)
  .set(usuario)
}

//redireccionando al muro
function welcomeUser() {
  document.getElementById("userLogin").style.display = "none" ;
  document.getElementById("userProfile").style.display = "block";
  var user = firebase.auth().currentUser;
  if (user != null) {
    // console.log(user);
    var profile = firebase.database().ref().child('users/'+user.uid);
    profile.on('value', snap => {
      let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
      userData = JSON.parse(userData);
      console.log(userData);
      console.log(userData.nombre);
      document.getElementById("userName").innerHTML = userData.nombre;
      document.getElementById('userPhoto').innerHTML = "<img width='100px' src='"+userData.foto+"  '/>"
    })
  }
}
//escribiendo publicaciones
document.getElementById('savePost').addEventListener("click", savePost)
function savePost() {
  let message = document.getElementById('currentPost').value;
  let userUID = firebase.auth().currentUser.uid;
  let optionValue = document.getElementById('privateOptions');
  optionValue = optionValue.options[optionValue.selectedIndex].value;
  firebase.database().ref('users/'+userUID+'/publicaciones').push({
    optionValue,
    message
  });
  chargePosts();
};
//mostrando todos las publicaciones del usuario actual
function chargePosts() {
  let user = firebase.auth().currentUser;
  firebase.database().ref('users/'+user.uid+'/publicaciones')
  .on('value', function(snapshot) {
    let muroPosts = document.getElementById('myPosts');
    muroPosts = '';
    let postData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
    postData = JSON.parse(postData);
    console.log(postData);
    // snapshot.forEach(function(e) {
    //   var element = e.val();
    //   var mensaje = element.message;
    //   muroPosts.innerHTML += '<li><b>' + mensaje + '</b></li>';
    // });
    // postData.forEach(function(element) {
    //   document.getElementById('myPosts').innerHTML += '<button>'+element+'</button>';
    // });
  });
}
//volver al inicio
document.getElementById('returnHome').addEventListener("click", () => {
  document.getElementById("userLogin").style.display = "block" ;
  document.getElementById("userRegister").style.display = "none" ;
})
