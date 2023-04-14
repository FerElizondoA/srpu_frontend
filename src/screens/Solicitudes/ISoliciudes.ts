export interface ISolicitudes {
    AppNombre: string;
    CreadoPor: string;
    DatosAdicionales: string;
    Estatus: number;
    FechaDeCreacion: string;
    Id: string;
    IdApp: string;
    Mensaje: string;
    ModificadoPor: string;
    NombreSolicitante: string;
    NombreUsuario: string;
    Respuesta: string;
    TipoSolicitud: string;
    UltimaModificacion: string;
    tipoSoli: string;

}

export interface IDetailSolicitudUsuario {
    ApellidoMaterno: string;
    ApellidoPaterno: string;
    Celular: string;
    CorreoElectronico: string;
    CreadoPor: string;
    Curp: string;
    DatosAdicionales: string;
    Estatus: string;
    Ext: string;
    FechaDeCreacion: string;
    Id: string;
    Mensaje: string;
    Nombre: string;
    NombreApp: string;
    NombreSolicitante: string;
    NombreUsuario: string;
    Puesto: string;
    Respuesta: string;
    Rfc: string;
    Telefono: string;
}

export interface IDatosAdicionales {
    idRol: string;
    rol: string;
    cargo: string;
    idEntePublico: string;
    entePublico: string;
    correoDeRecuperacion: string;

}