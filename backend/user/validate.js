
const { message } = require('./constant');

function validateEmail(email){
    const regExEmail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(!regExEmail.test(email.trim())){
      return message.invalid_email;
    }
    else{
      return '';
    }
}

function validateMobileNumber(mobile){
    const regExMobile= /^\d{10}$/;
    if(!regExMobile.test(mobile)){
        return message.invalid_mobile_number;
    }
    else{
        return '';
    }
}

module.exports = { validateEmail,validateMobileNumber };