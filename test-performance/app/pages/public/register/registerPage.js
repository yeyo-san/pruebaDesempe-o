import { navigateTo } from "../../../Router";

export function registerPage(){
    const $content = document.getElementById('root');
    $content.innerHTML = /*html*/ `
        <section>
            <h1>Register</h1>
    
            <form>
                <label for="name">Nombre</label>
                <input type="text" id="name">
    
                <label for="email">Email</label>
                <input type="email" id="email">

                <label for="birthdate">Ingresa tu cumpleaños</label>
                <input type="date" id="birthdate">
    
                <label for="password">Password</label>
                <input type="password" id="password">
                <label for="passwordRepeat">Ingresa nuevamente la contraseñ
                <input type="password" id="passwordRepeat">
                <input type="hidden" value="2">
                    
    
                <button type="submit" >Register</button>
    
                <a href="/">Si ya tienes cuenta ¡Inicia sesion!</a>
                </form>
        </section>
    `

    const $submit = document.getElementsByTagName('form')[0];
    const $birthdDate = document.getElementById('birthdate');
    const $name = document.getElementById('name');
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');
    const $passwordRepeat = document.getElementById('passwordRepeat');
    const $rol = document.querySelector('[type = "hidden"]');
    const url = 'http://localhost:4000/users'
    
    const logic = () => {
        $submit.addEventListener('submit', async e => {
            e.preventDefault();

            try{
                if(!$email.value || !$password.value || !$name.value || !$birthdDate.value || !$passwordRepeat.value){
                    throw new Error('Todos los campos son requeridos')
                }

                if($password.value != $passwordRepeat.value){
                    throw new Error('Las contraseñas deben coincidir')
                }

                const userValidator = await fetch(url);

                if(!userValidator){
                    throw new Error('Error al validar el usuario');
                }

                const userValidatorToJson = await userValidator.json();
                const verifyIfUserAlreadyExist = userValidatorToJson.find( user => user.email === $email.value);

                if(verifyIfUserAlreadyExist){
                    throw new Error('El usuario ya existe');
                }

                const createUser = await fetch(url, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: $name.value,
                        email: $email.value,
                        birthDate: $birthdDate.value,
                        password: $password.value,
                        rol: $rol.value
                    })
                });

                if(!createUser.ok){
                    throw new Error('Error al crear el usuario, vuelve mas tarde')
                }

                alert('Registro exitoso');
                navigateTo('/');

            }catch(err){
                alert(err)
            }
        })
    }
    logic()
}