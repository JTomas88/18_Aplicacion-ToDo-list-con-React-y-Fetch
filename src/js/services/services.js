
//Variables para montar la url del fetch//
const ApiUrl = 'https://playground.4geeks.com/todo';
const postToDo = '/todos/';
const obtener = '/users/'
const stVacio = "";

/******************************
 * 
 *      CONEXIÓN API 
 * 
 *****************************/


/**
 * Función API para añadir una tarea. 
 * @param {user_name } nombre de usuario que permite la conexion a la api
 * @param {label} es la tarea que se recibe cuando el usuario agrega una tarea. 
 * @returns devuelve: id, label, is_done
 * 
 * Recibe el nombre del usuario y la tarea en sí (label). Se le pasa el url de la API y método. 
 * El headers y el body son confiruaciones de la propia API.
 * Con el .then nos ayuda a saber si la API ha funcionado correctamente o no y nos devuelve el resultado en formato json. 
 */
const anadirTareaService = (user_name, label) => {
    return fetch(`${ApiUrl}${postToDo}${user_name}`, {
        method: 'POST', //metodo para enviar algún dato al servidor, en este caso la tarea
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, label }), //stringify - convierte los string a formato json // En la api aparece como requerido
    })
        .then(respuesta => {
            console.log(respuesta);
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            } else {
                return respuesta.json()
            }
        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
        })
        .catch(esError => {  //catch captura el error del if si fuese erroneo, no es obligatorio pero si buena práctica
            console.log('Error: ' + esError);
        })
};


export { anadirTareaService };

/**
 * Obtiene la lista de tareas del usuario.
 * @param {user_name } 
 * @returns datosRespuesta --> es la lista de tareas que tiene el servicio 
 */
const obtenerTareasServices = (user_name) => {
    return fetch(`${ApiUrl}${obtener}${user_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(respuesta => {
            console.log(respuesta);
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta.json()

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })
        .catch(esError => {  //catch captura el error del if si fueserroneo, no es obligatorio pero si buena práctica
            console.log('Error: ' + esError);
        })
};

export { obtenerTareasServices };

/**
 * Elimina una tarea en concreto. 
 * @param {todo_id} --> recoge el id de la tarea, dato que va incluido dentro del objeto. 
 * @returns si es la única tarea que queda, la eliminamos y devuelve un objeto vacío. Si hay más tareas, devuelve el resto de tareas
 */
const eliminarTareaService = (todo_id) => {
    return fetch(`${ApiUrl}${postToDo}${todo_id}`, {
        method: 'DELETE'
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                /**
                 * crea un error (objeto) que tiene varios "atributos". En este caso queremos saber qué error concreto da. 
                 */
                throw new Error('No fue ok ' + respuesta.statusText) //crea un error, que devue
            }
            /**
             * Verifica el status de la respuesta del servicio:
             * si es un 204 o si el contenido del content.header es igual a 0 nos devuelve un objeto vacío. 
             */
            if (respuesta.status === 204 || respuesta.headers.get('Content-Length') === '0') {
                return {}; // Devuelve un objeto vacío si no hay contenido
            }
            return respuesta.json(); 

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })

        .catch(esError => {
            console.log('Error: ' + esError);
        });
}
export { eliminarTareaService }

/**
 * Elimina el usuario recibido y todas sus tareas.
 * @param {user_name } 
 * @returns {crearUsuarioService(user_name)} --> en el return llama al servicio crearUsuarioService para que cree uno tras eliminar Todo. 
 */
const eliminarTodoService = (user_name) => {
    return fetch(`${ApiUrl}${obtener}${user_name}`, {
        method: 'DELETE',
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta

        })
        .then(datosRespuesta => {
            alert(`Usuario eliminado: ${user_name}`);
            return crearUsuarioService(user_name)
        })

                .catch(esError => {
            console.log('Error: ' + esError);
        })
}
export { eliminarTodoService }


/**
 * Crea un nuevo usuario con la variable que le llega. 
 * @param {user_name } 
 * @returns respuesta, en formato json
 */
const crearUsuarioService = (user_name) => {
    return fetch(`${ApiUrl}${obtener}${user_name}`, {
        method: 'POST',
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta

        })
        .then(datosRespuesta => {
            console.log(datosRespuesta);
            return datosRespuesta;
        })
        .catch(esError => {
            console.log('Error: ' + esError);
        })
}
export { crearUsuarioService }


/**
 * Obtiene la lista de usuarios que están creados. No recibe ningún parámetro. 
 * @returns respuesta, en formato json (un array de objetos)
 */
const obtenerListaUsuariosService = () => {
    return fetch(`${ApiUrl}${obtener}`, {
        method: 'GET'
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('No fue ok ' + respuesta.statusText)
            }
            return respuesta.json()

        })

        .catch(esError => {
            console.log('Error: ' + esError);
        })
}
export { obtenerListaUsuariosService }



