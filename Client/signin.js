const URL = 'http://localhost:3000/signin/';

let response = document.getElementById('response')
let password = document.getElementById('password')
let email = document.getElementById('email')
let send = document.getElementById('send')
let error_email = document.getElementsByClassName('error-email')[0]
let error_password = document.getElementsByClassName('error-password')[0]
let valid_password = false
let valid_email = false

password.addEventListener('input', (dom) => {
    const reg = [/^.{8,}$/ , /^(.*[A-Z].*)$/, /^(.*[a-z].*)$/, /^(.*\d.*)$/, /^(.*[!@#\$%\^&\*].*)$/]
    let li = document.getElementsByTagName('li')
    let passwordValue = dom.target.value
    let error = 0;

    
    for (let i = 0; i < reg.length; i++) {
        if (reg[i].test(passwordValue)) {
            li[i].classList.remove('red')
            li[i].classList.add('green')
        } else {
            li[i].classList.add('red')
            li[i].classList.remove('green')
            error = error + 1;
        }
    }

    if (!error) {
        error_password.classList.add('hide')
        valid_password = true
    } else {
        error_password.classList.remove('hide')
        valid_password = false
    }
})

email.addEventListener('input', (dom) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailValue = dom.target.value

    if (re.test(String(emailValue).toLowerCase())) {
        error_email.classList.add('hide')
        valid_email = true
    } else {
        error_email.classList.remove('hide')
        valid_email = false
    }
})

send.addEventListener('click', () => {
    if (valid_email && valid_password) {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((res) => {
            // The API call was successful!
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            // This is the JSON from our res
            console.log(data);
            response.innerHTML = data.response
        }).catch((err) => {
            // There was an error
            console.warn('Il y a eu une erreur', err);
        });
    }
})

const sanitaze = () => {
    email.value = ''
    password.value = ''
}


sanitaze()