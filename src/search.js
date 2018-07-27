//mostrando todas las publicaciones de personas a las que sigo
function chargeFriendPosts() {
  let usersIFollow =[];
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
    let friendPosts = document.getElementById('myFriendsPost');
    friendPosts.innerHTML = '';
    usersIFollow.forEach(function(element) {
      console.log(element);
      chargePosts(element, friendPosts);
    });
  });
}