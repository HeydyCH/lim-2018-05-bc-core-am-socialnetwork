//funcion para almacenar uid de seguidores
const likePost = (btnLike, btnDislike, uidFollow, idPost) => {
  let userName = document.getElementById('userName').innerHTML;
  firebase.database().ref('users/'+uidFollow+'/notificaciones').push({
    message : userName + ' le dio like a tu publicacion',
    amigo : userUID
  });
  firebase.database().ref('users/'+uidFollow+'/publicaciones/'+idPost+'/likesFromUsers').push({
    amigo : userUID,
    nombre : userName
  });
  document.getElementById(btnLike).style.display = 'none';
  document.getElementById(btnDislike).style.display = 'block';
  chargeFriendPosts();
}
//funcion para dejar de seguir a alguien
const dislikePost = (btnLike, btnDislike, uidFollow, idPost) => {
  let unfollowNow1;
  firebase.database().ref('users/'+ uidFollow + '/notificaciones')
  .on('value', snap => {
    let usersIFollow = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    usersIFollow = JSON.parse(usersIFollow);
    usersIFollowObject = usersIFollow;
    usersIFollow = Object.keys(usersIFollow);
    usersIFollow.forEach(function(element) {
      if(usersIFollowObject[element].amigo = uidFollow){
        unfollowNow1 = element;
      }
    });
  })
  firebase.database().ref('users/' + uidFollow + '/notificaciones/' + unfollowNow1).remove();
  let unfollowNow2;
  firebase.database().ref('users/'+uidFollow+'/publicaciones/'+idPost+'/likesFromUsers')
  .on('value', snap => {
    let usersIFollow = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
    usersIFollow = JSON.parse(usersIFollow);
    usersIFollowObject = usersIFollow;
    usersIFollow = Object.keys(usersIFollow);
    usersIFollow.forEach(function(element) {
      if(usersIFollowObject[element].amigo = userUID){
        unfollowNow2 = element;
      }
    });
  })
  firebase.database().ref('users/'+uidFollow+'/publicaciones/'+idPost+'/likesFromUsers/' + unfollowNow2).remove();
  document.getElementById(btnLike).style.display = 'block';
  document.getElementById(btnDislike).style.display = 'none';
  recharge();
}
const recharge = () => {
  let muroPosts = document.getElementById('myPosts');
  muroPosts.innerHTML = '';
  chargeFriendPosts();
  chargePosts(userUID,muroPosts);
  chargeNotifications();
}
