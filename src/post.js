// Funcion para agregar publicación 
console.log("heydy");
console.log(firebase.auth().currentUser); 
// document.getElementById("userEmail").innerHTML = "azucena";
document.getElementById("close").addEventListener("click", close);
// document.getElementById("userEmail").innerHTML = "hola " + email;

// var usuario = firebase.auth().currentUser;
//     console.log(usuario)

document.getElementById("btnPost").addEventListener("click", savePost)
userpost = 'TAS6EO8lhdU31PYAdFzA4dl69Cl1';

function savePost(userpost) {
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