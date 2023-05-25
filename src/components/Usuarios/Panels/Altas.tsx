import { useEffect, useState } from "react";

import { ICreateSolicitud } from "../../Interfaces/InterfacesUsuario/ISolicitudes";
import { createSolicitud } from "../../APIS/Config/Solicitudes-Usuarios";

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
        //createSolicitud(solicitud,'holacomentario',);
    }}> ALTA </button>
    )
}