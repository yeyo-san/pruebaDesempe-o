import { Router } from "./Router";

function app(){
    const $container = document.getElementById('root');

    if(!$container){
        alert('No ha sido posible cargar la pagina, vuelve mas tarde');
    }

    Router()
}

document.addEventListener('DOMContentLoaded', app)