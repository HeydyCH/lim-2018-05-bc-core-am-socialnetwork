let sugerir = document.getElementById('sugerencias');
var itemMin8 = document.createElement('li');
itemMin8.innerHTML = 'minimo 8 caracteres';
var itemUpper = document.createElement('li');
itemUpper.innerHTML = 'debe contener una mayuscula';
var itemLower = document.createElement('li');
itemLower.innerHTML = 'debe contener una minuscula';
var itemNum = document.createElement('li');
itemNum.innerHTML = 'debe contener un numero';
sugerir.appendChild(itemMin8);
sugerir.appendChild(itemUpper);
sugerir.appendChild(itemLower);
sugerir.appendChild(itemNum);
document.getElementById("register").disabled = true;
document.getElementById('email2').addEventListener('input', () =>{
  let myInput = document.getElementById('email2').value;
  valido = document.getElementById('emailOK');
  emailValidator(myInput) ? valido.innerHTML = "\u2714" : valido.innerHTML ="\u2718";
});
document.getElementById('name').addEventListener('input', () => {
  let myInput = document.getElementById('name').value;
  valido = document.getElementById('nameOK');
  nameValidator(myInput) ? valido.innerHTML = "\u2714" : valido.innerHTML ="\u2718";
});
document.getElementById('password2').addEventListener('input', () => {
  validoEmail = document.getElementById('emailOK');
  valido = document.getElementById('passwordOK');
  sugerir = document.getElementById('sugerencias');
});
