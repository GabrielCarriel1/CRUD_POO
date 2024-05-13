import {RegularClient, VipClient} from './client.js'

//AGREGAR CLIENTE
const form = document.getElementById('client-form')
form.addEventListener('submit', function(event){
    event.preventDefault()

    const nombre = document.getElementById('client-name').value
    const apellido = document.getElementById('client-lastname').value
    const cedula = document.getElementById('client-ced').value
    const radioCheck = document.getElementById('regularRadio')
    console.log(JSON.stringify(nombre))

    if(radioCheck.checked){
        const descCheck = document.getElementById('desc')
        let card = descCheck.checked

        //Instanciar nuevo cliente
        let cliente = new RegularClient(nombre, apellido, cedula, card)
        let clientes = JSON.parse(localStorage.getItem('clientes'))
        clientes.push(cliente)

        //Guardar en localStorage
        const clientesJson = JSON.stringify(clientes)
        localStorage.setItem('clientes',clientesJson)
    }
    else{
        const limite = document.getElementById('limit').value

        //Instanciar nuevo cliente
        let cliente = new VipClient(nombre, apellido, cedula, limite)
        let clientes = JSON.parse(localStorage.getItem('clientes'))
        clientes.push(cliente)

        //Guardar en localStorage
        const clientesJson = JSON.stringify(clientes)
        localStorage.setItem('clientes',clientesJson)
    }

})
