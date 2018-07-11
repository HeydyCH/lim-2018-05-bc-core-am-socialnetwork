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

            document.getElementById('CreatePost').style.display='none';

            document.getElementById('post').style.display='none';
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
        mostrarPost();
        document.getElementById('post').style.display='block';
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
    foto:user.photoURL,
    idPublicacion:{
        contenido:"hola soy mami Anaey",
        comentario: "yupi estoy feliz"
    },
    idPublicacion2:{
        contenido:"hola como cambio pañales",
        comentario: "solo se q nada se"
    }
  }
  firebase.database().ref("users/" + usuario.uid)
  .set(usuario)
  var post = document.getElementById('post2').value;

}
//leyendo la databaseURL
firebase.database().ref("users")
  .on("child_added", function(s){
    var user = s.val();
    $('#usuarios').append("<img width='100px' src='"+user.foto+"'/>");
})


function mostrarPost() {

    document.getElementById('CreatePost').style.display='block';

    //Base de datos

    console.log("Estoy en el app.js")

    //obtener Elementos
    const preObject = document.getElementById("object");
    let post = document.getElementById('post');

    //Creando la Referencia para realtime
    const dbRefObject = firebase.database().ref().child('users')
    // const dbRefList = dbRefObject.child('htaRDeoDVJXXHkF0VwBKncoq6tA2');
    var postGroup = dbRefObject.child('7xFl31qD7SgITHpC0iUPXbn1DHm1');
    var postUser = postGroup.child('idPublicacion');

    // Sincronizar los cambios del objecto

    // *********************** 

    dbRefObject.on('value', snap => {
        console.log(snap.val());
        console.log("---------------");
        preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
    });

    postGroup.on('child_added', snap => {
        console.log(snap.val());
        var objPost = snap.val();
        console.log(objPost.contenido);

        if (objPost.hasOwnProperty('contenido')) {
            const p = document.createElement('p');
            // p.innerText = snap.val();
            p.innerHTML = `
            <div class="container mt-5">
            <div class="alert alert-success" role="alert">
            <h5 class="alert-heading">Bienvenido ${objPost.contenido}!!</h5>
            </div>
            </div>`;
            console.log(snap.key);
            p.id = snap.key;
            post.appendChild(p);
        }

    })

    //   postUser.on('child_added',snap => {
    //     console.log(snap.val());
    //     const p= document.createElement('p');
    //     // p.innerText = snap.val();
    //     p.innerHTML = `
    //     <div class="container mt-5">
    //     <div class="alert alert-success" role="alert">
    //     <h5 class="alert-heading">Bienvenido ${snap.val()}!!</h5>
    //     </div>
    //     </div>
    //     `;
    //     console.log(snap.key);
    //     p.id = snap.key;
    //     post.appendChild(p);
    //   })

    postGroup.on('child_changed', snap => {
        const pChanged = document.getElementById(snap.key);
        pChanged.innerHTML = snap.val();
    })

    postGroup.on('child_changed', snap => {
        const pToRemove = document.getElementById(snap.key);
        pToRemove.remove();
    })

    postGroup.on('child_changed', snap => {
        const pChanged = document.getElementById(snap.key);
        pChanged.innerHTML = snap.val()
    })


}

function guardar() {
    console.log("estoy en guardar");
    var post = document.getElementById('post2').value;
    console.log(post);

  }