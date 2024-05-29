export interface ICatalogo {
  Id: string;
  Descripcion: string;
}

export interface IFondoOIngreso extends ICatalogo {
  TipoDeFuente: string;
}

export interface IEntePublico {
  Id: string;
  Descripcion: string;
  IdTipoEntePublico: string;
  Tipo: string;
}
