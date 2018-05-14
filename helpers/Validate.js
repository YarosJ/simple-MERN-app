export default function validateField(fieldName, value) {

    switch (fieldName) {
        case 'email':
            let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            return emailValid ? '' : ' is invalid';
        case 'password':
            let passwordValid = value.length >= 6;
            return passwordValid ? '' : "Password haven't to be less then 6 characters";
        default:
            break;
    }
}
