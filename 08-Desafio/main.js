const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Container = require('./contenedores/Contenedor.js')
const { optionsMariaDB, optionsSQLite3 } = require('./options/config.js')


//--------------------------------------------
// instancio servidor, socket y api
const app = express()
const ProdC = new Container(optionsSQLite3, 'products');
const MessageC = new Container(optionsMariaDB, 'messages');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public/' });

});


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Cliente conectado')
    const productos = await ProdC.getAll()
    const mensajes = await MessageC.getAll()
   // console.log(productos)

    socket.emit('productos', productos)
    socket.emit('mensajes', mensajes)

    socket.on('new-product', async data => {
        const guardado = await ProdC.save(data)
        const productos = await ProdC.getAll()
        io.sockets.emit('productos', productos)
    })

    socket.on('new-message', async data => {
        const guardado = await MessageC.save(data)
        const mensajes = await MessageC.getAll()
        io.sockets.emit('mensajes', mensajes)
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))