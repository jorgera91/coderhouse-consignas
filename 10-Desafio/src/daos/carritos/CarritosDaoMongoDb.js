import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            timestamp : { type : Date, default: Date.now },
            productos: { type: [], required: true }
        })
    }

    /* async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    } */
}

export default CarritosDaoMongoDb