initFirebase();

document.getElementById("login").addEventListener("click", () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  login(email, password)
});

document.getElementById("userRegister").style.display = "none";

document.getElementById("registerUser").addEventListener("click", () => {
  document.getElementById("userLogin").style.display = "none";
  document.getElementById("userRegister").style.display = "block";
});

document.getElementById("register").addEventListener("click", ()=>{
  var email = document.getElementById('email2').value;
  var password = document.getElementById('password2').value;
  let name = document.getElementById('name').value;

  userRegister(email,password,name)
})

$('#loginGoogle').click(function(){
  userRegisterGoogle()
});

$('#loginFacebook').click(function(){
  userRegisterFacebook()
})

document.getElementById('returnHome').addEventListener("click", () => {
  document.getElementById("userLogin").style.display = "block";
  document.getElementById("userRegister").style.display = "none";
})