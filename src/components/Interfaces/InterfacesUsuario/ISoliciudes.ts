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
  Entidad: string;
  Ext: string;
  FechaDeCreacion: string;
  Id: string;
  IdEntidad: string;
  IdTipoUsuario: string;
  Nombre: string;
  NombreApp: string;
  NombreSolicitante: string;
  NombreUsuario: string;
  PuedeFirmar: string;
  Puesto: string;
  Rfc: string;
  Roles: string;
  Telefono: string;
  TpoUsuario: string;
}

export interface IDatosAdicionales {
  idRol: string;
  rol: string;
  cargo: string;
  idEntePublico: string;
  entePublico: string;
  correoDeRecuperacion: string;
}

export interface IComentarios {
  Comentario: string;
  CreadoPor: string;
  FechaDeCreacion: string;
  Id: string;
  Mensaje: string;
  NombreCreador: string;
}
