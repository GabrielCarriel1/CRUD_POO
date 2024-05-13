import {RegularClient, VipClient} from './client.js'

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
        let cliente = new RegularClient(nombre, apellido, cedula, card)
        const clienteJson = JSON.stringify(cliente)
        console.log(clienteJson)
        localStorage.setItem('cliente',clienteJson)
    }
    else{
        const limite = document.getElementById('limit')
        let cliente = new VipClient(nombre, apellido, cedula)
        cliente.limit(limite)
        const clienteJson = JSON.stringify(cliente)
        localStorage.setItem('cliente',clienteJson)
    }

})
