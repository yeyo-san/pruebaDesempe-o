export function not_foundPage(){
    const $content = document.getElementById('root');
    $content.innerHTML = /*html*/ `
        <h1>404 not found</h1>
        <p>Esto no existe papo</p>
    `
    const logic = () =>{
        console.log('hola nico');
    }
    
    logic()
}