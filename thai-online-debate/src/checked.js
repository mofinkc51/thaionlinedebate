import Swal from 'sweetalert2'

export function special_char(text) {
    if (!/^[a-zA-Z0-9\sก-๙!@#$%^&*()-_+{}\[\]:;<>,.?~\\/]*$/.test(text)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'กรุณากรอกข้อมูลที่เป็นตัวอักษรภาษาอังกฤษ ภาษาไทย หรือตัวเลขเท่านั้น'
          })
        return false;
    } else {
        return true;
    }
}
export function user_validation(username, min ,max) {
    var username_len = username.length;
    if (username_len == 0 || username_len < min || username_len > max) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("Username must be lenght between " + min + " to " + max)
          })
        return false;
    }
    return true;
}
//pass
export function password_validation(password, min ,max) {
    var password_len = password.length;
    if (password_len == 0 || password_len < min || password_len > max) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("Password must be lenght between " + min + " to " + max)
          })
        return false;
    }
    return true;
}

export function text_validation(text, min ,max) {
    var text_len = text.length;
    if (text_len == 0 || text_len < min || text_len > max) {

        return false;
    }
    return true;
}
export function phone_validation(phone) {
    var phone_len = phone.length;
    if (phone_len == 0) {
        return true;
    }
    if (phone_len > 10 || phone_len < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("Phone number must be 10 digits")
          })
        return false;
    }
    return true;
}
//letter
export function allletter(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    if(inputtxt.match(letters)) {
        return true;
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:("Please "+ inputtxt.placeholder + " with alphabet characters only")
        })
        return false;
    }
}

//mail
export function email_validation(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    }
    else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("You have entered an invalid email address!")
        })
        return false;
    }
}