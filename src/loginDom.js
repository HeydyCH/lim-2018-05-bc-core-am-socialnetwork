initFirebase();
document.getElementById("userRegister").style.display = "none";
document.getElementById("emailNormalAccess").addEventListener("change", () => {
  email = document.getElementById('emailNormalAccess').value;
});
document.getElementById("passwordNormalAccess").addEventListener("change", () => {
  password = document.getElementById('passwordNormalAccess').value;
});
document.getElementById("emailRegisterAccess").addEventListener("change", () => {
  emailRegister = document.getElementById('emailRegisterAccess').value;
});
document.getElementById("passwordRegisterAccess").addEventListener("change", () => {
  passwordRegister = document.getElementById('passwordRegisterAccess').value;
});
document.getElementById("login").addEventListener('click', ()=>{
  loginNormalAccess(email, password);
});
let providerGoogle = new firebase.auth.GoogleAuthProvider();
$('#loginGoogle').click(()=>loginWithProvider(providerGoogle));
let providerFb = new firebase.auth.FacebookAuthProvider();
$('#loginFacebook').click(()=>loginWithProvider(providerFb));
$('#register').click(() => userRegister(emailRegister, passwordRegister));
//enlace para ir a registrarte
$('#registerUser').click(()=>{
  document.getElementById("userLogin").style.display = "none" ;
  document.getElementById("userRegister").style.display = "block" ;
});
//boton para regresar a iniciar sesion
$('#returnHome').click(()=>{
  document.getElementById("userLogin").style.display = "block" ;
  document.getElementById("userRegister").style.display = "none" ;
});
