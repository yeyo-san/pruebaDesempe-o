export function createPage(){
    const $content = /*html*/ `
        <form>
            <input type="number" id="numberF" placeholder="Ingrese numero del vuelo">
            <input type="text" id="origin" placeholder="Origen del vuelo">
            <input type="text" id="destination" placeholder="Destino">
            
            <label for="departure">Dia de salida:</label>
            <input type="date" id="departure">

            <label for="arrival">Dia de llegada</label>
            <input type="date" id="arrival">
            <input type="number" id="capacity" placeholder="Capacidad del vuelo">

            <input type="submit" value="Crear">
        </form>
    `

    const logic = () => {
        const $submit = document.getElementsByTagName('form')[0];
        const $numberFlight = document.getElementById('numberF');
        const $origin = document.getElementById('origin');
        const $destination = document.getElementById('destination');
        const $departure = document.getElementById('departure');
        const $arrival = document.getElementById('arrival');
        const $capacity = document.getElementById('capacity');
        const url = 'http://localhost:4000/flights';

        $submit.addEventListener('submit', async e =>{
            e.preventDefault()

            if(!$numberFlight.value || !$origin.value || !$destination.value || !$departure.value || !$arrival.value || !$capacity.value){
                alert('Todos los campos son requeridos para continuar')
                return
            }

            if(!$arrival.value < $departure.value ){
                alert('La fecha de llegada debe ser mayor a la fecha de la salida.');
            }

            try{
                const createFlight = await fetch(url,{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number: $numberFlight.value,
                        origin: $origin.value,
                        destination: $destination.value,
                        departure: $departure.value,
                        arrival: $arrival.value,
                        capacity: $capacity.value
                    })
                });

                if(!createFlight.ok){
                    throw new Error('No ha sidfo posible crear el vuelo, regresa mas tarde')
                }

                alert('Vuelo creado exitosamente');
                window.location.reload()
            }catch(error){
                    alert(error)
            }    
        })
    }

    return { html: $content, logic}
}