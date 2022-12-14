const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    socket.emit('new-product', formProps)
    formAgregarProducto.reset() 
    //Armar objeto producto y emitir mensaje a evento update
})

socket.on('productos', async productos => {
    //generar el html y colocarlo en el tag productos llamando al funcion makeHtmlTable
    const table = await makeHtmlTable(productos)
    document.getElementById('productos').innerHTML = table

});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const fecha = new Date()
    const mensaje = {
        "email" : document.getElementById('inputUsername').value,
        "mensaje" : document.getElementById('inputMensaje').value,
        "fecha" : fecha.toLocaleString()
    } 
    //console.log(mensaje)
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    socket.emit('new-message', mensaje)
    formPublicarMensaje.reset()
    inputMensaje.focus()
}) 

socket.on('mensajes', mensajes => {
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
}) 

function makeHtmlList(mensajes) {
    //Armar nuestro html para mostrar los mensajes como lo hicimos en clase
    return mensajes.map(elem => {
        return (`<div><em style="color:blue;"><strong>${elem.email} </strong></em> <em style="color:brown;">${elem.fecha} </em>:<em style="color:green;"><i>${elem.mensaje}</i></em></div>`)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
}) 