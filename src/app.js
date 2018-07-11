function register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      verificar();
    })
}

function entrance() {
    var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;
    firebase.auth().signInWithEmailAndPassword(email2, password2)
      .catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
}

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('existe usuario activo');
            aparece(user);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(user.photoURL);

            // ...
        } else {
            // user is signed out.
            console.log('no existe usuario activo')
            contenido.innerHTML = `
            <div class="container mt-5">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Sesión no iniciada</strong> ...
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            </div>
            `;
            // ...
        }
    });
}

observador();

function aparece(user) {
    var user = user;
    var contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        contenido.innerHTML = `
        <div class="container mt-5">
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Bienvenido ${user.displayName}!!</h4>
        <img alt="" width="100px" src = '${user.photoURL}' />
        <hr>
        </div>
        <button onclick="cerrar()" class="btn btn-danger">Cerrar sesion</button>
        </div>
        `;
    }
}

function cerrar() {
    console.log('diste un click en close');
    firebase.auth().signOut()
        .then(function () {
            console.log('saliendo ... ')
        })
        .catch(function (error) {
            console.log(error);
        })
}

function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('enviando correo .... !!')
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
}
//login con google
var providergoogle = new firebase.auth.GoogleAuthProvider();

$('#loginGoogle').click(function(){
  firebase.auth()
    .signInWithPopup(providergoogle)
    .then(function(result) {
    console.log(result.user.photoURL);
    guardarDatos(result.user);
    });
});

//login con facebook
var providerfb = new firebase.auth.FacebookAuthProvider();

$('#loginFacebook').click(function(){
  firebase.auth()
    .signInWithPopup(providerfb)
    .then(function(result) {
      console.log(result.user);
    });
})

//escribir en la base de datos
function guardarDatos(user){
  var usuario = {
    uid:user.uid,
    nombre: user.displayName,
    email:user.email,
    foto:user.photoURL
  }
  firebase.database().ref("usuario/" + usuario.uid)
  .set(usuario)
}

//leyendo la databaseURL
firebase.database().ref("usuario")
  .on("child_added", function(s){
    var user = s.val();
    var usuarios = document.getElementById('usuarios');
    usuarios.innerHTML += "<img src'"+user.foto+"'/>";
})
