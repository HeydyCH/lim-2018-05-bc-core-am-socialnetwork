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
// Funcion de Inicio de Sesion para usuario con correo registrado
function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    user = firebase.auth().currentUser;
    localStorage.currentUser = user.uid;
    document.location.href = 'profile.html';
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
      localStorage.currentUser = JSON.parse(JSON.stringify(user.uid));
      document.location.href = 'profile.html';
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
      localStorage.currentUser = JSON.parse(JSON.stringify(user.uid));
      document.location.href = 'profile.html';
    });
})
//Escribiendo en la base de datos el profile del usuario
function writeDatabase(user) {
  //muestrame si existe el usuario
  // var user = firebase.auth().currentUser.uid;
  var profile = firebase.database().ref().child('users/' + user.uid);
  profile.on('value', snap => {
    let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    userData = JSON.parse(userData);
    if(userData == null) {
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
      }
      firebase.database().ref("users/" + usuario.uid)
      .set(usuario)
    } else {
      console.log('ya existia el usuario');
    }
  })
}
//volver al inicio
document.getElementById('returnHome').addEventListener("click", () => {
  document.getElementById("userLogin").style.display = "block" ;
  document.getElementById("userRegister").style.display = "none" ;
})
