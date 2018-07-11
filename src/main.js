function register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
          console.log('enviando correo .... !!')
      })
    })
}

function entrance() {
  var email = document.getElementById('email2').value;
  var password = document.getElementById('password2').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('existe usuario activo');
            console.log(user.displayName);
            aparece(user);
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
    firebase.auth().signOut()
        .then(function () {
            console.log('saliendo ... ')
        })
        .catch(function (error) {
            console.log(error);
        })
}
document.getElementById("btnValidate").disabled = true;


//login con google
var providergoogle = new firebase.auth.GoogleAuthProvider();

$('#loginGoogle').click(function(){
  firebase.auth()
    .signInWithPopup(providergoogle)
    .then(function(result) {
    guardarDatos(result.user);
    });
});
//login con facebook
var providerfb = new firebase.auth.FacebookAuthProvider();

$('#loginFacebook').click(function(){
  firebase.auth()
    .signInWithPopup(providerfb)
    .then(function(result) {
      guardarDatos(result.user);
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
  firebase.database().ref("users/" + usuario.uid)
  .set(usuario)
}
//leyendo la databaseURL
firebase.database().ref("users")
  .on("child_added", function(s){
    var user = s.val();
    $('#usuarios').append("<img width='100px' src='"+user.foto+"'/>");
  })
