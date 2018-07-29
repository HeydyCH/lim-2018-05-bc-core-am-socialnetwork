// inicio DOM

// Inicializando  Firebase
initFirebase();
let userUID = localStorage.currentUser;
const muroPosts = document.getElementById('myPosts');
welcomeUser(userUID);

//escribiendo publicaciones
document.getElementById('savePost').addEventListener("click", savePost)


//mostrando la lista de usuarios registrados por busqueda
document.getElementById('searchText').addEventListener('input', () =>{
  let wordSearch = document.getElementById('searchText').value;
})
document.getElementById('buttonSearch').addEventListener('click', ()=>{
  document.getElementById('userFilterList').innerHTML = '';
  firebase.database().ref("users")
    .on("child_added", function(s){
      let wordSearch = document.getElementById('searchText').value;
      var user = s.val();
      if((user.nombre.toUpperCase()).indexOf(wordSearch.toUpperCase())!==-1){
        $('#userFilterList').append(`
        <li class="collection-item avatar">
        <img class='col s4 m2 circle' width=100px class="circle" src= ${user.foto} />
        <span class='title col s6 m10'> ${user.nombre} </span>
        <button class='btn-small col s2 m2' value= ${user.uid} onclick= "followPeople()"><i class="material-icons white-text">group_add</i></li></button>
        </li>
        `);
      }
    })
})

//funciones para los botones de redireccionamiento
document.getElementById('signOut').addEventListener('click', closeSession);
//funcion para cerrar sesion


document.getElementById('btn-search').addEventListener('click', redirectSearch);
document.getElementById('btn-home').addEventListener('click', redirectHome);
document.getElementById('btn-notification').addEventListener('click', redirectNotification);


document.getElementById('home').style.display = 'none';
document.getElementById('search').style.display = 'none';
document.getElementById('myNotifications').style.display = 'none';
document.getElementById('userProfile').style.display = 'block';


document.getElementById('btn-userProfile').addEventListener('click', redirectProfile);


// fin DOM