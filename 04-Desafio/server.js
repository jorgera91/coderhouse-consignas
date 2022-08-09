const express = require('express')
const { Router } = express
const ProductosApi = require('./api/productos.js')

// router de productos

const productosApi = new ProductosApi('./productos.json')

const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }));

//rutas usando productosRouter

productosRouter.get('/', async (req, res) => {
    let allProducts = await productosApi.listarAll();
    res.json(allProducts);
});

productosRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    let productById = await productosApi.listar(id);
    res.json(productById);
});

productosRouter.post('/', async (req, res) => {
   const obj = req.body;
   let addedProduct = await productosApi.guardar(obj);
   res.json(addedProduct);
});

productosRouter.put('/:id', async (req, res) => {
    const obj = req.body;
    const { id } = req.params;

    let modifiedProduct = await productosApi.actualizar(obj,id);
    res.json(modifiedProduct);

});

productosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    let deleteProduct = await productosApi.borrar(id);
    res.json(deleteProduct);

});


// servidor

const app = express()
app.use(express.static('public'))
app.use('/api/productos', productosRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))