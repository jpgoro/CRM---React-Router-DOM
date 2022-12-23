import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
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

  await agregarCliente(datos)

  return redirect('/')
}

function NuevoCliente() {
  const errores = useActionData();
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-black text-4xl text-indigo-800">Nuevo Clientes</h1>
      <p className="mt-3">
        Completar todos los campos para registar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-indigo-700 text-white rounded-md px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div className=" bg-amber-50 shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-indigo-700 rounded-md p-3 uppercase font-bold text-white text-lg"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
