export function homePage(){
    const $content = /*html*/ `
        <h1 id="nameContainer"></h1>
    `

    const logic = () => {
        console.log('hola');
    }

    return { html: $content, logic}
}