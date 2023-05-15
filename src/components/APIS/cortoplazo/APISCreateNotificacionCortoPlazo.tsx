import axios from "axios"

export const createNotificationCortoPlazo = (Titulo: string, mensaje: string, listadoUsuarios: Array<string>) => {
    axios.post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-notificacion", {

        Titulo: Titulo,
        Mensaje: mensaje,
        IdUsuarioCreador: localStorage.getItem("IdUsuario"),
        ListadoUsuarios: listadoUsuarios

    },
        {
            headers: {
                Authorization: localStorage.getItem("jwtToken") || '',
                'Content-Type': 'application/json'
            }
        }

    ).then((r) => {
        

    }).catch((r) => {
        
    })
}