// console.log("ya estoy en post.js")

// function dUser(userUID) {
//   console.log(userUID);
//   let dbRefObjectUsers = firebase.database().ref().child('users/');
//   let dataUser = dbRefObjectUsers.child(userUID); // por mejorar para q no sea especifico
//   dataUser.on('value', snap => {
//     let userData = JSON.stringify(snap.val(), null, 3); //tbm funciona un solo parametro
//     console.log(userData);
//     userData = JSON.parse(userData);
//     console.log(userData);
//     console.log(userData.nombre);
//     document.getElementById("userName").innerHTML = userData.nombre;
//     document.getElementById('userPhoto').innerHTML = "<img width='100px' src='" + userData.foto + "  '/>";
//   })
// }

function welcomeUsers() {
  console.log(" welcomeUsers --> bienvenida mamita :) :3 !! ");
  //  Base de datos ACTUAL
  //  -----------------------
  // Mostrando la lista sincronizada de objetos de users-posts 

  const dbRefObjectUsersPosts = firebase.database().ref().child('users-posts')

  dbRefObjectUsersPosts.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
  });

  nameUser.innerHTML = "HOLA MAMITA";

  // mostrarPostUser(dbRefObjectUsersPosts);

}

function savePost(user, optionValue) {

  console.log("guardando mi post ..... ")
  optionValue = optionValue.options[optionValue.selectedIndex].value;
  let contenidoNewPost = document.getElementById('inputPost').value
  if (contenidoNewPost != '') {
    const post = {
      contenido: contenidoNewPost,
      estado: "feliz",
      optionValue,
      usuario: user.displayName
    };
    console.log(post);
    console.log(optionValue);

    let newPostKey = firebase.database().ref().child('posts').push().key;

    const updates = {};
    updates['/posts/' + newPostKey] = post;
    updates['/users-posts/' + user.uid + '/' + newPostKey] = post;

    document.getElementById('inputPost').value = '';

    firebase.database().ref().update(updates);

  } else {
    console.log("post vacio");
  }


}

function mostrarPostUser(dbRefObjectUsersPosts, userUID, username) {

  console.log("voy a mostrar todos mis posts publicos y privados")

  // mostrando el post del usuario logueado 
  // Sincronizar los cambios del objecto
  const postGroup1 = dbRefObjectUsersPosts.child(userUID);
  // console.log(postGroup1)console.log("####")

  postGroup1.on('child_added', snap => {
    // console.log(snap.val());
    var objPost = snap.val();
    console.log(objPost);
    // console.log(snap.key);

    if (objPost.hasOwnProperty('contenido')) {
      // var etiquetaName = document.createElement("span");
      // etiquetaName.innerHTML = userName;
      let aux = 0;
      listposts.innerHTML += `
      <div>
      <textarea id=${snap.key} >${objPost.contenido}</textarea>
      <button  onclick="removePost('${snap.key}','${userUID}')" >DELETE</button>
      <button id=${snap.key + 'b'} onclick="editPost('${snap.key}','${userUID}','${objPost.usuario}','${objPost.optionValue}','${aux}','${snap.key + 'b'}')">Update</button>
      <select id="privateOptions">
        <option value="0">Amigos</option>
        <option value="1">Publico</option>
      </select>
      </div>
      `;
      document.getElementById(snap.key).disabled = true;

    }
  })
}

function editPost(idPost, userUID, usuario, option, aux, btn) {
  console.log("voy a editar")
  console.log(aux)
  console.log(btn)
  // let boton = document.getElementById('boton');
  // boton.innerHTML = 'Editar';
  // let textareaModificar = document.getElementById('boton');
  // console.log(objPost)
  // $("#idPost"+idPost).removeAttr("readonly");

  // console.log(idPost)
  // console.log(userUID)
  // console.log(usuario)
  // console.log(option)

  const newUpdate = document.getElementById(idPost);

  const boton = document.getElementById(btn);
  boton.innerHTML = 'Guardar';


  if (aux == 0) {
    console.log("false")
    newUpdate.disabled = false;
    aux = 1;
    console.log(aux)
  } else {
    console.log("true")
    newUpdate.disabled = true;
    aux = 0;
  }

  // console.log(newUpdate.value)
  const nuevoPost = {
    contenido: newUpdate.value,
    estado: "feliz",
    optionValue: option,
    usuario: usuario

  };

  console.log(nuevoPost)

  var updatesUser = {};
  var updatesPost = {};

  updatesUser['/users-posts/' + userUID + '/' + idPost] = nuevoPost;
  updatesPost['/posts/' + idPost] = nuevoPost;

  firebase.database().ref().update(updatesUser);
  firebase.database().ref().update(updatesPost);

}

function removePost(idPost, userUID) {
  console.log("se va a borrar")


  //Ingresamos un mensaje a mostrar
  let mensaje = confirm("¿Deseas eliminar el POST");
  //Detectamos si el usuario acepto el mensaje
  if (mensaje) {
    // alert("¡Gracias por aceptar!");
    console.log(idPost)
    console.log(userUID)
    let dbRefObjectUsersPosts = firebase.database().ref().child('users-posts')
    firebase.database().ref().child('/users-posts/' + userUID + '/' + idPost).remove();
    firebase.database().ref().child('posts/' + idPost).remove();
    while (listposts.firstChild) listposts.removeChild(listposts.firstChild);
    mostrarPostUser(dbRefObjectUsersPosts, userUID)
    // alert('The user is deleted successfully!');

  }
  //Detectamos si el usuario denegó el mensaje
  else {
    alert("¡Haz denegado la eliminacion del post !");
  }

}

function mostrarPostUserPublic(dbRefObjectUsersPosts, userUID, userName) {

  console.log("publicos y privados")

  // mostrando el post del usuario logueado 
  // Sincronizar los cambios del objecto
  const postGroup1 = dbRefObjectUsersPosts.child(userUID);
  // console.log(postGroup1)console.log("####")

  let dbRefObjectUsers = firebase.database().ref('posts/');

  dbRefObjectUsers.on('child_added', snap => {
    // console.log(snap.val());
    let objPost = snap.val();
    // console.log(objPost);
    // console.log(objPost.optionValue);
    // console.log(snap.key);

    if (objPost.optionValue == 1) {

      // var etiquetaName = document.createElement("span");
      // etiquetaName.innerHTML = userName;

      var contPost = document.createElement('div');
      var textPost = document.createElement('textarea')
      textPost.setAttribute("id", snap.key);

      textPost.innerText = snap.val();

      textPost.innerHTML = objPost.contenido;

      // contPost.appendChild(etiquetaName);
      contPost.appendChild(textPost);

      listPostsGeneral.appendChild(contPost);

    }

  });

}

function close() {
  console.log("saliendo de mi perfil")
  firebase.auth().signOut()
    .then(function () {
      console.log('saliendo ... ')
      document.location.href = 'index.html';
    })
    .catch(function (error) {
      console.log(error);
    })
}



