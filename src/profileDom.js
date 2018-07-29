// Inicializando  Firebase
initFirebase();
let userUID = localStorage.currentUser;
const muroPosts = document.getElementById('myPosts');
welcomeUser(userUID);


//escribiendo publicaciones
document.getElementById('savePost').addEventListener("click", savePost)


//mostrando la lista de usuarios registrados por busqueda
// document.getElementById('searchText').addEventListener('input', () =>{
//   let wordSearch = document.getElementById('searchText').value;
// })

document.getElementById('buttonSearch').addEventListener('click', ()=>{
    userFilterList();
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