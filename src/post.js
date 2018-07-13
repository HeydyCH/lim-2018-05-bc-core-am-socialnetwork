// Funcion para agregar publicación 
document.getElementById("close").addEventListener("click", close);
console.log("ya estoy en post")

document.getElementById("btnPost").addEventListener("click", savePost)
userpost = 'TAS6EO8lhdU31PYAdFzA4dl69Cl1';
mostrarPostUser();

function savePost() {
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
    const dbRef = firebase.database().ref('users/' + usuarioNew + '/publicaciones');
    const newPost = dbRef.push();
    newPost.set(post);

}

function close() {
    firebase.auth().signOut()
        .then(function () {
            console.log('saliendo ... ')
            document.location.href = 'index.html';
        })
        .catch(function (error) {
            console.log(error);
        })
}

function mostrarPostUser() {

    //Base de datos
    console.log("Estoy en el posts.js")

    //obtener Elementos
    const preObject = document.getElementById("object");
    const post = document.getElementById('listposts');

    //Creando la Referencia para realtime
    const dbRefObject = firebase.database().ref().child('users')
    var postGroup = dbRefObject.child('lbHV7768RYQvvrwr9N8OhG3czqS2');
    var postUser = postGroup.child('publicaciones');

    // Sincronizar los cambios del objecto

    // *********************** 

    dbRefObject.on('value', snap => {
        preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
    });

    postGroup.on('child_added', snap => {
        console.log(snap.val());
        var objPost = snap.val();
        console.log(objPost.contenido);

        if (objPost.hasOwnProperty('contenido')) {
            const p = document.createElement('p');
            // p.innerText = snap.val();
            p.innerHTML = `
            <div class="container mt-5">
            <div class="alert alert-success" role="alert">
            <h5 class="alert-heading">Bienvenido ${objPost.contenido}!!</h5>
            </div>
            </div>`;
            console.log(snap.key);
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