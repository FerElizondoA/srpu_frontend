export interface IMunicipioUOrganizacion {
    Id: string;
    EntePublicoObligado: string;
    Tipo: string;
    IdTipoEntePublico: string;
    FechaCreacion: string;
    CreadoPor: number;
    UltimaModificacion: string;
    ModificadoPor: number;
    Deleted: number;
}

export interface ITipoEntePublico {
    Id: string;
    Tipo: string;
    FechaCreacion: string;
    CreadoPor: number;
    UltimaModificacion: string;
    ModificadoPor: number;
    Deleted: number;
}