import { useEffect, useState } from "react";
//import { createSolicitud } from "../../APIS/APIS Solicitudes/Solicitudesss
import { createSolicitud } from "../../APIS/solicitudInscipcion/Solicitudes";
import { ICreateSolicitud } from "../../Interfaces/InterfacesUsuario/ISolicitudes";
//import { ICreateSolicitud } from "../../Interfaces/InterfacesUsuarios/ISolicitudes";
export const Altas=()=>{

    const [solicitud, setSolicitudes]=useState<ICreateSolicitud>({
        Nombre: '',
        APaterno: '',
        AMaterno: '',
        NombreUsuario: '',
        Email: '',
        Puesto:'',
        Curp: '',
        RFC: '',
        Celular: 0,
        Telefono: 0,
        Extencion: 0,
        DatosAdicionales: '',
        TipoSolicitud: '',
        CreadoPor: '',
        IdApp: '',
    })


    return(
    <button onClick={()=>{
        createSolicitud(solicitud,'holacomentario');
    }}> ALTA </button>
    )
}