// Funcion de Inicio de Sesion para usuario
const loginNormalAccess = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    let user = firebase.auth().currentUser;
    localStorage.currentUser = user.uid;
    writeDatabase(user);
  })
  .catch(function (error) {
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}
//Funcion inicio de sesion con proveedor google o Facebook
const loginWithProvider = (provider) => {
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    let user = firebase.auth().currentUser;
    console.log(user.uid);
    console.log(result)
    writeDatabase(result.user);
    console.log(result.user);
    localStorage.currentUser = user.uid;
  });
}
// Funcion que crea nuevos usuarios con correo
const userRegister = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function () {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
      console.log('enviando correo .... !!')
      alert("Revisa tu bandeja de entrada por favor :D");
      writeDatabase(user);
      loginNormalAccess(email, password);
    })
  })
  .catch(function (error) {
    var errorMessage = error.message;
    alert(error.message + "Revisa tu bandeja de entrada, ya hemos enviado el mensaje :)");
  });
}
//Escribiendo en la base de datos el profile del usuario
const writeDatabase = (user) => {
  //muestrame si existe el usuario
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
      console.log(usuario);
      document.location.href = 'profile.html';
    } else {
      console.log('ya existia el usuario');
      document.location.href = 'profile.html';
    }
  })
}
