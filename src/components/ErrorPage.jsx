import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError()

    return(
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-20 text-indigo-900">CRM - CLIENTES</h1>
            <p className="text-center">Hubo un error</p>
            <p className="text-center">{error.statusText || error.message}</p>
        </div>
    )
}