import { navigateTo } from "../../../Router";

export function editPage(){
    const $content = /*html*/ `
        <form>
            <input type="number" id="numberF" disabled placeholder="Ingrese numero del vuelo">
            <input type="text" id="origin" disabled placeholder="Origen del vuelo">
            <input type="text" id="destination" disabled placeholder="Destino">
        
            <label for="departure">Dia de salida:</label>
            <input type="date" id="departure">
            <label for="arrival">Dia de llegada</label>
            <input type="date" id="arrival">
            <input type="number" id="capacity" placeholder="Capacidad del vuelo">
            <input type="submit" value="Finalizar Edicion">
        </form>
    `;

    const logic = async () => {
        const params = window.location.search;
        const convertParams = new URLSearchParams(params);
        const productId = convertParams.get('flightId');

        const $submit = document.getElementsByTagName('form')[0];
        const $numberFlight = document.getElementById('numberF');
        const $origin = document.getElementById('origin');
        const $destination = document.getElementById('destination');
        const $departure = document.getElementById('departure');
        const $arrival = document.getElementById('arrival');
        const $capacity = document.getElementById('capacity');

        try{
            const flight = await fetch (`http://localhost:4000/flights/${productId}`)

            if(!flight){
                throw new Error('No es posible obtener la informacion del vuelo que deseas editar, vuelve mas tarde')
            }

            const flightToJson = await flight.json();

            $numberFlight.value = flightToJson.number;
            $origin.value = flightToJson.origin;
            $destination.value = flightToJson.destination;
            $departure.value = flightToJson.departure;
            $arrival.value = flightToJson.arrival;
            $capacity.value = flightToJson.capacity;

        }catch(error){
            alert(error)
        }

        $submit.addEventListener('submit', async e =>{
            e.preventDefault();

            const updateFlight = {
                number: $numberFlight.value,
                origin: $origin.value,
                destination: $destination.value,
                departure: $departure.value,
                arrival: $arrival.value,
                capacity: $capacity.value       
            }

            try{
                const update = await fetch(`http://localhost:4000/flights/${productId}`,{
                    method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateFlight)
                })

                if(!update.ok){
                    throw new Error('No ha sido posible editar el vuelo, intentalo mas tarde')
                }

                localStorage.removeItem('temporal_token')
                alert('Producto editado con exito');
                navigateTo('/home/all')
            }catch(error){
                alert(error)
            }
        })
        
    }
    
    return { html: $content, logic}
}