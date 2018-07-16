// Funcion para agregar publicación 
initFirebase() 
document.getElementById("close").addEventListener("click", close);
document.getElementById("btnPost").addEventListener("click", savePost)
console.log("ya estoy en post")

welcomeUsers();
// mostrarPostUser();

function welcomeUsers() {

    console.log(" bienvenida mamita :) :3 !! ");
    //  Base de datos ACTUAL
    //  -----------------------
    // Mostrando la lista sincronizada de objetos de users-posts

    const preObject = document.getElementById("object");
    const dbRefObject = firebase.database().ref().child('users-posts')
    // console.log(dbRefObject);
    dbRefObject.on('value', snap => {
        preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
    });

    mostrarPostUser(dbRefObject);

    // var user = firebase.auth().currentUser;
    // console.log(user);
    // if (user != null) {
    //     console.log("usuario diferente de null");
    //   user.providerData.forEach(function (profile) {
    //     document.getElementById("userName").innerHTML = profile.displayName;
    //     document.getElementById('userPhoto').innerHTML = "<img width='100px' src='"+profile.photoURL+"  '/>"
    //   });
    // }


    // document.getElementById('inputPost').value = '';
    // const dbRef = firebase.database().ref("users-posts/" + usuarioNew );
    // const newPost = dbRef.push();
    // const dbRef1 = firebase.database().ref("posts/" );
    // const newPost1 = dbRef1.push();
    // newPost.set(post);
    // newPost1.set(post);
    // console.log(usuarioNew);
    // console.log("vaa  entrar a usuario neww ")
    // mostrarPostUser(usuarioNew)

}


function savePost() {
    console.log("guardando mi post")
    const post = {
        contenido: document.getElementById('inputPost').value,
        estado: "feliz"
    };

    console.log(post);
    var usuario = firebase.auth().currentUser;
    var usuarioNew = usuario.uid;
    console.log(usuario)
    console.log(usuarioNew)

    document.getElementById('inputPost').value = '';
    const dbRef = firebase.database().ref("users-posts/" + usuarioNew );
    const newPost = dbRef.push();
    const dbRef1 = firebase.database().ref("posts/" );
    const newPost1 = dbRef1.push();
    newPost.set(post);
    newPost1.set(post);
    console.log("vaa  entrar a usuario neww ")
    // mostrarPostUser(usuarioNew)

}

function close() {
    console.log("saliendo de mi perfil")
    firebase.auth().signOut()
        .then(function () {
            console.log('saliendo ... ')
            document.location.href = 'index.html';
        })
        .catch(function (error) {
            console.log(error);
        })
}

function mostrarPostUser(dbRefObject) {

    console.log("voy a mostrar todos mis posts publicos y privados")
    // console.log(dbRefObject);


    // mostrando el post del usuario logueado 

    // var user = firebase.auth().currentUser;
    const post = document.getElementById('listposts'); 
    var postGroup = dbRefObject.child("6RIYcmOVJhZLIClF3np8OpzYzLp2");
    var postUser = postGroup.child('publicaciones');

    // ***********************************
    // var profile = firebase.database().ref().child('users/'+user.uid);
    var profile = firebase.database().ref().child('users/');
    var postGroupprofile = profile.child("6RIYcmOVJhZLIClF3np8OpzYzLp2");

    postGroupprofile.on('value', snap => {
      let userData = JSON.stringify(snap.val(),null,3);//tbm funciona un solo parametro
      userData = JSON.parse(userData);
      console.log(userData);
      console.log(userData.nombre);
      document.getElementById("userName").innerHTML = userData.nombre;
    //   document.getElementById('userPhoto').innerHTML = "<img width='100px' src='"+userData.foto+"  '/>";
    })

    // const dbRefObjectUsers = firebase.database().ref().child('users')
    // var postGroupUsers = dbRefObjectUsers.child("6RIYcmOVJhZLIClF3np8OpzYzLp2");
    var nameUser = document.getElementById('name');
    nameUser.innerHTML= "hola mundo";

    // postGroupUsers.on('child_added', snap => {
    //     console.log("entroooooooooooooooooooo")
    //     console.log(snap.val());
    //     var objPost1 = snap.val();

    //     if (objPost1.hasOwnProperty('nombre')) {
    //         const p = document.createElement('p');
    //         // p.innerText = snap.val();
    //         nameUser.innerHTML=objPost1.nombre;
    //         console.log(snap.key);
    //     }
    // })

// ***********************************

    // Sincronizar los cambios del objecto

    // *********************** 
    postGroup.on('child_added', snap => {
        // console.log(snap.val());
        var objPost = snap.val();
        // console.log(objPost.contenido);
        // console.log("holiiiiiii")

        if (objPost.hasOwnProperty('contenido')) {
            const p = document.createElement('p');
            // p.innerText = snap.val();
            p.innerHTML = `
            <div class="container mt-5">
            <div class="alert alert-success" role="alert">
            <h5 class="alert-heading">Bienvenido ${objPost.contenido}!!</h5>
            </div>
            </div>`;
            // console.log(snap.key);
            p.id = snap.key;
            post.appendChild(p);
        }



    })

    postGroup.on('child_changed', snap => {
        const pChanged = document.getElementById(snap.key);
        pChanged.innerHTML = snap.val();
    })

    postGroup.on('child_changed', snap => {
        const pToRemove = document.getElementById(snap.key);
        pToRemove.remove();
    })

    postGroup.on('child_changed', snap => {
        const pChanged = document.getElementById(snap.key);
        pChanged.innerHTML = snap.val()
    })


}