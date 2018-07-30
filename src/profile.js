//cargando todo del muro
const welcomeUser = (uid) => {
  var profile = firebase.database().ref().child('users/'+uid);
  profile.on('value', snap => {
    let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    userData = JSON.parse(userData);
    document.getElementById("userName").innerHTML = userData.nombre;
    document.getElementById('userPhoto').innerHTML = "<img id='user-photo' width='100px' class='circle img-responsive' src='"+userData.foto+"  '/>"
    document.getElementById('userEmail').innerHTML = userData.email;
  })
  let muroPosts = document.getElementById('myPosts');
  muroPosts.innerHTML = '';
  chargePosts(userUID,muroPosts);
  chargeFriendPosts();
  chargeNotifications();
}

//mostrando la lista de usuarios registrados por busqueda
const searchPeople = (wordSearch) => {
  document.getElementById('userFilterList').innerHTML = '';
  firebase.database().ref("users")
  .on("child_added", s => {
    let user = s.val();
    console.log(s.val())
    console.log(s.key);
    if((user.nombre.toUpperCase()).indexOf(wordSearch.toUpperCase())!==-1 && user.nombre != document.getElementById("userName").innerHTML){
      $('#userFilterList').append(`
      <div class="collection-item avatar">
        <img class='col s3 circle' width=100px class="circle" src= ${user.foto} />
        <p class='col s6'><strong> ${user.nombre} </strong></p>
        <button class='btn-small col s3' id=${'a' + s.key} value = ${user.uid} onclick="followPeople(${'a' + s.key},${'b' + s.key})">Seguir</button>
        <button class='btn-small col s3' id=${'b' + s.key} value = ${user.uid} onclick="unfollowPeople(${'a' + s.key},${'b' + s.key})">Dejar de seguir</button>
      </div>
      `);
      document.getElementById('b' + s.key).style.display = 'none';
    }
  })
}

//funcion para almacenar uid de seguidores
const followPeople = (btnFollow, btnUnfollow) => {
  //amigos 0 si son amigos y 1 si no son amigos
  console.log(btnFollow);
  uidFollow = event.target.value;
  firebase.database().ref('users/'+userUID+'/quienes-sigo').push({
    uidFollow,
    habilitado : 1
  });
  let userName = document.getElementById('userName').innerHTML;
  firebase.database().ref('users/'+uidFollow+'/notificaciones').push({
    message : userName + ' quiere ser tu amigo',
    amigo : userUID
  });
  btnFollow.style.display = 'none';
  btnUnfollow.style.display = 'block';
}
//funcion para dejar de seguir a alguien
const unfollowPeople = (btnFollow, btnUnfollow) => {
  console.log('remover');
  uidFollow = event.target.value;
  let unfollowNow1;
  firebase.database().ref('users/'+ userUID + '/quienes-sigo/')
  .on('value', snap => {
    let usersIFollow = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    usersIFollow = JSON.parse(usersIFollow);
    usersIFollowObject = usersIFollow;
    usersIFollow = Object.keys(usersIFollow);
    usersIFollow.forEach(function(element) {
      if(usersIFollowObject[element].uidFollow = uidFollow){
        unfollowNow1 = element;
      }
    });
  })
  firebase.database().ref('users/' + userUID + '/quienes-sigo/' + unfollowNow1).remove();
  //eliminando la notificacion
  let unfollowNow2;
  firebase.database().ref('users/'+ uidFollow + '/notificaciones/')
  .on('value', snap => {
    let usersIFollow = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    usersIFollow = JSON.parse(usersIFollow);
    console.log(usersIFollow);
    usersIFollowObject = usersIFollow;
    usersIFollow = Object.keys(usersIFollow);
    console.log(usersIFollow);
    usersIFollow.forEach(function(element) {
      console.log(usersIFollowObject[element].amigo);
      if(usersIFollowObject[element].amigo = userUID){
        unfollowNow2 = element;
      }
    });
  })
  firebase.database().ref('users/' + uidFollow + '/notificaciones/' + unfollowNow2).remove();
  btnFollow.style.display = 'block';
  btnUnfollow.style.display = 'none';
}

//funcion para cerrar sesion
function closeSession() {
  firebase.auth().signOut()
  .then(function () {
    document.location.href = 'index.html';
  })
  .catch(function (error) {
    console.log(error);
  })
}
