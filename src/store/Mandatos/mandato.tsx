import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { useMandatoStore } from "./main";
import { IDatosMandatos } from "../../screens/fuenteDePago/Mandatos";

export interface TipoMovimientoMandato {
  altaDeudor: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  mandatario: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string };
  fechaMandato: string;
}

export interface SoporteDocumentalMandato {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface DatosGMandatos {
  mecanismoPago: string;
  MunicipioOrganismoMandante: any;
}

export interface Mandato {
  Id: string;
  datosGMandatos: DatosGMandatos;
  TipoMovimiento: TipoMovimientoMandato[];
  SoporteDocumental: SoporteDocumentalMandato[];
}

export interface MandatoSlice {
  idMandato: string;
  mandatoSelect: Mandato[];
  setMandatoSelect: (mandato: Mandato[]) => void;

  numeroMandato: string;

  datosGMandatos: DatosGMandatos;

  tipoMovimientoMandato: TipoMovimientoMandato;
  soporteDocumentalMandato: SoporteDocumentalMandato;

  tablaTipoMovimientoMandato: TipoMovimientoMandato[];
  tablaSoporteDocumentalMandato: SoporteDocumentalMandato[];
  tablaMandatos: IDatosMandatos[];

  borrarMandato: (Id: string) => void;

  changeIdMandato: (Id: string) => void;

  changeNumeroMandato: (Id: string) => void;

  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => void;

  setDatosGMandatos: (
    datosGMandatos: DatosGMandatos
  ) => void;

  setTipoMovimientoMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato
  ) => void;

  setSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => void;

  addTipoMovimientoMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato
  ) => void;

  addSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => void;

  removeTipoMovimientoMandato: (index: number) => void;
  removeSoporteDocumentalMandato: (index: number) => void;

  cleanTipoMovimientoMandato: () => void;
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
  idMandato: "",
  mandatoSelect: [],

  setMandatoSelect: (mandato: Mandato[]) => {
    set((state) => ({
      mandatoSelect: mandato,
    }));
  },

  datosGMandatos: {
    mecanismoPago: "Mandato",
    MunicipioOrganismoMandante: localStorage.getItem("EntePublicoObligado"),
  },

  numeroMandato: "",

  tipoMovimientoMandato: {
    altaDeudor: "NO",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    mandatario: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "" },
    fechaMandato: new Date().toString(),
  },

  soporteDocumentalMandato: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date().toString(),
  },

  tablaTipoMovimientoMandato: [],
  tablaSoporteDocumentalMandato: [],
  tablaMandatos: [],

  catalogoMandatario: [],
  catalogoMandato: [],

  setTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => {
    set(() => ({
      tipoMovimientoMandato: {
        altaDeudor: tipoMovimientoMandato.altaDeudor,
        tipoEntePublicoObligado: {
          Id: tipoMovimientoMandato.tipoEntePublicoObligado.Id,
          Descripcion:
            tipoMovimientoMandato.tipoEntePublicoObligado.Descripcion,
        },
        mandatario: {
          Id: tipoMovimientoMandato.mandatario.Id,
          Descripcion: tipoMovimientoMandato.mandatario.Descripcion,
        },
        tipoFuente: {
          Id: tipoMovimientoMandato.tipoFuente.Id,
          Descripcion: tipoMovimientoMandato.tipoFuente.Descripcion,
        },
        fondoIngreso: {
          Id: tipoMovimientoMandato.fondoIngreso.Id,
          Descripcion: tipoMovimientoMandato.fondoIngreso.Descripcion,
        },
        fechaMandato: tipoMovimientoMandato.fechaMandato,
      },
    }));
  },

  setSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => {
    set(() => ({
      soporteDocumentalMandato: soporteDocumentalMandato,
    }));
  },

  setDatosGMandatos: (datosGMandatos: DatosGMandatos) => {
    set(() => ({
      datosGMandatos: datosGMandatos
    }));
  },

  addTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => {
    set((state) => ({
      tablaTipoMovimientoMandato: [
        ...state.tablaTipoMovimientoMandato,
        tipoMovimientoMandato,
      ],
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

  removeTipoMovimientoMandato: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoMandato: state.tablaTipoMovimientoMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },

  removeSoporteDocumentalMandato: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: state.tablaSoporteDocumentalMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },

  cleanTipoMovimientoMandato: () => {
    set(() => ({
      tipoMovimientoMandato: {
        altaDeudor: "NO",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "" },
        fechaMandato: new Date().toString(),
      },
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

  changeIdMandato: (Id: any) => {
    set(() => ({
      idMandato: Id,
    }));
  },
  changeNumeroMandato: (NumeroMandato: any) => {
    set(() => ({
      numeroMandato: NumeroMandato,
    }));
  },

  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => {
    set((state) => ({
      tablaTipoMovimientoMandato: tipoMovimientoMandato,
      tablaSoporteDocumentalMandato: soporteDocumentalMandato,
    }));
  },

  getMandato: (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-mandato", {
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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mandato",
        {
          NumeroMandato: state.numeroMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: format(
            new Date(state.tipoMovimientoMandato.fechaMandato),
            "dd/MM/yyyy"
          ),
          Mandatario: "Nuevo León",
          MecanismoPago: state.datosGMandatos.mecanismoPago,
          MunicipioOrganismoMandante: state.datosGMandatos.MunicipioOrganismoMandante,
          //OrganismoMandante: localStorage.getItem("EntePublicoObligado"),
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoMandato),
          SoporteDocumental: JSON.stringify(state.tablaSoporteDocumentalMandato),
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
      })
  },

  modificaMandato: async () => {
    const state = useMandatoStore.getState();
    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-mandato",
        {
          IdMandato: state.idMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: format(
            new Date(state.tipoMovimientoMandato.fechaMandato),
            "dd/MM/yyyy"
          ),
          Mandatario: "Nuevo León",
          Mecanismo: "Mandato",
          MunicipioOrganismoMandante: localStorage.getItem("EntePublicoObligado"),
          //OrganismoMandante: localStorage.getItem("EntePublicoObligado"),
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoMandato),
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
      .delete(
        process.env.REACT_APP_APPLICATION_BACK + "/api/delete-Mandato",
        {
          data: {
            IdMandato: Id,
            IdUsuario: localStorage.getItem("IdUsuario"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
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
        altaDeudor: "NO",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "" },
        fechaMandato: new Date().toString(),
      },
      soporteDocumentalMandato: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
      tablaTipoMovimientoMandato: [],
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
          .catch((e) => { });
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
        process.env.REACT_APP_APPLICATION_BACK +
        "/api/create-addPathDocMandato",
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
      .then((r) => { })
      .catch((e) => { });
  },

  arrDocs: [],

  setArrDocs(arr: any) {
    set((state) => ({
      arrDocs: arr,
    }));
  },
});