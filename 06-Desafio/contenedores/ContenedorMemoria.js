

class ContenedorMemoria {

    constructor() {
        this.mensajes = []
    }

   async listarAll() {
       if( this.mensajes.length === 0){
           return[];
       }
       else{
        return this.mensajes;
       }
    
    }

   async guardar(mensaje) {
        this.mensajes.push(mensaje);
        //console.log(this.mensajes)
    }


}

module.exports = ContenedorMemoria