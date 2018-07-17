// console.log("ya estoy en post.js")

function welcomeUsers() {

  console.log(" welcomeUsers --> bienvenida mamita :) :3 !! ");

  //  Base de datos ACTUAL
  //  -----------------------
  // Mostrando la lista sincronizada de objetos de users-posts 

  const dbRefObjectUsersPosts = firebase.database().ref().child('users-posts')
  // var profile = firebase.database().ref().child('users/'+user.uid);
  const dbRefObjectUsers = firebase.database().ref().child('users/');
  const dataUser = dbRefObjectUsers.child("7gDR0YSny1SWvKyen6Nz81XT9292"); // por mejorar para q no sea especifico

  dbRefObjectUsersPosts.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
  });

  dataUser.on('value', snap => {
    let userData = JSON.stringify(snap.val(), null, 3); //tbm funciona un solo parametro
    //   console.log(userData);
    userData = JSON.parse(userData);
    //   console.log(userData);
    console.log(userData.nombre);
    document.getElementById("userName").innerHTML = userData.nombre;
    document.getElementById('userPhoto').innerHTML = "<img width='100px' src='" + userData.foto + "  '/>";
  })

  nameUser.innerHTML = "hola mundo";

  mostrarPostUser(dbRefObjectUsersPosts);

}


function savePost() {

  console.log("guardando mi post ..... ")
  const post = {
    contenido: document.getElementById('inputPost').value,
    estado: "feliz"
  };
  console.log(post);

  let usuario = firebase.auth().currentUser;
  let usuarioNew = usuario.uid;

  let newPostKey = firebase.database().ref().child('posts').push().key;

  const updates = {};
  updates['/posts/' + newPostKey] = post;
  updates['/users-posts/' + usuarioNew + '/' + newPostKey] = post;

  document.getElementById('inputPost').value = '';

  firebase.database().ref().update(updates);

  // ---------------------------------------------------------------
  
  const postGroup1 = dbRefObjectUsersPosts.child(usuarioNew);
  postGroup1.on('child_added', snap => {
    // console.log("ya entre");
    console.log(snap.val());
    let objPost = snap.val();
    // console.log(objPost);
    // console.log(snap.key);
    if (objPost.hasOwnProperty('contenido')) {

      var btnUpdate = document.createElement("input");

      btnUpdate.setAttribute("value", "Update");
      btnUpdate.setAttribute("type", "button");

      var btnDelete = document.createElement("input");
      btnDelete.setAttribute("value", "Delete");
      btnDelete.setAttribute("type", "button");

      let contPost = document.createElement('div');
      let textPost = document.createElement('textarea')

      textPost.innerText = snap.val();
      textPost.setAttribute("id", snap.key);

      textPost.innerHTML = objPost.contenido;

      contPost.appendChild(textPost);
      contPost.appendChild(btnUpdate);
      contPost.appendChild(btnDelete);
      listposts.appendChild(contPost);
    }

    btnDelete.addEventListener('click', () => {

      console.log("se va a borrar")
      console.log(snap.key)

      firebase.database().ref().child('/user-posts/' + "8f9dlKpokuSFnY9kCTwzZsozH7v1" + '/' + snap.key).remove();
      firebase.database().ref().child('posts/' + snap.key).remove();

      // while (postGroup1.firstChild) posts.removeChild(postGroup1.firstChild);

      alert('The user is deleted successfully!');

      // const pToRemove = document.getElementById(snap.key);
      // pToRemove.remove();


    });

    btnUpdate.addEventListener('click', () => {
      const newUpdate = document.getElementById(newPost);
      const nuevoPost = {
        body: newUpdate.value,
      };

      var updatesUser = {};
      var updatesPost = {};

      updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
      updatesPost['/posts/' + newPost] = nuevoPost;

      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);

    });


  })

}

function mostrarPostUser(dbRefObjectUsersPosts) {

  console.log("voy a mostrar todos mis posts publicos y privados")

  // mostrando el post del usuario logueado 

  // Sincronizar los cambios del objecto

  // *********************** 
  const postGroup1 = dbRefObjectUsersPosts.child("J04DWExMqYVcqEqd8eI4gxJq5Gi2");
  // console.log(postGroup1)

  console.log("####")

  postGroup1.on('child_added', snap => {
    // console.log("ya entre");
    console.log(snap.val());
    let objPost = snap.val();
    // console.log(objPost);
    // console.log(snap.key);
    if (objPost.hasOwnProperty('contenido')) {

      var btnUpdate = document.createElement("input");

      btnUpdate.setAttribute("value", "Update");
      btnUpdate.setAttribute("type", "button");

      var btnDelete = document.createElement("input");
      btnDelete.setAttribute("value", "Delete");
      btnDelete.setAttribute("type", "button");

      let contPost = document.createElement('div');
      let textPost = document.createElement('textarea')

      textPost.innerText = snap.val();
      textPost.setAttribute("id", snap.key);

      textPost.innerHTML = objPost.contenido;

      contPost.appendChild(textPost);
      contPost.appendChild(btnUpdate);
      contPost.appendChild(btnDelete);
      listposts.appendChild(contPost);
    }

    btnDelete.addEventListener('click', () => {

      console.log("se va a borrar")
      console.log(snap.key)

      firebase.database().ref().child('/user-posts/' + "8f9dlKpokuSFnY9kCTwzZsozH7v1" + '/' + snap.key).remove();
      firebase.database().ref().child('posts/' + snap.key).remove();

      // while (postGroup1.firstChild) posts.removeChild(postGroup1.firstChild);

      alert('The user is deleted successfully!');

      // const pToRemove = document.getElementById(snap.key);
      // pToRemove.remove();


    });

    btnUpdate.addEventListener('click', () => {
      const newUpdate = document.getElementById(newPost);
      const nuevoPost = {
        body: newUpdate.value,
      };

      var updatesUser = {};
      var updatesPost = {};

      updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
      updatesPost['/posts/' + newPost] = nuevoPost;

      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);

    });


  })

  console.log("--------------")
  // postGroup.on('child_changed', snap => {
  //     const pChanged = document.getElementById(snap.key);
  //     pChanged.innerHTML = snap.val();
  // })

  // postGroup.on('child_changed', snap => {
  //     const pToRemove = document.getElementById(snap.key);
  //     pToRemove.remove();
  // })

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

