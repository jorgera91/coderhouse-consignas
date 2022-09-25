import express from 'express'
const { Router } = express

import {
    productosDao as productosDao,
    carritosDao as carritosDao 
} from './daos/index.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

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
        res.json(crearErrorNoEsAdmin())
    } else {
        next()
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/:id?', async (req, res) => {
    if(req.params.id){
        const { id } = req.params
        let productById = await productosDao.listar(id);
        res.json(productById)
    }else{
        let allProducts = await productosDao.listarAll();
        res.json(allProducts)
    }
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    const obj = req.body
    let addedProduct = await productosDao.guardar(obj)
    res.json(addedProduct)
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const obj = req.body
    const { id } = req.params
    let modifiedProduct = await productosDao.actualizar(obj,id);
    res.json(modifiedProduct)
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const { id } = req.params
    let deleteProduct = await productosDao.borrar(id)
    res.json(deleteProduct)
})

productosRouter.delete('/', soloAdmins, async (req, res) => {
    let deleteProducts = await productosDao.borrarAll()
    res.json(deleteProducts)
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    let allCarts = await carritosDao.listarAll()
    let ids = allCarts.map((car) => car._id ? car._id : car.id)
    res.json(ids)
})

carritosRouter.post('/', async (req, res) => {
    const carrito = {
        timestamp : Date.now(),
        productos : [],
    }

     let addedCart = await carritosDao.guardar(carrito)
     res.json(addedCart)
})

carritosRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    let deleteCar = await carritosDao.borrar(id)
    res.json(deleteCar)
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
    const {id} = req.params
    let car = await carritosDao.listar(id)
    res.json(car.productos)
})

carritosRouter.post('/:id/productos', async (req, res) => {
    const idCar = req.params.id
    const idProduct = req.body.id
    let car = await carritosDao.listar(idCar)
    let product = await productosDao.listar(idProduct)
    car.productos.push(product)
    let modifiedCar = await carritosDao.actualizar(car,idCar)
    res.json(modifiedCar)
})

carritosRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    const {id, id_prod} = req.params
    let car = await carritosDao.listar(id)
    const posProduct = car.productos.findIndex(item=>(item._id ? item._id : item.id) == id_prod)
    
    if(posProduct > -1){
        car.productos.splice(posProduct,1)
        car = await carritosDao.actualizar(car,id)
    }

    res.json(car)
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.get('/productos', (req, res) => {
    res.sendFile('productos.html', { root: './public/' });
});

app.get('/carritos', (req, res) => {
    res.sendFile('carrito.html', { root: './public/' });
});

export default app