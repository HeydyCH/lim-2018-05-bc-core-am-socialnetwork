const preObject = document.getElementById("object");
const nameUser = document.getElementById('name');
const listposts = document.getElementById('listposts');


initFirebase()
console.log("ya estoy en post.js")
console.log()
welcomeUsers();

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

  var usuario = firebase.auth().currentUser;
  var usuarioNew = usuario.uid;
  console.log(usuario)
  console.log(usuarioNew)

  document.getElementById('inputPost').value = '';
  const dbRef = firebase.database().ref("users-posts/" + usuarioNew);
  const newPost = dbRef.push();
  const dbRef1 = firebase.database().ref("posts/");
  const newPost1 = dbRef1.push();
  newPost.set(post);
  newPost1.set(post);
  console.log("vaa  entrar a usuario neww ")
  // mostrarPostUser(usuarioNew)

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

function mostrarPostUser(dbRefObjectUsersPosts) {

  console.log("voy a mostrar todos mis posts publicos y privados")

  // mostrando el post del usuario logueado 

  // Sincronizar los cambios del objecto

  // *********************** 


  const postGroup1 = dbRefObjectUsersPosts.child("2uDZRphUwCWI60yJznk5tZ6nm313");
  console.log(postGroup1)

  console.log("####")

  postGroup1.on('child_added', snap => {
    // console.log(snap.val());
    var objPost = snap.val();
    console.log(objPost);
    console.log(snap.key);
    // console.log("holiiiiiii")

    if (objPost.hasOwnProperty('contenido')) {
      // const p = document.createElement('p');
      // p.innerText = snap.val();
      // p.innerHTML = `
      // <div class="container mt-5">
      // <div class="alert alert-success" role="alert">
      // <h5 class="alert-heading">Bienvenido ${objPost.contenido}!!</h5>
      // </div>
      // </div>`;
      // // console.log(snap.key);
      // p.id = snap.key;
      // listposts.appendChild(p);


      var btnUpdate = document.createElement("input");
      btnUpdate.setAttribute("value", "Update");
      btnUpdate.setAttribute("type", "button");

      var btnDelete = document.createElement("input");
      btnDelete.setAttribute("value", "Delete");
      btnDelete.setAttribute("type", "button");

      var contPost = document.createElement('div');
      var textPost = document.createElement('textarea')
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

      firebase.database().ref().child('/user-posts/' + "2uDZRphUwCWI60yJznk5tZ6nm313" + '/' + snap.key).remove();
      firebase.database().ref().child('posts/' + snap.key).remove();

      while (postGroup1.firstChild) posts.removeChild(postGroup1.firstChild);

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

document.getElementById("close").addEventListener("click", close);
document.getElementById("btnPost").addEventListener("click", savePost);
