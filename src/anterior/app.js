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
//valida la dirección de correo electrónico y la contraseña
document.getElementById('email2').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('emailOK');
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
      valido.innerText = "\u2714";
    } else {
      valido.innerText = "\u2718";
    }
});
document.getElementById('password2').addEventListener('input', function() {
    campo = event.target;
    validoEmail = document.getElementById('emailOK');
    valido = document.getElementById('passwordOK');
    sugerir = document.getElementById('sugerencias');
    //8 caracteres minimo, una mayuscula, un numero, una minuscula
    passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    //MOSTRANDO SUGERENCIAS
    /^(?=.*\d).{1,}$/.test(campo.value) ? valuesGood(itemNum): sugerir.appendChild(itemNum);
    /^(?=.*[A-Z]).{1,}$/.test(campo.value) ? valuesGood(itemUpper): sugerir.appendChild(itemUpper);
    /^(?=.*[a-z]).{1,}$/.test(campo.value) ? valuesGood(itemLower): sugerir.appendChild(itemLower);
    /^.{8,}$/.test(campo.value) ? valuesGood(itemMin8): sugerir.appendChild(itemMin8);

    if (passwordRegex.test(campo.value)) {
      valido.innerText = "\u2714";
      if(validoEmail = "\u2714") {
        document.getElementById("register").disabled = false;
      }
    } else {
      valido.innerText = "\u2718";
      document.getElementById("register").disabled = true;
    }
});
document.getElementById("register").disabled = true;
function valuesGood(myNode) {
  for(let i=0; i<=3; i++){
    if(sugerir.childNodes[i] == myNode) {
      sugerir.removeChild(sugerir.childNodes[i]);
    }
  }
}
