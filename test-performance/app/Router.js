import { routes } from "./routes";
import { layout } from "./components/layout";

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path);
    Router()
}

//Funcion para manejar las rutas
export function Router(){
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    const publicRoute = routes.public.find(r => r.path === path);
    const privateRoute = routes.private.find(r => r.path === path);

    if(path === '/' || path === '/register'){
        if( localStorage.getItem('token')){
            navigateTo('/home');
            return 
        }
    }

    if(path === '/home/edit' || path === '/home/create'){
        if(localStorage.getItem('rol') != '1'){
            navigateTo('/home')
            return
        }
    }

    if(path === '/home/edit'){
        if(!localStorage.getItem('temporal_token')){
            navigateTo('/home')
            return
        }
    }

    if(publicRoute){
        const $content = publicRoute.page();
        navigateTo($content + params);
    }else if(privateRoute){
        if(!localStorage.getItem('token')){
            navigateTo('/')
        }
        const { html: $content, logic} = privateRoute.page();
        layout($content, logic);
    }else{
        navigateTo('/not-found')
    } 
}


window.onpopstate = Router;