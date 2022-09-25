import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
			const doc = this.coleccion.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            response.id = id

			return response;
		} catch (err) {
			console.log(err);
		}
    }

    async listarAll() {
        try {
            const objects = await this.coleccion.get()
            const response = []
          
            objects.forEach(doc => {
                let aux = doc.data()
                aux.id = doc.id
                response.push(aux)
              });
            return response
          } catch (err) {
            return []
          }
    }

    async guardar(nuevoElem) {
        try {
         
            const added = await this.coleccion.add(nuevoElem)
            return {
                success: true,
                message: "Elemento agregado correctamente",
                id     :  added.id
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

            const updated = await this.coleccion.doc(`${id}`).update(nuevoElem)
            return {
                success: true,
                message: "Elemento actualizado"
            }
           } catch (err) {
               return {
                 success: false,
                 message: err
             }
           }
    }

    async borrar(id) {
        try {
                const res = await this.coleccion.doc(`${id}`).delete();
                return {
                    success: true,
                    message: "Elemento eliminado"
                }

           } catch (err) {
               return {
                 success: false,
                 message: err
             }
           }
    }

    async borrarAll() {
        try {
            this.coleccion.listDocuments().then(val => {
                val.map((val) => {
                    val.delete()
                })
            })
            return {
                success: true,
                message: "Elementos eliminados"
            }
           } catch (err) {
               return {
                 success: false,
                 message: err
             }
           }
    }

}

export default ContenedorFirebase