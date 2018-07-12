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
    console.log("ingrese");
    document.getElementById("userLogin").style.display = "none" ;
    document.getElementById("userProfile").innerHTML = "hola " + email ;
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
  

  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
          console.log('enviando correo .... !!')
      })
    })
}

 