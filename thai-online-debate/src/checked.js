import Swal from 'sweetalert2'


export function user_validation(username, min ,max) {
    var username_len = username.length;
    if (username_len == 0 || username_len < min || username_len > max) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("Username cannot be blank /lenght between " + min + " to " + max)
          })
        return false;
    }
    return true;
}
//pass
export function password_validation(password, min ,max) {
    var password_len = password.value.length;
    if (password_len == 0 || password_len < min || password_len > max) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("Password cannot be blank /lenght between " + min + " to " + max)
          })
        password.focus();
        return false;
    }
    return true;
}
//letter
export function allletter(inputtxt) {
    var letters = /^[A-Za-z]+$/;
    if(inputtxt.value.match(letters)) {
        return true;
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:("Please "+ inputtxt.placeholder + " with alphabet characters only")
        })
        inputtxt.focus();
        return false;
    }
}

//mail
export function email_validation(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        return true;
    }
    else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ("You have entered an invalid email address!")
        })
        email.focus();
        return false;
    }
}
//country
export function country_validation(country) {
    if (country.value == "") {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:("Please Select your country")
    })
        country.focus();
        return false;
    }
    return true;
}
//zip
export function zip_validation(zip) {
    var numbers = /^[0-9]+$/;
    if (zip.value.match(numbers)) {
        return true;
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:("Zip cannot be blank / numbers only")
        })
        zip.focus();
        return false;
    }
}
//language
export function language_validation(language) {
    if (language[0].checked || language[1].checked) {
        return true;
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:("Please select your language")
        })
        return false;
        
    }

}
//gender
export function gender_validation(gender) {
    if (gender[0].checked || gender[1].checked || gender[2].checked) {
        return true;
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:("Please select your gender")
        })
        return false;
        
    }
}
