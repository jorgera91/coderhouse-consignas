const express = require('express')
const app = express()
const ProductosApi = require('./api/productos.js')
const productosApi = new ProductosApi('./productos.json')


app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './views')

app.get('/productos', async (req, res) => {
    let allProducts = await productosApi.listarAll();
    res.render('allProducts.pug', { allProducts });
});

app.post('/productos', async (req, res) => {
    const obj = req.body;
    let addedProduct = await productosApi.guardar(obj);
    const { success, message } = addedProduct;
    const alert = true;
    res.render('form.pug',{alert,success,message});
 });

 app.get('/crearProducto', (req, res) => {
     const alert = false;
     res.render('form.pug',{alert});
 });


// servidor

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))