export interface ICreateSolicitud {
    Nombre: string;
    APaterno: string;
    AMaterno: string;
    NombreUsuario: string;
    Email: string;
    Puesto:string;
    Curp: string;
    RFC: string;
    Celular: number;
    Telefono: number;
    Extencion: number;
    DatosAdicionales: string;
    TipoSolicitud: string;
    CreadoPor: string;
    IdApp: string;
}

export interface IUSuarios {
    id: string;
    IdCentral: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno:string;
    NombreUsuario: string;
    CorreoElectronico: string;
    Curp: string;
    Rfc: string;
    Telefono: string;
    Ext: string;
    Celular: string;
    Cargo: string;
    CorreoDeRecuperacion: string;
    IdRol: string;
    Rol: string;
    MunicipioUOrganizacion: string;
}
