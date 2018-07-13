document.getElementById("login").addEventListener("click",login);
document.getElementById("userRegister").style.display = "none";

// Funcion de Inicio de Sesion para usuario con correo registrado
function login(){
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
      console.log("ingrese");
      document.location.href = 'profile.html'
      
    })
    .catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

// Funcion que crea nuevos usuarios con correo
document.getElementById("registerUser").addEventListener("click", () => {
  document.getElementById("userLogin").style.display = "none";
  document.getElementById("userRegister").style.display = "block";
});

document.getElementById("register").addEventListener("click", userRegister)


// Acceder con algun correo 

function userRegister() {
  var email = document.getElementById('email2').value;
  var password = document.getElementById('password2').value;
  let name = document.getElementById('name').value;
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
        console.log('enviando correo .... !!')
        console.log(user);
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
      document.location.href = 'profile.html'
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
      document.location.href = 'profile.html'
    });
})

// Funcion para escribir en la base de datos
function writeDatabase(user) {
  console.log(user);
  var usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL,
  }
  firebase.database().ref("users/" + usuario.uid)
    .set(usuario)
}
//volver al inicio
document.getElementById('returnHome').addEventListener("click", () => {
  document.getElementById("userLogin").style.display = "block" ;
  document.getElementById("userRegister").style.display = "none" ;
})


