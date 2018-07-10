function register() {
    console.log('diste un click en resgister')
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // console.log(email);
    // console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            verificar();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
}

function entrance() {
    console.log('diste un click en entrance')
    var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
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
            console.log('********************');
            console.log(emailVerified);
            console.log('********************');
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
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
        <h4 class="alert-heading">Bienvenido ${user.email}!!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
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
var provider = new firebase.auth.GoogleAuthProvider();

$('#loginGoogle').click(function(){
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
    console.log(result);
    });

});
