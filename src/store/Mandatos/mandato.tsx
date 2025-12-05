import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { IDatosMandatos } from "../../screens/fuenteDePago/Mandatos";
import { useMandatoStore } from "./main";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { alertaConfirmCancelar, alertaConfirmCancelarError } from "../../generics/Alertas";
import { ISoporteDocumentalFuentePago } from "../Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../Fideicomiso/main";

export interface IDatosGeneralesMandato {
  numeroMandato: string;
  fechaMandato: Date;
  mandatario: { Id: string; Descripcion: string };
  mandante: { Id: string; Descripcion: string };
}

export interface IDeudorMandatoNew {
  id: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string }; //tipoFideicomitente
  mandatario: { Id: string; Descripcion: string }; //fideicomitente
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string; TipoDeFuente: string };
  AfectadoTotalIngreso: number;
  EquivalenciaCorrespondienteMunicipios: number;
}

// export interface IDeudorMandato {
//   id: string;
//   tipoEntePublicoObligado: { Id: string; Descripcion: string };
//   mandatario: { Id: string; Descripcion: string };
//   tipoFuente: { Id: string; Descripcion: string };
//   fondoIngreso: { Id: string; Descripcion: string; TipoDeFuente: string };
//   fondoIngresoGobiernoEstatal: string;
//   fondoIngresoMunicipios: string;
//   fondoIngresoAsignadoMunicipio: string;
//   ingresoOrganismo: string;
//   fondoIngresoAfectadoXGobiernoEstatal: string;
//   afectacionGobiernoEstatalEntre100: string;
//   acumuladoAfectacionGobiernoEstatalEntre100: string;
//   fondoIngresoAfectadoXMunicipio: string;
//   acumuladoAfectacionMunicipioEntreAsignadoMunicipio: string;
//   ingresoAfectadoXOrganismo: string;
//   acumuladoAfectacionOrganismoEntre100: string;
// }

export interface IBeneficiarioMandato {
  tipoBeneficiario: { Id: string; Descripcion: string };
  beneficiario: { Id: string; Descripcion: string };
  fechaAlta: Date;
}

// export interface ISoporteDocumentalMandato {
//   tipo: string;
//   archivo: File;
//   nombreArchivo: string;
//   fechaArchivo: Date;
// }

export interface IMandato {
  id: string;
  datosGenerales: IDatosGeneralesMandato;
  tipoMovimientoDeudor: IDeudorMandatoNew[];
  soporteDocumental: ISoporteDocumentalFuentePago[];
}

export interface MandatoSlice {
  tablaMandatos: IDatosMandatos[];

  idMandato: string;
  setIdMandato: (Id: string) => void;

  datosGenerales: IDatosGeneralesMandato;
  tipoMovimiento: IDeudorMandatoNew;
  beneficiario: IBeneficiarioMandato;
  soporteDocumental: ISoporteDocumentalFuentePago;

  idTipoMovimientoSelect: string;
  setIdTipoMovimientoSelect: (id: string) => void;

  tablaTipoMovimientoMandato: IDeudorMandatoNew[];
  tablaSoporteDocumentalMandato: ISoporteDocumentalFuentePago[];

  cleanMandato: () => void;

  editarMandato: (
    id: string,
    datosGenerales: IDatosGeneralesMandato,
    tipoMovimiento: IDeudorMandatoNew[],
    soporteDocumental: ISoporteDocumentalFuentePago[]
  ) => void;

  setDatosGenerales: (datosGenerales: IDatosGeneralesMandato) => void;
  setTipoMovimiento: (tipoMovimiento: IDeudorMandatoNew) => void;
  setBeneficiario: (beneficiario: IBeneficiarioMandato) => void;
  setSoporteDocumental: (soporteDocumental: ISoporteDocumentalFuentePago) => void;

  addTipoMovimiento: (tipoMovimiento: IDeudorMandatoNew) => void;
  addSoporteDocumental: (soporteDocumental: ISoporteDocumentalFuentePago) => void;

  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  addPorcentaje: (tipoMovimiento: IDeudorMandatoNew) => void;

  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getMandatos: (setState: Function) => void;
  createMandato: (
    setLoading: Function
  ) => void;
  modificaMandato: (stateOpen: Function, setLoading: Function) => void;
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




  // tipoMovimientoMandatoNew: IDeudorMandatoNew;
  // tablaTipoMovimientoMandatoNew: IDeudorMandatoNew[];
  // setTipoMovimientoNew: (tipoMovimientoNew: IDeudorMandatoNew) => void;
  // addTipoMovimientoNew: (tipoMovimientoNew: IDeudorMandatoNew) => void;
  // removeTipoMovimientoNew: (index: number) => void;
  // cleanTipoMovimientoNew: () => void;

  // editarMandatoNew: (
  //   id: string,
  //   datosGenerales: IDatosGeneralesMandato,
  //   tipoMovimiento: IDeudorMandatoNew[],
  //   soporteDocumental: ISoporteDocumentalMandato[]
  // ) => void;

  updateTipoMovimientoField: (
    index: number,
    field: keyof Pick<IDeudorMandatoNew, 'AfectadoTotalIngreso' | 'EquivalenciaCorrespondienteMunicipios'>,
    value: number
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
      Id: "",
      Descripcion: "",
    },
  },

  tipoMovimiento: {
    id: "",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    mandatario: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
    AfectadoTotalIngreso: 0,
    EquivalenciaCorrespondienteMunicipios: 0
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
    fechaArchivo: new Date(),
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
          Id: "",
          Descripcion: "",
        },
      },

      tipoMovimiento: {
        id: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0
      },
      tablaTipoMovimientoMandato: [],

      soporteDocumental: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
      },
      tablaSoporteDocumentalMandato: [],
    }));
  },

  editarMandato: (
    id: string,
    datosGenerales: IDatosGeneralesMandato,
    tipoMovimiento: IDeudorMandatoNew[],
    soporteDocumental: ISoporteDocumentalFuentePago[]
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
  setTipoMovimiento: (tipoMovimiento: IDeudorMandatoNew) => {
    set(() => ({
      tipoMovimiento: tipoMovimiento,
    }));
  },
  setBeneficiario: (beneficiario: IBeneficiarioMandato) => {
    set(() => ({
      beneficiario: beneficiario,
    }));
  },
  setSoporteDocumental: (soporteDocumental: ISoporteDocumentalFuentePago) => {
    set(() => ({
      soporteDocumental: soporteDocumental,
    }));
  },

  addTipoMovimiento: (tipoMovimiento: IDeudorMandatoNew) => {
    set((state) => ({
      tablaTipoMovimientoMandato: [
        ...state.tablaTipoMovimientoMandato,
        tipoMovimiento,
      ],
    }));
  },
  addSoporteDocumental: (soporteDocumental: ISoporteDocumentalFuentePago) => {
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
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0
      },
    }));
  },

  cleanSoporteDocumental: () => {
    set(() => ({
      soporteDocumental: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
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

  createMandato: async (
    setLoading: Function
  ) => {
    const state = useMandatoStore.getState();
    const SaveFile = useCortoPlazoStore.getState();

    // let acumuladoEstado = 0;
    // let acumuladoMunicipio = 0;
    // let acumuladoOrganismo = 0;

    // // eslint-disable-next-line array-callback-return
    // state.tablaTipoMovimientoMandato.map((v: any, index: number) => {
    //   acumuladoEstado += parseFloat(
    //     v.fondoIngresoAfectadoXGobiernoEstatal || 0
    //   );
    //   acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
    //   acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    // });

    const tipoMovimeintoNew = state.tablaTipoMovimientoMandato.map(({
      id,
      tipoEntePublicoObligado,
      mandatario,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios,
    }) => ({
      id,
      tipoEntePublicoObligado,
      mandatario,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios,
    })
    );

    console.log("ENDPOINT CREAR MANDATO: ")
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
          TipoMovimiento: JSON.stringify(tipoMovimeintoNew),

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

        console.log("ENDPOINT CREO MANDATO: ", data.data)
        state.setIdMandato(data.data.Id);
        SaveFile.saveFilesFuentesPago(
          "Mandato",
          state.tablaSoporteDocumentalMandato,
          data.data.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/MANDATOS/${data.data.Id}`,
          setLoading
        );
        // state.saveFilesMandato(
        //   data.data.Id,
        //   `/SRPU/MANDATOS/${data.data.Id}`,
        //   setLoading
        // );

        alertaConfirmCancelar("El mandato se ha creado exitosamente")

      })
      .catch(() => {

        alertaConfirmCancelarError("Ha sucedido un error, inténtelo de nuevo")
      });
  },

  modificaMandato: async (stateOpen: Function, setLoading: Function) => {
    const state = useMandatoStore.getState();
    const SaveFile = useCortoPlazoStore.getState();
    // const SaveFile = useFideicomisoStore.getState();

    // let acumuladoEstado = 0;
    // let acumuladoMunicipio = 0;
    // let acumuladoOrganismo = 0;

    // // eslint-disable-next-line array-callback-return
    // state.tablaTipoMovimientoMandato.map((v: any, index: number) => {
    //   acumuladoEstado += parseFloat(
    //     v.fondoIngresoAfectadoXGobiernoEstatal || 0
    //   );
    //   acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
    //   acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    // });


    const tipoMovimeintoNew = state.tablaTipoMovimientoMandato.map(({
      id,
      tipoEntePublicoObligado,
      mandatario,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios,
    }) => ({
      id,
      tipoEntePublicoObligado,
      mandatario,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios,
    })
    );

    const soporteDocumentalPrueba = state.tablaSoporteDocumentalMandato.map(({
      tipo, archivo, nombreArchivo, fechaArchivo }) => ({
        tipo,
        archivo,
        nombreArchivo,
        fechaArchivo,
      })
    );


    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-mandato",
        {
          IdMandato: state.idMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: state.datosGenerales.fechaMandato,
          Mandatario: state.datosGenerales.mandatario.Descripcion,
          MunicipioOrganismoMandante: state.datosGenerales.mandante.Descripcion,
          TipoMovimiento: JSON.stringify(tipoMovimeintoNew),
          SoporteDocumental: JSON.stringify(
            soporteDocumentalPrueba
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
        //cpState.deleteFiles(`/SRPU/MANDATOS/${data.result.Id}`);

        console.log("data.result.id", data.result.Id)
        //console.log("data.data.id", data.data.id)

        SaveFile.saveFilesFuentesPago(
          "Mandato",
          soporteDocumentalPrueba,
          data.result.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/MANDATOS/${data.result.Id}`,
          setLoading,
        );
        alertaConfirmCancelar("El mandato se ha modificado exitosamente")

      })
      .catch(function (error) {
        console.log(error);

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
            .catch((e) => { });
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
      .catch((e) => { });
  },

  tipoMovimientoMandatoNew: {

    id: "",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    mandatario: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },

    AfectadoTotalIngreso: 0,
    EquivalenciaCorrespondienteMunicipios: 0,
  },

  // beneficiarioNew: {
  //   tipoBeneficiario: { Id: "", Descripcion: "" },
  //   beneficiario: { Id: "", Descripcion: "" },
  //   fechaAlta: new Date(),
  // },

  tablaTipoMovimientoMandatoNew: [],

  // setBeneficiarioNew: (beneficiarioNew: IBeneficiarioFideicomiso) => {
  //   set(() => ({
  //     beneficiarioNew: beneficiarioNew,
  //   }));
  // },
  // setTipoMovimientoNew: (tipoMovimientoNew: IDeudorMandatoNew) => {
  //   set(() => ({
  //     tipoMovimientoMandatoNew: tipoMovimientoNew,
  //   }));
  // },

  // addTipoMovimientoNew: (tipoMovimientoNew: IDeudorMandatoNew) => {
  //   set((state) => ({
  //     tablaTipoMovimientoMandatoNew: [
  //       ...state.tablaTipoMovimientoMandatoNew,
  //       tipoMovimientoNew,
  //     ],
  //   }));
  // },

  // removeTipoMovimientoNew: (index: number) => {
  //   set((state) => ({
  //     tablaTipoMovimientoMandatoNew:
  //       state.tablaTipoMovimientoMandatoNew.filter((_, i) => i !== index),
  //   }));
  // },
  // cleanTipoMovimientoNew: () => {
  //   set(() => ({
  //     tipoMovimientoMandatoNew: {
  //       id: "",
  //       tipoEntePublicoObligado: { Id: "", Descripcion: "" },
  //       mandatario: { Id: "", Descripcion: "" },
  //       tipoFuente: { Id: "", Descripcion: "" },
  //       fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },

  //       AfectadoTotalIngreso: 0,
  //       EquivalenciaCorrespondienteMunicipios: 0,
  //     },
  //   }));
  // },

  editarMandatoNew: (
    id: string,
    datosGenerales: IDatosGeneralesMandato,
    tipoMovimiento: IDeudorMandatoNew[],
    soporteDocumental: ISoporteDocumentalFuentePago[]
  ) => {
    set((state) => ({
      idMandato: id,
      datosGenerales: datosGenerales,
      tablaTipoMovimientoMandatoNew: tipoMovimiento,
      tablaSoporteDocumentalMandato: soporteDocumental,
    }));
  },

  updateTipoMovimientoField: (index, field, value) => {
    set((state) => {
      const updatedTabla = state.tablaTipoMovimientoMandato.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );
      return { tablaTipoMovimientoMandato: updatedTabla };
    });
  },

});
