const express = require('express')
const app = express()
const ProductosApi = require('./api/productos.js')
const productosApi = new ProductosApi('./productos.json')



app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/productos', async (req, res) => {
    let allProducts = await productosApi.listarAll();
    res.render('allProducts.ejs', { allProducts });
});

app.post('/productos', async (req, res) => {
    const obj = req.body;
    let addedProduct = await productosApi.guardar(obj);
    const { success, message } = addedProduct;
    const alert = true;
    res.render('form.ejs',{alert,success,message});
 });

 app.get('/crearProducto', (req, res) => {
     const alert = false;
     res.render('form.ejs',{alert});
 });


// servidor

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))