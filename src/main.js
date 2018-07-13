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

function userRegister() {
  var email = document.getElementById('email2').value;
  var password = document.getElementById('password2').value;
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
        console.log('enviando correo .... !!')
        console.log(user);
        guardarDatos(user);
      })
    })
}

// ***************** Parte de Heydy *********************************

// Funcion para escribir en la base de datos
function guardarDatos(user) {
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



