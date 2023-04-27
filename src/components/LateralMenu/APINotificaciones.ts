import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const createNotification = (Titulo: string, mensaje: string, listadoUsuarios: Array<string>) => {
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
        console.log(r)

    }).catch((r) => {
        console.log(r)
    })
}


export const getNotificaciones = (setState: Function, cantidadNotificaciones: Function, permisosEspeciales = 0) => {

    axios.get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-notificaciones", {
        params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            PermisosEspeciales: permisosEspeciales
        },
        headers: {
            'Authorization': localStorage.getItem("jwtToken"),
            'Content-Type': 'application/json'
        }
    }).then(({ data }) => {

        cantidadNotificaciones(data.data.length); //Obtienes la cantidad de Notificaciones

        setState(data.data)
    })
        .catch((r) => {
            if (r.response.status === 409) {
            }
        });

};

export const getHistorialNotificaciones = (setState: Function,) => {

    axios.get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-notificaciones-creadas", {
        params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
            'Authorization': localStorage.getItem("jwtToken"),
            'Content-Type': 'application/json'
        }
    }).then(({ data }) => {

        //cantidadNotificaciones(data.data.length); //Obtienes la cantidad de Notificaciones
        console.log(data.data)
        setState(data.data)
    })
        .catch((r) => {
            if (r.response.status === 409) {
            }
        });

};

export const getEstatus = (setState: Function, IdNotificacion: string) => {

    axios.get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-info-notificacion", {
        params: {
            IdNotificacion: IdNotificacion,
        },
        headers: {
            'Authorization': localStorage.getItem("jwtToken"),
            'Content-Type': 'application/json'
        }
    }).then(({ data }) => {
        setState(data.data)
    })
        .catch((r) => {
            if (r.response.status === 409) {
            }
        });

};


export const leerMensaje = (IdNotificacion: string) => {

    axios.post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/leer-notificacion", {

        IdNotificacion: IdNotificacion,
    },
        {
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => {
            console.log(data);

        })
        .catch((r) => {
            if (r.response.status === 409) {
            }
        });

};




