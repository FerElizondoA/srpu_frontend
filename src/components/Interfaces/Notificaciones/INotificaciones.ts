export interface INotificaciones {
    Id: string;
    Titulo: string;
    Mensaje: string;
    FechaDeCreacion: string;
    Creador: string;
    Cargo: string;
}

export interface IDestinatarios {
    id: string;
    NombreUsuario: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
}

export interface IHistorial {
    Id: string;
    Titulo: string;
    Mensaje: string;
    Fecha: string;
    Hora: string;
}

export interface IEstatus{
    Usuario: string;
    Leido: string;
}
