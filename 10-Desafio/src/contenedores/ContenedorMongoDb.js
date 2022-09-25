import mongoose from 'mongoose'
import config from '../config.js'

try{
  await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
  console.log('Base de datos conectada')
}catch(error){
  console.log(error) 
}


class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, new mongoose.Schema(esquema))
    }

    async listar(id) {
        try { 
          const objects = await this.coleccion.find({_id:id}).lean()
          const objById = objects.find(obj => obj._id == id)
          return  (objById === undefined) ? {'error' : 'ELEMENTO NO ENCONTRADO'} : objById
        } catch (err) {
          console.log(err);
        }
    }

    async listarAll() {
        try {
          const objects = await this.coleccion.find().lean()
          return objects
        } catch (err) {
          return []
        }
    }

    async guardar(nuevoElem) {
        try {
         
          const added = await this.coleccion.collection.insertOne(nuevoElem)
          return {
            success: true,
            message: "Elemento agregado correctamente",
            id     : added.insertedId
        }
          
        } catch (err) {
            return {
              success: false,
              message: "Ocurrio un eror al intentar agregar el elemento"
          }
        }
    }

    async actualizar(nuevoElem, id) {
      try {
        await this.coleccion.findOneAndUpdate({_id:id }, nuevoElem,  function (err) {
           if (err){
               return {
                 success: false,
                 message: err
             }
           }
           else{
             return {
               success: true,
               message: "Elemento actualizado"
           }
           }
       });
       } catch (err) {
           return {
             success: false,
             message: err
         }
       }
    }

    async borrar(id) {
        try {
         await this.coleccion.findOneAndDelete({_id:id }, function (err) {
            if (err){
                return {
                  success: false,
                  message: err
              }
            }
            else{
              return {
                success: true,
                message: "Elemento eliminado"
            }
            }
        });
        } catch (err) {
            return {
              success: false,
              message: err
          }
        }
    }

    async borrarAll() {
      try {
        await this.coleccion.deleteMany({}, function (err) {
           if (err){
               return {
                 success: false,
                 message: err
             }
           }
           else{
             return {
               success: true,
               message: "Elementos eliminados"
           }
           }
       });
       } catch (err) {
           return {
             success: false,
             message: err
         }
       }
    }
}

export default ContenedorMongoDb