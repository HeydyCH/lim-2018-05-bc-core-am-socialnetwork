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
}

window.emailValidator = emailValidator;
window.passwordValidator = passwordValidator;
window.nameValidator = nameValidator;
