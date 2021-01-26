
const users = [
    {
        email: 'camilo@gmail.com' ,
        password: 'secret'
    },
    {
        email: 'yauris@gmail.com' ,
        password: 'secret2'
    },
    {
        email: 'zuleidy@gmail.com' ,
        password: 'secret3'
    }

];

// const getUsers = localStorage.getItem('users');

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find((user) => user.email === email && user.password === password);

    if(user) {
        // alert('puede entrar al sistema')
        window.location.replace("/api.html");
        
    } else {
        
        alert('Usuario y/o contraseña incorrecta')
    }
}

