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

function chargePosts(userUID, muroPosts) {
  firebase.database().ref('users/'+userUID+'/publicaciones')
  .on('child_added', function(snapshot) {
     var objPost = snapshot.val();
     var profile = firebase.database().ref().child('users/'+userUID);
     profile.on('value',snap => {
       let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
       userData = JSON.parse(userData);
      let privacidad=objPost.optionValue
      let a = 'favorite_border';
      if(privacidad == 0){
        a = 'group';
      }else{
        a = 'public';
      }
      let aux= 0 ;
      muroPosts.innerHTML += `
       <div class="card horizontal card-posts">
        <!-- Este div solo sirve para dar espacio -->
        <div class = "row">
          <div class="input-field col s12"></div>
          <img width="4px" class="circle col s2 offset-s1" src="${userData.foto}"/>
          <div class="col s7">
            <span>${userData.nombre}</span>
            <i class="material-icons">${a}</i>
            <textarea id=${snapshot.key} class="contenido-post">${objPost.message}</textarea>
          </div>
          <div class="col s6 offset-s3">
            <button  class='waves-effect waves-light btn-small' id=${'a' + snapshot.key} onclick="contLikes('${snapshot.key}' , '${userUID}', '${'a' + snapshot.key}')"><i class="material-icons">favorite_border</i></button>
            <button  class='waves-effect waves-light btn-small' id=${'r' + snapshot.key}  onclick="removePost('${snapshot.key}','${userUID}')"><i class="material-icons">delete</i></button>
            <button class='waves-effect waves-light btn-small' id=${'e' + snapshot.key} onclick="editPost('${snapshot.key}','${userUID}','${objPost.usuario}','${objPost.optionValue}','${aux}','${snapshot.key}')"><i class="material-icons">border_color</i></button>
          </div>
        </div>
       </div>
       `;
       if(userUID !== localStorage.currentUser){
         document.getElementById('r' + snapshot.key).style.display = 'none';
         document.getElementById('e' + snapshot.key).style.display = 'none';
       }
       //<button class='waves-effect waves-light btn-small' id=${snapshot.key + 'se'} onclick="saveEditPost('${snapshot.key}','${userUID}','${objPost.usuario}','${objPost.optionValue}','${aux}','${snapshot.key}')"><i class="material-icons">archive</i></button>
     })
     console.log(userUID);
  });
}
//mostrando todas las publicaciones de personas a las que sigo
const chargeFriendPosts = () => {
  let usersIFollow = [];
  let friendPosts = document.getElementById('myFriendsPost');
  firebase.database().ref('users/'+userUID+'/quienes-sigo')
  .on('value', function(snapshot) {
    console.log('repite');

    let postData = JSON.stringify(snapshot.val(),null,3);//tbm funciona un solo parametro
    postData = JSON.parse(postData);
    let postUIDs = Object.keys(postData);
    for(i=0; i<postUIDs.length; i++) {
      let mensaje = (postData[postUIDs[i]].uidFollow);
      usersIFollow.push(mensaje);
    }
    console.log(usersIFollow);
    friendPosts.innerHTML = ''
    usersIFollow.forEach(function(element) {
      console.log(element);
      chargePosts(element, friendPosts);
    });
  });
}
