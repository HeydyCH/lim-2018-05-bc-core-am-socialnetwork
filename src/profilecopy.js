

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
