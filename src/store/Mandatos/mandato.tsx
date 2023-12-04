import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { useMandatoStore } from "./main";
import { IDatosMandatos } from "../../screens/fuenteDePago/Mandatos";

export interface DatosGeneralesMandato {
  numeroMandato: string;
  fechaMandato: Date;
  mandatario: { Id: string; Descripcion: string };
  mandante: { Id: string; Descripcion: string };
}
export interface TipoMovimientoMandatoDeudor {
  id: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  mandatario: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string; TipoDeFuente: string };
  fondoIngresoGobiernoEstatal: string;
  fondoIngresoMunicipios: string;
  fondoIngresoAsignadoMunicipio: string;
  ingresoOrganismo: string;
  fondoIngresoAfectadoXGobiernoEstatal: string;
  afectacionGobiernoEstatalEntre100: string;
  acumuladoAfectacionGobiernoEstatalEntre100: string;
  fondoIngresoAfectadoXMunicipio: string;
  acumuladoAfectacionMunicipioEntreAsignadoMunicipio: string;
  ingresoAfectadoXOrganismo: string;
  acumuladoAfectacionOrganismoEntre100: string;
}
export interface TipoMovimientoMandatoBeneficiario {
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  mandatario: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string };
}

export interface SoporteDocumentalMandato {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface Mandato {
  Id: string;
  datosGenerales: DatosGeneralesMandato;
  TipoMovimientoMandatoDeudor: TipoMovimientoMandatoDeudor[];
  SoporteDocumental: SoporteDocumentalMandato[];
}

export interface MandatoSlice {
  tablaMandatos: IDatosMandatos[];

  idMandato: string;
  mandatoSelect: Mandato[];
  setMandatoSelect: (mandato: Mandato[]) => void;

  datosGenerales: DatosGeneralesMandato;
  setDatosGenerales: (datosGenerales: DatosGeneralesMandato) => void;

  tipoMovimientoMandato: TipoMovimientoMandatoDeudor;
  soporteDocumentalMandato: SoporteDocumentalMandato;

  tablaTipoMovimientoMandatoDeudor: TipoMovimientoMandatoDeudor[];
  tablaSoporteDocumentalMandato: SoporteDocumentalMandato[];

  borrarMandato: (Id: string) => void;

  changeIdMandato: (Id: string) => void;

  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandatoDeudor[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => void;

  setTipoMovimiento: (
    tipoMovimientoMandato: TipoMovimientoMandatoDeudor
  ) => void;

  setSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => void;

  addTipoMovimiento: (
    tipoMovimientoMandato: TipoMovimientoMandatoDeudor
  ) => void;

  addSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => void;

  removeTipoMovimiento: (index: number) => void;
  addPorcentaje: (tipoMovimientoMandato: TipoMovimientoMandatoDeudor) => void;
  removeSoporteDocumentalMandato: (index: number) => void;

  cleanTipoMovimiento: () => void;
  cleanSoporteDocumentalMandato: () => void;

  getMandato: (setState: Function) => void;
  createMandato: () => void;
  modificaMandato: () => void;

  cleanMandato: () => void;

  saveFilesMandato: (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => void;

  savePathDocMandato: (
    idMandato: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;

  arrDocs: any[];

  setArrDocs: (arr: any) => void;
}

export const createMandatoSlice: StateCreator<MandatoSlice> = (set, get) => ({
  tablaMandatos: [],

  idMandato: "",
  changeIdMandato: (Id: any) => {
    set(() => ({
      idMandato: Id,
    }));
  },

  mandatoSelect: [],
  setMandatoSelect: (mandato: Mandato[]) => {
    set((state) => ({
      mandatoSelect: mandato,
    }));
  },
  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandatoDeudor[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => {
    set((state) => ({
      tablaTipoMovimientoMandatoDeudor: tipoMovimientoMandato,
      tablaSoporteDocumentalMandato: soporteDocumentalMandato,
    }));
  },

  datosGenerales: {
    numeroMandato: "",
    fechaMandato: new Date(),
    mandatario: { Id: "", Descripcion: "" },
    mandante: {
      Id: localStorage.getItem("IdEntePublicoObligado")!,
      Descripcion: localStorage.getItem("EntePublicoObligado")!,
    },
  },
  setDatosGenerales: (datosGenerales: DatosGeneralesMandato) => {
    set(() => ({
      datosGenerales: datosGenerales,
    }));
  },

  tipoMovimientoMandato: {
    id: "",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    mandatario: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
    fondoIngresoGobiernoEstatal: "",
    fondoIngresoMunicipios: "",
    fondoIngresoAsignadoMunicipio: "",
    ingresoOrganismo: "",
    fondoIngresoAfectadoXGobiernoEstatal: "",
    afectacionGobiernoEstatalEntre100: "",
    acumuladoAfectacionGobiernoEstatalEntre100: "",
    fondoIngresoAfectadoXMunicipio: "",
    acumuladoAfectacionMunicipioEntreAsignadoMunicipio: "",
    ingresoAfectadoXOrganismo: "",
    acumuladoAfectacionOrganismoEntre100: "",
  },

  tablaTipoMovimientoMandatoDeudor: [],

  setTipoMovimiento: (tipoMovimientoMandato: TipoMovimientoMandatoDeudor) => {
    set(() => ({
      tipoMovimientoMandato: tipoMovimientoMandato,
    }));
  },

  addTipoMovimiento: (tipoMovimientoMandato: TipoMovimientoMandatoDeudor) => {
    set((state) => ({
      tablaTipoMovimientoMandatoDeudor: [
        ...state.tablaTipoMovimientoMandatoDeudor,
        tipoMovimientoMandato,
      ],
    }));
  },
  removeTipoMovimiento: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoMandatoDeudor:
        state.tablaTipoMovimientoMandatoDeudor.filter((_, i) => i !== index),
    }));
  },

  addPorcentaje: (tipoMovimientoMandato: any) =>
    set(() => ({ tablaTipoMovimientoMandatoDeudor: tipoMovimientoMandato })),

  cleanTipoMovimiento: () => {
    set(() => ({
      tipoMovimientoMandato: {
        id: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        fondoIngresoGobiernoEstatal: "",
        fondoIngresoMunicipios: "",
        fondoIngresoAsignadoMunicipio: "",
        ingresoOrganismo: "",
        fondoIngresoAfectadoXGobiernoEstatal: "",
        afectacionGobiernoEstatalEntre100: "",
        acumuladoAfectacionGobiernoEstatalEntre100: "",
        fondoIngresoAfectadoXMunicipio: "",
        acumuladoAfectacionMunicipioEntreAsignadoMunicipio: "",
        ingresoAfectadoXOrganismo: "",
        acumuladoAfectacionOrganismoEntre100: "",
      },
    }));
  },

  soporteDocumentalMandato: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date().toString(),
  },
  tablaSoporteDocumentalMandato: [],

  setSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => {
    set(() => ({
      soporteDocumentalMandato: soporteDocumentalMandato,
    }));
  },
  
  addSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: [
        ...state.tablaSoporteDocumentalMandato,
        soporteDocumentalMandato,
      ],
    }));
  },
  removeSoporteDocumentalMandato: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: state.tablaSoporteDocumentalMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },
  cleanSoporteDocumentalMandato: () => {
    set(() => ({
      soporteDocumentalMandato: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
    }));
  },

  getMandato: (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-mandato", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set(() => ({
          tablaMandatos: r,
        }));

        setState(r);
      });
  },

  createMandato: async () => {
    const state = useMandatoStore.getState();
    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-mandato",
        {
          NumeroMandato: state.datosGenerales.numeroMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: format(new Date(), "dd/MM/yyyy"),
          Mandatario: "Nuevo León",
          MecanismoPago: "Mandato",
          MunicipioOrganismoMandante: state.datosGenerales.mandante.Id,
          //OrganismoMandante: localStorage.getItem("EntePublicoObligado"),
          TipoMovimientoMandatoDeudor: JSON.stringify(
            state.tablaTipoMovimientoMandatoDeudor
          ),
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalMandato
          ),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.changeIdMandato(data.data.Id);
        state.tablaSoporteDocumentalMandato.map((dato, index) => {
          return state.saveFilesMandato(
            data.data.Id,
            `/SRPU/MANDATOS/${data.data.Id}`,
            state.tablaSoporteDocumentalMandato[index]
          );
        });

        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El mandato se ha creado exitosamente",
        });
      })
      .catch(() => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Mensaje",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      });
  },

  modificaMandato: async () => {
    const state = useMandatoStore.getState();
    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-mandato",
        {
          IdMandato: state.idMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: format(new Date(), "dd/MM/yyyy"),
          Mandatario: "Nuevo León",
          Mecanismo: "Mandato",
          MunicipioOrganismoMandante: localStorage.getItem(
            "EntePublicoObligado"
          ),
          //OrganismoMandante: localStorage.getItem("EntePublicoObligado"),
          TipoMovimientoMandatoDeudor: JSON.stringify(
            state.tablaTipoMovimientoMandatoDeudor
          ),
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalMandato
          ),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.changeIdMandato(data.result.Id);
        state.tablaSoporteDocumentalMandato.map((dato, index) => {
          return state.saveFilesMandato(
            data.result.Id,
            `/SRPU/MANDATOS/${data.result.Id}`,
            { archivo: dato.archivo, nombreArchivo: dato.nombreArchivo }
          );
        });
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El mandato se ha modificado exitosamente",
        });
      })
      .catch(function (error) {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Se encontró un error, verifique la información.",
        });
      });
  },

  borrarMandato: async (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      confirmButtonColor: "#15212f",
      cancelButtonColor: "rgb(175, 140, 85)",
      timer: 3000,
      timerProgressBar: true,
    });

    await axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-Mandato", {
        data: {
          IdMandato: Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          window.location.reload();
          Toast.fire({
            icon: "success",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function () {
        Toast.fire({
          icon: "error",
          title: "No se elimino el Mandato.",
        });
      });
    return false;
  },

  cleanMandato: () => {
    set(() => ({
      tipoMovimientoMandato: {
        id: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        fondoIngresoGobiernoEstatal: "",
        fondoIngresoMunicipios: "",
        fondoIngresoAsignadoMunicipio: "",
        ingresoOrganismo: "",
        fondoIngresoAfectadoXGobiernoEstatal: "",
        afectacionGobiernoEstatalEntre100: "",
        acumuladoAfectacionGobiernoEstatalEntre100: "",
        fondoIngresoAfectadoXMunicipio: "",
        acumuladoAfectacionMunicipioEntreAsignadoMunicipio: "",
        ingresoAfectadoXOrganismo: "",
        acumuladoAfectacionOrganismoEntre100: "",
      },
      soporteDocumentalMandato: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
      tablaTipoMovimientoMandatoDeudor: [],
      tablaSoporteDocumentalMandato: [],
    }));
  },

  saveFilesMandato: async (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => {
    const state = useMandatoStore.getState();

    return setTimeout(() => {
      const url = new File([archivo.archivo], archivo.nombreArchivo);

      let dataArray = new FormData();
      dataArray.append("ROUTE", `${ruta}`);
      dataArray.append("ADDROUTE", "true");
      dataArray.append("FILE", url);

      if (archivo.archivo.size > 0) {
        return axios
          .post(
            process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
            dataArray,
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          )
          .then(({ data }) => {
            state.savePathDocMandato(
              idRegistro,
              data.RESPONSE.RUTA,
              data.RESPONSE.NOMBREIDENTIFICADOR,
              data.RESPONSE.NOMBREARCHIVO
            );
          })
          .catch((e) => {});
      } else {
        return null;
      }
    }, 1000);
  },

  savePathDocMandato: async (
    idMandato: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocMandato",
        {
          IdMandato: idMandato,
          Ruta: Ruta,
          NombreIdentificador: NombreIdentificador,
          NombreArchivo: NombreArchivo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {})
      .catch((e) => {});
  },

  arrDocs: [],

  setArrDocs(arr: any) {
    set((state) => ({
      arrDocs: arr,
    }));
  },
});
