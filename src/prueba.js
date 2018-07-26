// function mostrarPostUser(dbRefObjectUsersPosts, userUID, userName) {


//   const dbRefObjectUsers = firebase.database().ref().child('users/');
//   const dataUser = dbRefObjectUsers.child(userUID); // por mejorar para q no sea especifico
  
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

// const postGroup1 = dbRefObjectUsersPosts.child(userUID);
// // console.log(postGroup1)
// console.log("####")

// postGroup1.on('child_added', snap => {
//   // console.log(snap.val());
//   let objPost = snap.val();
//   console.log(objPost);
//   // console.log(snap.key);

//   if (objPost.hasOwnProperty('contenido')) {

//     var etiquetaName = document.createElement("span");
//     etiquetaName.innerHTML = userName;

//     var btnUpdate = document.createElement("input");
//     btnUpdate.setAttribute("value", "Update");
//     btnUpdate.setAttribute("type", "button");

//     var btnDelete = document.createElement("input");
//     btnDelete.setAttribute("value", "Delete");
//     btnDelete.setAttribute("type", "button");

//     var contPost = document.createElement('div');
//     var textPost = document.createElement('textarea')
//     textPost.setAttribute("id", snap.key);

//     textPost.innerText = snap.val();

//     textPost.innerHTML = objPost.contenido;

//     contPost.appendChild(etiquetaName);
//     contPost.appendChild(textPost);
//     contPost.appendChild(btnUpdate);
//     contPost.appendChild(btnDelete);

//     listposts.appendChild(contPost);

//   }

//   btnDelete.addEventListener('click', () => {
//     // console.log("se va a borrar")
//     // console.log(snap.key)
//     // console.log(userUID);
//     firebase.database().ref().child('/users-posts/' + userUID + '/' + snap.key).remove();
//     firebase.database().ref().child('posts/' + snap.key).remove();

//     // console.log(listposts);
//     while (listposts.firstChild) listposts.removeChild(listposts.firstChild);
//     mostrarPostUser(dbRefObjectUsersPosts, userUID)
//     alert('The user is deleted successfully!');
//   });


//   btnUpdate.addEventListener('click', () => {

//     // console.log("voy a editar")
//     // console.log(snap.key)
//     // console.log(postGroup1)

//     let objPost = snap.val();
//     // console.log(objPost);
//     // console.log(objPost.optionValue)

//     const newUpdate = document.getElementById(snap.key);

//     // console.log(newUpdate.value)
//     const nuevoPost = {
//       contenido: newUpdate.value,
//       estado: "feliz",
//       optionValue: objPost.optionValue
//     };

//     console.log(nuevoPost)

//     var updatesUser = {};
//     var updatesPost = {};

//     updatesUser['/users-posts/' + userUID + '/' + snap.key] = nuevoPost;
//     updatesPost['/posts/' + snap.key] = nuevoPost;

//     firebase.database().ref().update(updatesUser);
//     firebase.database().ref().update(updatesPost);

//   });


// })