import {RegularClient, VipClient} from './client.js'

document.addEventListener('DOMContentLoaded', function(){
    const clientsTable = document.getElementById('clients-table').getElementsByTagName('tbody')[0]
    const clients = JSON.parse(localStorage.getItem('clientes'))
    clients.forEach(function(client){
        const row = clientsTable.insertRow()
        const nameCell = row.insertCell()
        nameCell.textContent = client.firstname
        const lastnameCell = row.insertCell()
        lastnameCell.textContent = client.lastname
        const cedCell = row.insertCell()
        cedCell.textContent = client._ced
        const typeCell = row.insertCell()
        typeCell.textContent = Object.keys(client).length > 4 ? 'Cliente Regular' : 'Cliente VIP'
        const valueCell = row.insertCell()
        if (Object.keys(client).length > 4){
            valueCell.textContent = (client._discount*100)+'%'
        }
        else{
            valueCell.textContent = '$'+client.limit
        }
    })
})

//AGREGAR CLIENTE
const form = document.getElementById('client-form')
form.addEventListener('submit', function(event){
    event.preventDefault()
    const nombre = document.getElementById('client-name').value
    const apellido = document.getElementById('client-lastname').value
    const cedula = document.getElementById('client-ced').value
    const radioCheck = document.getElementById('regularRadio')
    let clientes = JSON.parse(localStorage.getItem('clientes'))
    if (validarCedula(cedula)){
        if(clientes.find(cliente => cliente._ced === cedula)){
            mensajeError('Esta cédula ya está registrada. Pruebe con otra', cedula)
        }
        else{
            if(radioCheck.checked){
                const descCheck = document.getElementById('desc')
                let card = descCheck.checked
        
                //Instanciar nuevo cliente
                let cliente = new RegularClient(nombre, apellido, cedula, card)
                clientes.push(cliente)
        
                //Guardar en localStorage
                const clientesJson = JSON.stringify(clientes)
                localStorage.setItem('clientes',clientesJson)
            }
            else{
                const limite = document.getElementById('limit').value
        
                //Instanciar nuevo cliente
                let cliente = new VipClient(nombre, apellido, cedula, limite)
                clientes.push(cliente)
        
                //Guardar en localStorage
                const clientesJson = JSON.stringify(clientes)
                localStorage.setItem('clientes',clientesJson)
            }
        }
    }
    else{
        mensajeError('Cédula invalida')
    }
    location.reload()
})

//Actualizar Cliente
const btnActualizar = document.getElementById('btn-actualizar')
const updSelect = document.getElementById('upd-select')
const updateClient = document.getElementById('actualizar-cliente')

btnActualizar.addEventListener('click', function(){
    const clientes = JSON.parse(localStorage.getItem('clientes'))

    clientes.forEach(function(cliente, index){
        const option = document.createElement('option')
        option.text = cliente._ced
        option.value = index
        updSelect.add(option)
    })
})
updSelect.addEventListener('change', function(){
    const clients = JSON.parse(localStorage.getItem('clientes'))
    const clientIndex = updSelect.value
    let client = clients[clientIndex]
    document.getElementById('upd-name').value = client.firstname
    document.getElementById('upd-last').value = client.lastname
    const descInput = document.getElementById('upd-desc-input')
    const limitInput = document.getElementById('upd-limit')
    if(Object.keys(client).length > 4){
        descInput.style.display = 'block'
        limitInput.style.display = 'none'
        document.getElementById('upd-desc').checked = (client._discount == 0.1) ? true : false
    }
    else{
        descInput.style.display = 'none'
        limitInput.style.display = 'block'
        limitInput.value = client.limit
    }
})
updateClient.addEventListener('click', function(){
    const clients = JSON.parse(localStorage.getItem('clientes'))
    const clientIndex = updSelect.value
    let client = clients[clientIndex]
    client.firstname = document.getElementById('upd-name').value
    client.lastname = document.getElementById('upd-last').value
    if(Object.keys(client).length > 4){
        client.card = (document.getElementById('upd-desc').checked) ? true : false
        client._discount = (client.card) ? 0.1 : 0
    }else{
        client.limit = document.getElementById('upd-limit').value
    }
    localStorage.setItem('clientes', JSON.stringify(clients))
    location.reload()
})


//Eliminar Cliente
const btnEliminar = document.getElementById('btn-eliminar')
const delSelect = document.getElementById('del-select')
const deleteClient = document.getElementById('eliminar-cliente')

btnEliminar.addEventListener('click', function(){
    const clientes = JSON.parse(localStorage.getItem('clientes'))

    clientes.forEach(function(cliente, index){
        const option = document.createElement('option')
        option.text = cliente._ced
        option.value = index
        delSelect.add(option)
    })
})
delSelect.addEventListener('change', function(){
    const clients = JSON.parse(localStorage.getItem('clientes'))
    const clientIndex = delSelect.value
    document.getElementById('del-name').value = clients[clientIndex].firstname
    document.getElementById('del-last').value = clients[clientIndex].lastname
})
deleteClient.addEventListener('click', function(){
    const clients = JSON.parse(localStorage.getItem('clientes'))
    const clientIndex = delSelect.value
    clients.splice(clientIndex, 1)
    localStorage.setItem('clientes', JSON.stringify(clients))
    location.reload()
})


function validarCedula(cedula){
    if (cedula.length !== 10) {
        return false
    }
    var coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]
    var verificador = parseInt(cedula.charAt(9))
    var suma = 0
    for (var i = 0; i < 9; i++) {
        var digito = parseInt(cedula.charAt(i)) * coeficientes[i]
        suma += (digito >= 10) ? digito - 9 : digito
    }
    var decimoDigito = (10 - (suma % 10)) % 10
    return verificador === decimoDigito
}

function mensajeError(mensaje, elemento){
    const errorDiv = document.getElementById('cedula-error')
        errorDiv.textContent = mensaje
        errorDiv.style.display = 'block'
        elemento.focus()
}
