import { obtenerCLiente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import {Form, useNavigate, useLoaderData, useActionData, redirect} from "react-router-dom"
import Error from "../components/Error"

export async function loader({params}){
    
    const cliente = await obtenerCLiente(params.clienteId)
    if(Object.values(cliente).length===0){
        throw new Response('',{
            status: 404,
            statusText: 'El cliente no existe'
        })
    }

    return cliente
}

export async function action({request, params}){

    // return;
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);

  const email = formData.get("email");

  //Validación total
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("¡¡¡Todos los campos son obligatorios!!!");
  }
  //Validacion del formato de email
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El Email no es valido");
  }

  //Retornar datos si existen errores

  if (Object.keys(errores).length) {
    return errores;
  }

  //Actualizar el cliente
  await actualizarCliente(params.clienteId, datos)

  return redirect('/')

}

function EditarCliente() {
const navigate = useNavigate();
const cliente = useLoaderData();
const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-800">Editar Cliente</h1>
      <p className="mt-3">
        Está habilitada la edición del cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md"
          onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario 
          cliente={cliente}/>

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md"
            value="Guardar Cambio"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente