import React, { useEffect, useState } from "react";
import AnadirTarea from "./AnadirTarea";
import "../../styles/index.css";
import { eliminarTodoService, crearUsuarioService, obtenerListaUsuariosService } from "../services/services";



const Home = () => {

	//Variables a usar
	const usuario_servicio = "tom";
	const [listaUsuarios, setListaUsuarios] = useState([]);
	

	//Llama al servicio obtenerListaUsuariosService, la cual nos proprciona los usuarios creados y los pasa a setListaUsuario.
	//Comprueba si hay algún error con el catch
	useEffect(() => {
		obtenerListaUsuariosService()
			.then(usuarios => {
				setListaUsuarios(usuarios.users); // Suponiendo que usuarios es un array de objetos con propiedades, incluyendo name
			})
			.catch(error => {
				console.error('Error al obtener la lista de usuarios:', error);
			});
	}, []); // array vacío: sólo se ejecuta una vez, cuando se carga la página o se actualiza 


	//comprueba el array de listaUsuarios: si tiene más de 0 índices (no está vacio el array),
	//crea una variable que va a obtener el resultado de buscar(find) un usuario concreto de la listaUsuarios. 
	//dentro de la función find se crea una variable llamada usuario, que está recibiendo a través de listaUsuarios.find
	//un array de objetos, y el dato que nos interesa es el name. Los objetos de este array tienen el siguiente formato:
	/**
	 * 
	 * {
      	"name": "tom",
      	"id": 14
    	},
	 */
	//Si el usuarioYaCreado no existe, se llama al servicio crearUsuarioService y le pasamos la variable "tom"
	//El control de errores ya se está haciendo también en el propio servicio de crearUsuarioService
	useEffect(() => {
		if (listaUsuarios.length > 0) {
			const usuarioYaCreado = listaUsuarios.find(usuario => usuario.name === usuario_servicio);
			console.log('Usuario encontrado:', usuarioYaCreado);
	
			if (!usuarioYaCreado) {
				crearUsuarioService(usuario_servicio)
					.then(() => {
						console.log(`${usuario_servicio} ha sido creado.`);
					})
					.catch(error => {
						console.error('Error al crear el usuario:', error);
					});
			}
		}
	}, [listaUsuarios]); // Este efecto se ejecuta cada vez que listaUsuarios cambia
	



	//construimos la función que eliminará al usuario y todas sus tareas y hace una actualización de la página con window.location.reload();
	//Crea una variable que llama a una ventana para confirmar si queremos eliminar todo. 
	//Si confirmamos, llama a eliminarTodoService pásandole usuario y actualiza lá pagina. 
	const eliminarTodo = () => {
		const confirmacionEliminarTodo = window.confirm("Esta acción borrará el usuario y sus tareas"); //confirm: hace pregunta cerrada

		if (confirmacionEliminarTodo) {
			eliminarTodoService(usuario_servicio)
				.then(datosRespuesta => {
					console.log('DatosRespuesta' + datosRespuesta); //aquí esta llegando ok

					window.location.reload();
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	}




	// Devuelve la forma del cuerpo principal, el aspecto que tendrá la web//
	return (
		<div className="container-fluid d-flex justify-content-center bg-dark contenedor">
			<div className="principal ">
				<div className="titulo d-flex justify-content-center align-items-center">
					<h1 className="d-flex align-items-center">TAREAS</h1>
				</div>

				{/* //Boton para eliminar todo// */}
				<div className="botonEliminarTodo container	">
					<button type="button"
						className="btn btn-primary"
						onClick={eliminarTodo}>Eliminar todo
					</button>
				</div>

				{/* Campo para añadir tareas, donde se llama al componente AñadirTarea */}
				<div className="tareas">
					<div className="container">
						<AnadirTarea
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
