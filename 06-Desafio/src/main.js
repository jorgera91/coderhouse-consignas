const express = require('express')

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

//--------------------------------------------
// instancio servidor, socket y api
const app = express()
const ca = new ContenedorArchivo('./productos.json')
const cm = new ContenedorMemoria()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../public/' });

});


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Cliente conectado')
    const productos = await ca.listarAll()
    const mensajes = await cm.listarAll()
   // console.log(productos)

    socket.emit('productos', productos)
    socket.emit('mensajes', mensajes)

    socket.on('new-product', async data => {
        const guardado = await ca.guardar(data)
        const productos = await ca.listarAll()
        io.sockets.emit('productos', productos)
    })

    socket.on('new-message', async data => {
        const guardado = await cm.guardar(data)
        const mensajes = await cm.listarAll()
        io.sockets.emit('mensajes', mensajes)
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'))


//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))