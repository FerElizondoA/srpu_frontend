import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { IDatosMandatos } from "../../screens/fuenteDePago/Mandatos";
import { useMandatoStore } from "./main";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { alertaConfirmCancelar, alertaConfirmCancelarError } from "../../generics/Alertas";

export interface IDatosGeneralesMandato {
  numeroMandato: string;
  fechaMandato: Date;
  mandatario: { Id: string; Descripcion: string };
  mandante: { Id: string; Descripcion: string };
}

export interface IDeudorMandato {
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

export interface IBeneficiarioMandato {
  tipoBeneficiario: { Id: string; Descripcion: string };
  beneficiario: { Id: string; Descripcion: string };
  fechaAlta: Date;
}

export interface ISoporteDocumentalMandato {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface IMandato {
  id: string;
  datosGenerales: IDatosGeneralesMandato;
  tipoMovimientoDeudor: IDeudorMandato[];
  soporteDocumental: ISoporteDocumentalMandato[];
}

export interface MandatoSlice {
  tablaMandatos: IDatosMandatos[];

  idMandato: string;
  setIdMandato: (Id: string) => void;

  datosGenerales: IDatosGeneralesMandato;
  tipoMovimiento: IDeudorMandato;
  beneficiario: IBeneficiarioMandato;
  soporteDocumental: ISoporteDocumentalMandato;

  idTipoMovimientoSelect: string;
  setIdTipoMovimientoSelect: (id: string) => void;

  tablaTipoMovimientoMandato: IDeudorMandato[];
  tablaSoporteDocumentalMandato: ISoporteDocumentalMandato[];

  cleanMandato: () => void;

  editarMandato: (
    id: string,
    datosGenerales: IDatosGeneralesMandato,
    tipoMovimiento: IDeudorMandato[],
    soporteDocumental: ISoporteDocumentalMandato[]
  ) => void;

  setDatosGenerales: (datosGenerales: IDatosGeneralesMandato) => void;
  setTipoMovimiento: (tipoMovimiento: IDeudorMandato) => void;
  setBeneficiario: (beneficiario: IBeneficiarioMandato) => void;
  setSoporteDocumental: (soporteDocumental: ISoporteDocumentalMandato) => void;

  addTipoMovimiento: (tipoMovimiento: IDeudorMandato) => void;
  addSoporteDocumental: (soporteDocumental: ISoporteDocumentalMandato) => void;

  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  addPorcentaje: (tipoMovimiento: IDeudorMandato) => void;

  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getMandatos: (setState: Function) => void;
  createMandato: (setLoading: Function) => void;
  modificaMandato: (setLoading: Function) => void;
  deleteMandato: (Id: string) => void;

  saveFilesMandato: (
    idRegistro: string,
    ruta: string,
    setLoading: Function
  ) => void;

  savePathDocMandato: (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string,
    setLoading: Function
  ) => void;
}

export const createMandatoSlice: StateCreator<MandatoSlice> = (set, get) => ({
  tablaMandatos: [],

  idMandato: "",
  setIdMandato: (Id: any) => {
    set(() => ({
      idMandato: Id,
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

  tipoMovimiento: {
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
  tablaTipoMovimientoMandato: [],

  beneficiario: {
    tipoBeneficiario: { Id: "", Descripcion: "" },
    beneficiario: { Id: "", Descripcion: "" },
    fechaAlta: new Date(),
  },

  idTipoMovimientoSelect: "",
  setIdTipoMovimientoSelect: (id: string) => {
    set(() => ({
      idTipoMovimientoSelect: id,
    }));
  },

  soporteDocumental: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date().toString(),
  },
  tablaSoporteDocumentalMandato: [],

  cleanMandato: () => {
    set(() => ({
      idMandato: "",

      datosGenerales: {
        numeroMandato: "",
        fechaMandato: new Date(),
        mandatario: { Id: "", Descripcion: "" },
        mandante: {
          Id: localStorage.getItem("IdEntePublicoObligado")!,
          Descripcion: localStorage.getItem("EntePublicoObligado")!,
        },
      },

      tipoMovimiento: {
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
      tablaTipoMovimientoMandato: [],

      soporteDocumental: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
      tablaSoporteDocumentalMandato: [],
    }));
  },

  editarMandato: (
    id: string,
    datosGenerales: IDatosGeneralesMandato,
    tipoMovimiento: IDeudorMandato[],
    soporteDocumental: ISoporteDocumentalMandato[]
  ) => {
    set((state) => ({
      idMandato: id,
      datosGenerales: datosGenerales,
      tablaTipoMovimientoMandato: tipoMovimiento,
      tablaSoporteDocumentalMandato: soporteDocumental,
    }));
  },

  setDatosGenerales: (datosGenerales: IDatosGeneralesMandato) => {
    set(() => ({
      datosGenerales: datosGenerales,
    }));
  },
  setTipoMovimiento: (tipoMovimiento: IDeudorMandato) => {
    set(() => ({
      tipoMovimiento: tipoMovimiento,
    }));
  },
  setBeneficiario: (beneficiario: IBeneficiarioMandato) => {
    set(() => ({
      beneficiario: beneficiario,
    }));
  },
  setSoporteDocumental: (soporteDocumental: ISoporteDocumentalMandato) => {
    set(() => ({
      soporteDocumental: soporteDocumental,
    }));
  },

  addTipoMovimiento: (tipoMovimiento: IDeudorMandato) => {
    set((state) => ({
      tablaTipoMovimientoMandato: [
        ...state.tablaTipoMovimientoMandato,
        tipoMovimiento,
      ],
    }));
  },
  addSoporteDocumental: (soporteDocumental: ISoporteDocumentalMandato) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: [
        ...state.tablaSoporteDocumentalMandato,
        soporteDocumental,
      ],
    }));
  },

  removeTipoMovimiento: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoMandato: state.tablaTipoMovimientoMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },
  removeSoporteDocumental: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: state.tablaSoporteDocumentalMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },

  addPorcentaje: (tipoMovimiento: any) => {
    set(() => ({ tablaTipoMovimientoMandato: tipoMovimiento }));
  },

  cleanTipoMovimiento: () => {
    set(() => ({
      tipoMovimiento: {
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

  cleanSoporteDocumental: () => {
    set(() => ({
      soporteDocumental: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
    }));
  },

  getMandatos: (setState: Function) => {
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

  createMandato: async (setLoading: Function) => {
    const state = useMandatoStore.getState();

    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    // eslint-disable-next-line array-callback-return
    state.tablaTipoMovimientoMandato.map((v: any, index: number) => {
      acumuladoEstado += parseFloat(
        v.fondoIngresoAfectadoXGobiernoEstatal || 0
      );
      acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
      acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    });

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-mandato",
        {
          NumeroMandato: state.datosGenerales.numeroMandato,
          FechaMandato: state.datosGenerales.fechaMandato,
          Mandatario: state.datosGenerales.mandatario.Descripcion,
          MunicipioOrganismoMandante: state.datosGenerales.mandante.Descripcion,
          TipoEntePublicoObligado:
            state.datosGenerales.mandante.Descripcion.split(" ")[0],
          MecanismoPago: "Mandato",
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoMandato),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalMandato
          ),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.setIdMandato(data.data.Id);
        state.saveFilesMandato(
          data.data.Id,
          `/SRPU/MANDATOS/${data.data.Id}`,
          setLoading
        );

        

        alertaConfirmCancelar("El mandato se ha creado exitosamente")

      })
      .catch(() => {
        
        alertaConfirmCancelarError("Ha sucedido un error, inténtelo de nuevo")
      });
  },

  modificaMandato: async (setLoading: Function) => {
    const state = useMandatoStore.getState();
    const cpState = useCortoPlazoStore.getState();

    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    // eslint-disable-next-line array-callback-return
    state.tablaTipoMovimientoMandato.map((v: any, index: number) => {
      acumuladoEstado += parseFloat(
        v.fondoIngresoAfectadoXGobiernoEstatal || 0
      );
      acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
      acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    });

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-mandato",
        {
          IdMandato: state.idMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: state.datosGenerales.fechaMandato,
          Mandatario: state.datosGenerales.mandatario.Descripcion,
          MunicipioOrganismoMandante: state.datosGenerales.mandante.Descripcion,
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoMandato),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
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
        state.setIdMandato(data.result.Id);
        cpState.deleteFiles(`/SRPU/MANDATOS/${data.result.Id}`);
        state.saveFilesMandato(
          data.result.Id,
          `/SRPU/MANDATOS/${data.result.Id}`,
          setLoading
        );
        alertaConfirmCancelar("El mandato se ha creado exitosamente")

      })
      .catch(function (error) {
        

        alertaConfirmCancelarError("Se encontró un error, verifique la información.")
      });
  },

  deleteMandato: async (Id: string) => {
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

  saveFilesMandato: async (
    idRegistro: string,
    ruta: string,
    setLoading: Function
  ) => {
    const state = useMandatoStore.getState();

    return await state.tablaSoporteDocumentalMandato.map((dato, index) => {
      return setTimeout(() => {
        const url = new File([dato.archivo], dato.nombreArchivo);

        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", url);

        if (dato.archivo.size > 0) {
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
                data.RESPONSE.NOMBREARCHIVO,
                setLoading
              );
            })
            .catch((e) => {});
        } else {
          return null;
        }
      }, 1000);
    });
  },

  savePathDocMandato: async (
    idMandato: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string,
    setLoading: Function
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
      .then((r) => {
        setLoading(false);
      })
      .catch((e) => {});
  },
});
