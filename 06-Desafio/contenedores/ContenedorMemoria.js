

class ContenedorMemoria {

    constructor() {
        this.mensajes = []
    }

   async getAll() {
       if( this.mensajes.length === 0){
           return[];
       }
       else{
        return this.mensajes;
       }
    
    }

   async save(mensaje) {
        this.mensajes.push(mensaje);
    }


}

module.exports = ContenedorMemoria