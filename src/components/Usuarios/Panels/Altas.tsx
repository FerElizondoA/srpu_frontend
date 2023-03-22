import { useEffect, useState } from "react";
import { createSolicitud } from "../APIS Solicitudes/Solicitudes";
import { ICreateSolicitud } from "../Interfaces/ISolicitudes";
export const Altas=()=>{

    const [solicitud,setSolicitudes]=useState<ICreateSolicitud>({
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