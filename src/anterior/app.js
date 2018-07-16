//valida la dirección de correo electrónico y la contraseña
document.getElementById('email').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('emailOK');
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
      valido.innerText = "válido";
    } else {
      valido.innerText = "incorrecto";
    }
});
document.getElementById('password').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('passwordOK');
    //8 caracteres minimo, una mayuscula, un numero, una minuscula
    passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (passwordRegex.test(campo.value)) {
      valido.innerText = "válido";
      document.getElementById("btnValidate").disabled = false;
    } else {
      valido.innerText = "incorrecto";
      document.getElementById("btnValidate").disabled = true;
    }
});
