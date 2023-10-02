export interface ICreateSolicitud {
  Nombre: string;
  APaterno: string;
  AMaterno: string;
  NombreUsuario: string;
  Email: string;
  Puesto: string;
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

export interface IUsuarios {
  Id: string;
  NombreUsuario: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  CorreoElectronico: string;
  Puesto: string;
  CURP: string;
  RFC: string;
  Telefono: string;
  Ext: string;
  Celular: string;
  IdTipoUsuario: string;
  EstaActivo: string;
  PuedeFirmar: string;
  UltimoInicioDeSesion: string;
  CreadoPor: string;
  FechaDeCreacion: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: string;
  Dependencia: string;
  TipoUsuario: string;
  IdEntidad: string;
}
