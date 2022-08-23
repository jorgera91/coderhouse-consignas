const fs = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        let products = await this.listarAll();
        const productById = products.find(product => product.id == id);
        return  (productById === undefined) ? {'error' : 'PRODUCTO NO ENCONTRADO'} : productById; 
    }

   async listarAll() {
         //Si no existe el archivo lo creamos
         if (!fs.existsSync(this.ruta)) {
            try {
                await fs.promises.writeFile(this.ruta,'');
            } catch (error) {
                throw new Error('Ocurrio un eror al crear el archivo')
            }
          }  
        
        try {
            const products = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
           return [];
        } 
    }

   async guardar(prod) {
        const products = await this.listarAll();
        prod.id = (products.length + 1);
        prod.price = parseFloat(prod.price);
        products.push(prod);
        //await fs.promises.writeFile(this.ruta,JSON.stringify(products,null,2));

         try {
            await fs.promises.writeFile(this.ruta,JSON.stringify(products,null,2));
            return {
                success: true,
                message: "Producto agregado correctamente"
            };
        } catch (error) {
            return {
                success: false,
                message: "Ocurrio un eror al intentar agregar el producto"
            };
        } 
    }

    async actualizar(prod, id) {
        id = parseInt(id);
        let product = await this.listar(id);
        prod.id = id;
        if(product.hasOwnProperty('id')){
            let products = await this.listarAll();
            products.forEach(function(p) {
                if(p.id === id){
                    p.title = prod.title;
                    p.price = prod.price;
                    p.thumbnail = prod.thumbnail;
                }
            });

            try {
                await fs.promises.writeFile(this.ruta,JSON.stringify(products,null,2));
                return prod;
            } catch (error) {
                console.log(error);
                throw new Error('Ocurrio un eror al crear el archivo')
            }

        }else{
            return product;
        }
        
    }

    async borrar(id) {
        id = parseInt(id);
        let product = await this.listar(id);
        if(product.hasOwnProperty('id')){
            const products = await this.listarAll();
            const newListProducts = products.filter(data => data.id != id);
            try {
                await fs.promises.writeFile(this.ruta,JSON.stringify(newListProducts,null,2));
                return {'success' : 'PRODUCTO ELIMINADO'}
            } catch (error) {
                throw new Error('Ocurrio un eror al sobreescribir el archivo')
            }
        }else{
            return product;
        }
    }
}

module.exports = ContenedorArchivo