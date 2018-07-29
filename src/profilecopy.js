//escribiendo publicaciones
// document.getElementById('savePost').addEventListener("click", savePost)
// function savePost() {
//   let message = document.getElementById('currentPost').value;
//   document.getElementById('currentPost').value = '';
//   let userUID = firebase.auth().currentUser.uid;
//   let optionValue = document.getElementById('privateOptions');
//   optionValue = optionValue.options[optionValue.selectedIndex].value;
//   firebase.database().ref('users/'+userUID+'/publicaciones').push({
//     optionValue,
//     message
//   });
//   let muroPosts = document.getElementById('myPosts');
//   muroPosts.innerHTML = '';
//   chargePosts(userUID, muroPosts);
// };
//mostrando todos las publicaciones del usuario actual
// function chargePosts(userUID, muroPosts) {
//   firebase.database().ref('users/'+userUID+'/publicaciones')
//   .on('child_changed', function(snapshot) {
//      var objPost = snapshot.val();
//      console.log(objPost);
//      let aux = 0;
//      var profile = firebase.database().ref().child('users/'+userUID);
//      profile.on('value', snap => {
//        let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
//        userData = JSON.parse(userData);
//        muroPosts.innerHTML += "<img width='100px' class='circle img-responsive' src='"+userData.foto+"  '/>";
//        muroPosts.innerHTML += `
//        <div>
//        <textarea id=${snapshot.key} class="collection-item avatar">${objPost.message}</textarea>
//        <a href="#!" class="secondary-content"><i class="material-icons">favorite_border</i></a></li>
//        <button  onclick="removePost('${snapshot.key}','${userUID}')" >DELETE</button>
//        <button id=${snapshot.key + 'b'} onclick="editPost('${snapshot.key}','${userUID}','${objPost.usuario}','${objPost.optionValue}','${aux}','${snapshot.key + 'b'}')">Update</button>
//        </div>
//        `;
//        document.getElementById(snapshot.key).disabled = true;
//      })
//   });
// }
//eliminar post
// function removePost(idPost, userUID) {
//  console.log("se va a borrar")
//  //Ingresamos un mensaje a mostrar
//  let mensaje = confirm("¿Deseas eliminar el POST");
//  //Detectamos si el usuario acepto el mensaje
//  if (mensaje) {
//    // alert("¡Gracias por aceptar!");
//    console.log(idPost)
//    console.log(userUID)
//    let dbRefObjectUsersPosts = firebase.database().ref().child('users-posts')
//    firebase.database().ref().child('users/' + userUID + '/publicaciones/' + idPost).remove();
//    // firebase.database().ref().child('posts/' + idPost).remove();
//    muroPosts = document.getElementById('myFriendsPost');
//    while (muroPosts.firstChild) muroPosts.removeChild(muroPosts.firstChild);
//    chargePosts(userUID, muroPosts);
//    // alert('The user is deleted successfully!');
//  }
//  //Detectamos si el usuario denegó el mensaje
//  else {
//    alert("¡Haz denegado la eliminacion del post !");
//  }
// }
//cargar las Notificaciones
// function chargeNotifications() {
//   firebase.database().ref('users/'+userUID+'/notificaciones')
//   .on('value', function(snapshot) {
//     let myNotifications = [];
//     let notificationData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
//     notificationData = JSON.parse(notificationData);
//     let notifications = Object.keys(notificationData);
//     console.log(notifications)
//     for(i=0; i<notifications.length; i++) {
//       let mensaje = (notificationData[notifications[i]].message);
//       console.log(mensaje);
//       myNotifications.push(mensaje);
//       console.log(myNotifications);
//
//     }
//     let friendNotifications = document.getElementById('notifications');
//     friendNotifications.innerHTML = '';
//     myNotifications.forEach(function(element) {
//       friendNotifications.innerHTML += '<li>';
//       friendNotifications.innerHTML += element;
//       friendNotifications.innerHTML += '</li>';
//
//     });
//
//   });
// }
