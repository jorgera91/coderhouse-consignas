const fs = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        let objects = await this.getAll()
        const objById = objects.find(obj => obj.id == id)
        return  (objById === undefined) ? {'error' : 'ELEMENTO NO ENCONTRADO'} : objById
    }

    async getAll() {
         //Si no existe el archivo lo creamos
         if (!fs.existsSync(this.ruta)) {
            try {
                await fs.promises.writeFile(this.ruta,'')
            } catch (error) {
                throw new Error('Ocurrio un eror al crear el archivo')
            }
          }  
        
        try {
            const objects = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(objects)
        } catch (error) {
           return []
        } 
    }

    async save(obj) {
        const objects = await this.getAll()
        obj.id = (objects.length + 1)
        objects.push(obj)

         try {
            await fs.promises.writeFile(this.ruta,JSON.stringify(objects,null,2))
            return {
                success: true,
                message: "Elemento agregado correctamente",
                id     : obj.id
            }
        } catch (error) {
            return {
                success: false,
                message: "Ocurrio un eror al intentar agregar el elemento"
            }
        } 
    }

    async actualizar(elem, id) {
        id = parseInt(id)
        let objects = await this.getAll()
        let pos = objects.findIndex(item=>item.id == id)
        
        if(pos > -1){
            elem.id = id
            objects[pos] = elem

            try {
                await fs.promises.writeFile(this.ruta,JSON.stringify(objects,null,2));
                return {
                    success: true,
                    message: "Elemento actualizado correctamente"
                }
            } catch (error) {
                throw new Error('Ocurrio un eror al crear el archivo')
            } 

        }else{
            return {
                success: false,
                message: "No existe el elemento con el id especificado"
            }
        }
    }

    async borrar(id) {
        id = parseInt(id);
        let obj = await this.listar(id);
        if(obj.hasOwnProperty('id')){
            const objects = await this.getAll();
            const newListObjects = objects.filter(data => data.id != id);
            try {
                await fs.promises.writeFile(this.ruta,JSON.stringify(newListObjects,null,2));
                return {
                    success: true,
                    message: "Elemento eliminado"
                }
            } catch (error) {
                throw new Error('Ocurrio un eror al sobreescribir el archivo')
            }
        }else{
            return {
                success: false,
                message: "No existe el elemento con el id especificado"
            }
        }
    }
    

    async borrarAll() {
        
    }
}

module.exports = ContenedorArchivo