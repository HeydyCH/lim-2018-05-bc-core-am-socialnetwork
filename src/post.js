//escribiendo publicaciones
function savePost() {
  let message = document.getElementById('currentPost').value;
  if(message != '') {
    document.getElementById('currentPost').value = '';
    let optionValue = document.getElementById('privateOptions');
    optionValue = optionValue.options[optionValue.selectedIndex].value;
    firebase.database().ref('users/'+userUID+'/publicaciones').push({
      optionValue,
      message
    });
    let muroPosts = document.getElementById('myPosts');
    muroPosts.innerHTML = '';
    chargePosts(userUID, muroPosts);
  } else {
    alert('No se permite publicar algo vacio')
  }
};
//eliminar post
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
   firebase.database().ref().child('users/' + userUID + '/publicaciones/' + idPost).remove();
   // firebase.database().ref().child('posts/' + idPost).remove();
   muroPosts = document.getElementById('myPosts');
   while (muroPosts.firstChild) muroPosts.removeChild(muroPosts.firstChild);
   muroPosts.innerHTML = '';
   chargePosts(userUID, muroPosts);
   alert('The post is deleted successfully!');
 }
 //Detectamos si el usuario denegó el mensaje
 else {
   alert("¡Haz denegado la eliminacion del post !");
 }
}
//mostrando todos las publicaciones del usuario actual
function chargePosts(userUID, muroPosts) {
  console.log(userUID);
  firebase.database().ref('users/'+userUID+'/publicaciones')
  .on('child_added', function(snapshot) {
     var objPost = snapshot.val();
     console.log(objPost);
     let aux = 0;
     var profile = firebase.database().ref().child('users/'+userUID);
     profile.on('value', snap => {
       let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
       userData = JSON.parse(userData);
       muroPosts.innerHTML += "<img width='100px' class='circle img-responsive' src='"+userData.foto+"  '/>";
       muroPosts.innerHTML += `
       <div>
       <textarea id=${snapshot.key} class="collection-item avatar">${objPost.message}</textarea>
       <a href="#!" class="secondary-content"><i class="material-icons">favorite_border</i></a></li>
       <button  onclick="removePost('${snapshot.key}','${userUID}')" >DELETE</button>
       <button id=${snapshot.key + 'b'} onclick="editPost('${snapshot.key}','${userUID}','${objPost.usuario}','${objPost.optionValue}','${aux}','${snapshot.key + 'b'}')">Update</button>
       </div>
       `;
       document.getElementById(snapshot.key).disabled = true;
     })
  });
}

//mostrando todas las publicaciones de personas a las que sigo
const chargeFriendPosts = () => {
  let usersIFollow =[];
  let friendPosts = document.getElementById('myFriendsPost');
  friendPosts.innerHTML = '';
  console.log('repite');
  firebase.database().ref('users/'+userUID+'/quienes-sigo')
  .on('value', function(snapshot) {
    let usersIFollow = [];
    let postData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
    postData = JSON.parse(postData);
    let postUIDs = Object.keys(postData);
    for(i=0; i<postUIDs.length; i++) {
      let mensaje = (postData[postUIDs[i]].uidFollow);
      console.log(mensaje);
      usersIFollow.push(mensaje);
      console.log(usersIFollow);
    }
    console.log(usersIFollow);
    friendPosts.innerHTML = '';
    usersIFollow.forEach(function(element) {
      console.log(element);
      chargePosts(element, friendPosts);
    });
  });
}
