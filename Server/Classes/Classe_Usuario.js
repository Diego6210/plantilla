class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, IdUsuario, Usuario ) {
        this.personas.push({ id, IdUsuario, Usuario });
        return this.personas;
    }

    getPersona(id) {
        var persona = this.personas.filter(persona => {
            persona.id === id
        })[0];
        return persona;
    }

    getPersonabyID(id) {
        var estatus = false;
        for(var i =0; i < this.personas.length; i++ ){

            if(this.personas[i].IdUsuario == id){
                estatus = true
                return this.personas[i].id;
            }
        }

        if(!estatus)
            return null;
    }

    getPersonabyIDUsuario(id) {
        for(var i =0; i < this.personas.length; i++ ){
            if(this.personas[i].id == id)
                return this.personas[i].IdUsuario;
        }
    }


    getPersonas() {
        return this.personas;
    }

    borrarPersona(id) {
        
        var personaBorrada = this.personas.filter(persona => persona.id === id);//this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        if(Object.entries(personaBorrada).length != 0)
        {     
            return personaBorrada[0].Usuario;
        }else
            return null;
    }
}


module.exports = {
    Usuarios
}