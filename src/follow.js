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
