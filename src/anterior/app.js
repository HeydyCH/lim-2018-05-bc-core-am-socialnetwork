//valida la dirección de correo electrónico y la contraseña
const emailValidator = (string) => {
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    emailRegex.test(string) ? answer = true : answer = false;
    return answer;
}

const nameValidator = (string) => {
    nameRegex = /^.{8,}$/;
    nameRegex.test(string) ? answer = true : answer = false;
    return answer;
}

const passwordValidator = (string) => {
    passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    passwordRegex.test(string) ? answer = true : answer = false;
    return answer;
    //MOSTRANDO SUGERENCIAS
    // /^(?=.*\d).{1,}$/.test(campo.value) ? valuesGood(itemNum): sugerir.appendChild(itemNum);
    // /^(?=.*[A-Z]).{1,}$/.test(campo.value) ? valuesGood(itemUpper): sugerir.appendChild(itemUpper);
    // /^(?=.*[a-z]).{1,}$/.test(campo.value) ? valuesGood(itemLower): sugerir.appendChild(itemLower);
    // /^.{8,}$/.test(campo.value) ? valuesGood(itemMin8): sugerir.appendChild(itemMin8);
    //
    // if (passwordRegex.test(campo.value)) {
    //   valido.innerText = "\u2714";
    //   if(validoEmail = "\u2714") {
    //     document.getElementById("register").disabled = false;
    //   }
    // } else {
    //   valido.innerText = "\u2718";
    //   document.getElementById("register").disabled = true;
    // }
}
const valuesGood = (myNode) => {
  for(let i=0; i<=3; i++){
    if(sugerir.childNodes[i] == myNode) {
      sugerir.removeChild(sugerir.childNodes[i]);
    }
  }
}
window.emailValidator = emailValidator;
window.passwordValidator = passwordValidator;
window.valuesGood = valuesGood;
window.nameValidator = nameValidator;
