// Funcion de Inicio de Sesion para usuario con CORREO registrado
function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
      console.log("ingrese");
      let user = firebase.auth().currentUser;
      document.location.href = 'profile.html'
    })
    .catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function otrapagina(){
  document.location.href = 'profile.html'
}

// Funcion para la creación de nuevos usuarios con CORREO
function userRegister(email,password,name){
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      let user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
          console.log('enviando correo .... !!')
          alert("Revisa tu bandeja de entrada por favor :D");
          writeDatabase(user);
          otrapagina();
      })
    })
    .catch(function (error) {
        var errorMessage = error.message;
        alert(error.message + "Revisa tu bandeja de entrada, ya hemos enviado el mensaje :)");
      });
}

// Funcion que crea nuevos usuarios con GOOGLE
function userRegisterGoogle(){
  let providergoogle = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(providergoogle)
    .then(function(result) {
      let user = firebase.auth().currentUser;
      console.log("no corre con gmail")
      writeDatabase(user)
      otrapagina();
    });
}

// Funcion que crea nuevos usuarios con FACEBOOK
function userRegisterFacebook(){
  let providerfb = new firebase.auth.FacebookAuthProvider();
  firebase.auth()
    .signInWithPopup(providerfb)
    .then(function(result) {
      let user = firebase.auth().currentUser;
      console.log("no corre con facebook")
      writeDatabase(user)
      otrapagina();
  });
  
}

//Escribiendo en la BD con los DATOS del USUARIO
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
  }
  firebase.database().ref("users/" + usuario.uid)
  .set(usuario)
}


//Materialize

$(document).ready(function () {
  $(".btn").sideNav({
    menuWidth: 300,
    edge: 'rigth'
  });
});

