import { navigateTo } from "../../../Router";

export function flightsPage(){
    const $content = /*html*/ `
        <section id="container">

        </section>
    `

    const logic = async () => {
        const $container = document.getElementById('container');
        const rol = localStorage.getItem('rol');
        const url = 'http://localhost:4000/flights'
        const getFlights = await fetch(url);

        if(!getFlights){
            $container.innerHTML = /*html*/  ` 
                <h1>Imposible cargar los vuelos, vuelve mas tarde :C</h1>
            `
            return
        }

        const flightsToJson = await getFlights.json();
        let buttons = undefined;

        flightsToJson.forEach(flights => {
            if(rol === '1'){
                buttons = /*html*/ ` 
                    <button class='edit' data-id=${flights.id}>Editar</button>
                    <button class='delete' data-id=${flights.id}>Eliminar</button>
                ` ;
            }else{
                buttons = /*html*/ ` 
                <button class='booking' data-id=${flights.id}>Reservar</button>
            ` ;
            }


            $container.innerHTML += /*html*/ ` 
                <div>
                    <h1>Vuelo</h1>
                    <p>Origen: ${flights.origin}</p>
                    <p>Destino: ${flights.destination}</p>
                    <p>Dia de salida: ${flights.departure}</p>
                    <p>Dia de llegada: ${flights.arrival}</p>
                    <p>Capacidad: ${flights.capacity}</p>
                    ${buttons}
                </div>
            
            ` 

            const $editBtn = document.getElementsByClassName('edit');
            const $deleteBtn = document.getElementsByClassName('delete');

            for(let f of $editBtn){
                f.addEventListener('click', () => {
                    const temporalToken = Math.random().toString(36).substring(2);
                    localStorage.setItem('temporal_token', temporalToken);

                    navigateTo(`/home/edit?flightId=${f.getAttribute('data-id')} `)
                })
            }

            for( let f of $deleteBtn){
                f.addEventListener('click', async () => {
                    const inputUser = confirm('¿Seguro que deseas eliminar el vuelo?');

                    if(inputUser){
                        try{
                            const deletFlight = await fetch(`http://localhost:4000/flights/${flights.id}`, {
                                method: 'DELETE',
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            });

                            if(!deletFlight.ok){
                                throw new Error('No ha sido posible eliminar el vuelo, intentalo mas tarde')
                            }

                            alert('Vuelo eliminado con exito');
                            window.location.reload()

                        }catch(error){
                            alert(error)
                        }
                    }
                })
            }

            const $bookingBtn = document.getElementsByClassName('booking');
            
            for( let f of $bookingBtn){
                f.addEventListener('click', async () => {
                    const inputUser = confirm('¿Seguro que deseas hacer la reserva?');
                    if(!inputUser){
                        alert('Ta bien papi, sigue con lo tuyo')
                        return
                    }else{
                        try{
                            const bookingDate = prompt("Ingrese la fecha en este formato 'yy-mm-dd'")
                            const userId = localStorage.getItem('id');
                            const createBooking = await fetch('http://localhost:4000/Booking',{
                                method: 'POST',
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    userId: userId,
                                    flightId: f.getAttribute('data-id'),
                                    bookingDate: bookingDate
                                })
                            })

                            if(!createBooking.ok){
                                throw new Error('No es posible crear la reserva, intentelo mas tarde')
                            }

                            alert('Reserva creada exitosamente');

                        }catch(error){
                            alert(error)
                        }
                        return
                    }
                })
            }
        });


    }

    return { html: $content, logic}
}