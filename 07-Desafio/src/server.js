const express = require('express')
const { json } = require('express/lib/response')
const { Router } = express

const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js') 

//--------------------------------------------
// instancio servidor y persistencia

const app = express()

const productosApi = new ContenedorArchivo('../dbProductos.json')
const carritosApi = new ContenedorArchivo('../dbCarritos.json')

//--------------------------------------------
// permisos de administrador

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.originalUrl,req.method))
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.post('/', soloAdmins, async (req, res) => {
    const obj = req.body
    let addedProduct = await productosApi.save(obj)
    res.json(addedProduct)
 });

productosRouter.get('/:id?', async (req, res) => {
    if(req.params.id){
        const { id } = req.params
        let productById = await productosApi.listar(id);
        res.json(productById)
    }else{
        let allProducts = await productosApi.getAll();
        res.json(allProducts)
    }
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const obj = req.body
    const { id } = req.params
    let modifiedProduct = await productosApi.actualizar(obj,id);
    res.json(modifiedProduct)

});

productosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    let deleteProduct = await productosApi.borrar(id)
    res.json(deleteProduct)

});

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.post('/', async (req, res) => {
   const carrito = {
       timestamp : Date.now(),
       productos : [],
   }
    let addedCart = await carritosApi.save(carrito)
    res.json(addedCart)
 });

 carritosRouter.get('/', async (req, res) => {
    let allCarts = await carritosApi.getAll()
    let ids = allCarts.map((car) => car.id)
    res.json(ids)
  });

carritosRouter.get('/:id/productos', async (req, res) => {
    const {id} = req.params
    let car = await carritosApi.listar(id)
    res.json(car.productos)
});

carritosRouter.post('/:id/productos', async (req, res) => {
    const idCar = req.params.id
    const idProduct = req.body.id
    let car = await carritosApi.listar(idCar)
    let product = await productosApi.listar(idProduct)
    car.productos.push(product)
    let modifiedCar = await carritosApi.actualizar(car,idCar)
    res.json(modifiedCar)
    
});

carritosRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const {id, id_prod} = req.params
    let car = await carritosApi.listar(id)
    const posProduct = car.productos.findIndex(item=>item.id == id_prod)
    
    if(posProduct > -1){
        car.productos.splice(posProduct,1)
        car = await carritosApi.actualizar(car,id)
    }

    res.json(car)
    
});

carritosRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    let deleteCar = await carritosApi.borrar(id)
    res.json(deleteCar)
    
});


//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.get('/productos', (req, res) => {
    res.sendFile('productos.html', { root: '../public/' });
});

app.get('/carritos', (req, res) => {
    res.sendFile('carrito.html', { root: '../public/' });
});

module.exports = app