class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    listar(id) {
        
    }

    listarAll() {
        if( this.elementos.length === 0){
            return[];
        }
        else{
         return this.elementos;
        }
    }

    guardar(elem) {
        this.elementos.push(elem);
    }

    actualizar(elem) {
 
    }

    borrar(id) {

    }

    borrarAll() {
    
    }
}

export default ContenedorMemoria