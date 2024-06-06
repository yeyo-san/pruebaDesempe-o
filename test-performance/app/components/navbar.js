import { navigateTo } from "../Router";

//exportamos el componente navbar
export function navbar(){
    const $content = /*html*/ `
        <h1>Home</h1>

        <div>
            <a id="logOut">LogOut</a>
        </div>

        <nav id='container'>
                            
        </nav>
    `;

    const logic = () =>{
        const $container = document.getElementById('container');
        const rol = localStorage.getItem('rol');

        if(rol === '1'){
            $container.innerHTML = /*html*/ `
                <a href="/home/create">Crear vuelos</a>
                <a href="/home/all">Todos los vuelos</a>
            `
        }else{
            $container.innerHTML = /*html*/ `
                <a href="/home/all">Todos los vuelos</a>
            `
        }

        const $logOut = document.getElementById('logOut')

        $logOut.addEventListener('click', () =>{

            localStorage.removeItem('token');
            localStorage.removeItem('rol');
            navigateTo('/')
        })
    } 
    
    return { html: $content, logic}
}