import { navigateTo } from "../../../Router";

//Funcion que cargara el contenido
export function loginPage(){
    const $content = document.getElementById('root');
    $content.innerHTML = /*html*/ `
        <section>
            <h1>Login</h1>
            <form>
                <label for="email">Email</label>
                <input type="email" id="email">
                <label for="password">Password</label>
                <input type="password" id="password">
                <button type="submit">Login</button>
            </form>
            <a href="/register">¿No tienes cuenta aún? <br> ¡Registrate!</a>
        </section>
    `

    //logica del login
    const logic = () => {
        //cojo los valores de los datos ingresados por el usuario para trabajar con ellos
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');
        const $submit = document.getElementsByTagName('form')[0];
        const url = 'http://localhost:4000/users';
        const urlRoles = 'http://localhost:4000/userRoles'

        //si el ursuario intenta ingresar iniciara esta logica
        $submit.addEventListener('submit', async e => {
            e.preventDefault()
            try{
                if(!$email.value || !$password.value){
                    throw new Error('Todos los campos son requeridos')
                }

                const getUsers = await fetch(url);

                if(!getUsers){
                    throw new Error('No se pudo conectar con el servidor')
                }

                const userToJson = await getUsers.json();
                const userFound = userToJson.find(user => user.email === $email.value && user.password === $password.value);
                
                if(!userFound){
                    throw new Error('Usuario o contraseña incorrectos');
                }

                const getRol = await fetch(urlRoles);

                if(!getRol){
                    throw new Error('Error inesperado, vuelve mas tarde');
                }

                const rolToJson = await getRol.json();
                const roleFound = rolToJson.find(r  => r.id === userFound.rol);
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem('token', token);
                localStorage.setItem('rol', roleFound.id);
                localStorage.setItem('id', userFound.id)

                alert('inicio de sesion exitoso');
                navigateTo('/home')

                
            
            }catch(err){
                alert(err)
            }
        })
    }

    logic();

}