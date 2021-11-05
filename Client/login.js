const URL = 'http://localhost:3000/login/';

let response = document.getElementById('response')
let password = document.getElementById('password')
let email = document.getElementById('email')
let send = document.getElementById('send')

const sanitaze = () => {
    email.value = ''
    password.value = ''
}

send.addEventListener('click', () => {
    if (password.value && email.value) {
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
            sanitaze()
        }).catch((err) => {
            // There was an error
            console.warn('Il y a eu une erreur', err);
        });
    }
})


sanitaze()