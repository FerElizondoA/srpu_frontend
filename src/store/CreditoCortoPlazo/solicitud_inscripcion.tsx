import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { useCortoPlazoStore } from "./main";
import Swal from "sweetalert2";
import { useInscripcionStore } from "../Inscripcion/main";
import { ISolicitudCortoPlazo } from "../Inscripcion/inscripcion";
import { log } from "console";

export interface SolicitudInscripcionSlice {
  inscripcion: {
    servidorPublicoDirigido: string;
    cargo: string;
  };

  reglasAplicables: string[];

  catalogoReglas: ICatalogo[];

  changeInscripcion: (servidorPublicoDirigido: string, cargo: string) => void;
  setReglasAplicables: (newReglas: string[]) => void;

  getReglas: () => void;

  crearSolicitud: (
    idEditor: string,
    estatus: string,
    comentario: string
  ) => void;

  modificaSolicitud: (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => void;

  borrarSolicitud: (Id: string) => void;

  addComentario: (
    idSolicitud: string,
    comentario: string,
    tipo: string
  ) => void;

  eliminarRequerimientos: (Id: string, setState: Function) => void;

  deleteFiles: (ruta: string) => void;

  saveFiles: (idRegistro: string, ruta: string) => void;

  guardaDocumentos: (idRegistro: string, ruta: string, archivo: File) => void;

  savePathDoc: (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;
}

export const createSolicitudInscripcionSlice: StateCreator<
  SolicitudInscripcionSlice
> = (set, get) => ({
  inscripcion: {
    servidorPublicoDirigido: "Rosalba Aguilar Díaz",
    cargo: "Directora de Deuda Pública y Planeación Financiera",
  },

  reglasAplicables: [],

  catalogoReglas: [],

  changeInscripcion: (inscripcion: any) => {
    set(() => ({ inscripcion: inscripcion }));
  },

  setReglasAplicables: (newReglas: any) =>
    set(() => ({ reglasAplicables: newReglas })),

  getReglas: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/get-reglaDeFinanciamiento",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoReglas: r,
        }));
      });
  },

  crearSolicitud: async (
    idEditor: string,
    estatus: string,
    comentario: string
  ) => {
    const state = useCortoPlazoStore.getState();
    const inscripcionState = useInscripcionStore.getState();

    const solicitud: ISolicitudCortoPlazo = {
      encabezado: state.encabezado,

      informacionGeneral: {
        informacionGeneral: state.informacionGeneral,
        obligadosSolidarios: state.tablaObligadoSolidarioAval.map(
          ({ entePublicoObligado, tipoEntePublicoObligado }) => ({
            entePublicoObligado,
            tipoEntePublicoObligado,
          })
        ),
      },

      condicionesFinancieras: state.tablaCondicionesFinancieras,

      documentacion: state.tablaDocumentos.map(
        ({ descripcionTipo, nombreArchivo, tipoArchivo }) => ({
          descripcionTipo,
          nombreArchivo,
          tipoArchivo,
        })
      ),
      inscripcion: {
        servidorPublicoDirigido: state.inscripcion.servidorPublicoDirigido,
        cargoServidorPublicoServidorPublicoDirigido: state.inscripcion.cargo,
        declaratorias: state.reglasAplicables,
      },
    };

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-solicitud",
        {
          IdTipoEntePublico: state.encabezado.tipoEntePublico.Id,
          IdEntePublico: state.encabezado.organismo.Id,
          TipoSolicitud: state.encabezado.tipoDocumento,
          IdInstitucionFinanciera:
            state.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          IdClaveInscripcion: `DDPYPF-${"CSCP"}/${new Date().getFullYear()}`,
          MontoOriginalContratado: state.informacionGeneral.monto,
          FechaContratacion: state.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.saveFiles(
          data.data.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS+`/CORTOPLAZO/DOCSOL/${data.data.Id}`
        );
        console.log('data create solicitud',data);
        
        inscripcionState.setInscripcion(data.data);

        console.log('data create solicitud 1');
        state.addComentario(data.data.Id, comentario, "Captura");
        console.log('data create solicitud 2');
        
        console.log('data create solicitud 3');
      });
  },

  modificaSolicitud: async (
    idCreador: string,
    idEditor: string,
    estatus: string,
    comentario: string
  ) => {
    const state = useCortoPlazoStore.getState();
    const inscripcionState = useInscripcionStore.getState();

    const solicitud: ISolicitudCortoPlazo = {
      encabezado: state.encabezado,

      informacionGeneral: {
        informacionGeneral: state.informacionGeneral,
        obligadosSolidarios: state.tablaObligadoSolidarioAval.map(
          ({ entePublicoObligado, tipoEntePublicoObligado }) => ({
            entePublicoObligado,
            tipoEntePublicoObligado,
          })
        ),
      },

      condicionesFinancieras: state.tablaCondicionesFinancieras,

      documentacion: state.tablaDocumentos.map(
        ({ descripcionTipo, nombreArchivo, tipoArchivo }) => ({
          descripcionTipo,
          nombreArchivo,
          tipoArchivo,
        })
      ),
      inscripcion: {
        servidorPublicoDirigido: state.inscripcion.servidorPublicoDirigido,
        cargoServidorPublicoServidorPublicoDirigido: state.inscripcion.cargo,
        declaratorias: state.reglasAplicables,
      },
    };

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-solicitud",
        {
          IdSolicitud: inscripcionState.inscripcion.Id,
          IdTipoEntePublico: state.encabezado.tipoEntePublico.Id,
          IdEntePublico: state.encabezado.organismo.Id,
          TipoSolicitud: state.encabezado.tipoDocumento,
          IdInstitucionFinanciera:
            state.informacionGeneral.institucionFinanciera.Id,
          Estatus: estatus,
          MontoOriginalContratado: state.informacionGeneral.monto,
          FechaContratacion: state.encabezado.fechaContratacion,
          Solicitud: JSON.stringify(solicitud),
          IdEditor: idEditor,
          IdUsuario: idCreador,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.deleteFiles(process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS+`/CORTOPLAZO/DOCSOL/${data.data.Id}`);
        state.saveFiles(
          data.data.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS+`/CORTOPLAZO/DOCSOL/${data.data.Id}`
        );
      });
  },

  borrarSolicitud: async (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      timer: 3000,
      timerProgressBar: true,
    });

    await axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-solicitud", {
        data: {
          IdSolicitud: Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            iconColor: "#AF8C55",
            showConfirmButton: false,
            color: "#AF8C55",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "No se elimino la solicitud.",
          iconColor: "#AF8C55",
          showConfirmButton: false,
          color: "#AF8C55",
        });
      });
    return false;
  },

  addComentario: async (Id: string, comentario: any, tipo: string) => {
    if (comentario.length !== 2) {
      await axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/create-comentario",
          {
            IdSolicitud: Id,
            Comentario: comentario,
            Tipo: tipo,
            IdUsuario: localStorage.getItem("IdUsuario"),
            IdComentario: useCortoPlazoStore.getState().idComentario,
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then(({ data }) => {
          useCortoPlazoStore.setState({
            comentarios: {},
            idComentario: "",
          });
        })
        .catch((e) => {});
    }
  },

  eliminarRequerimientos: async (Id: string, setState: Function) => {
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
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/delete-comentario",
        {
          Id: Id,
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        Toast.fire({
          icon: "success",
          title: "Comentario eliminado",
        });
        setState();
      })
      .catch((e) => {});
  },

  deleteFiles: async (ruta: string) => {
    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);

    return axios
      .post(
        process.env.REACT_APP_APPLICATION_FILES +
          "/api/ApiDoc/DeleteDirectorio",
        dataArray,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .catch((e) => {});
  },

  saveFiles: async (idRegistro: string, ruta: string) => {
    const state = useCortoPlazoStore.getState();
    console.log('state.getState',state);
    
    return await state.tablaDocumentos.map((file) => {
      return setTimeout(() => {
        const url = new File([file.archivo], file.nombreArchivo);

        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", url);
        // console.log('ip:',process.env.REACT_APP_APPLICATION_FILES  + "/api/ApiDoc/SaveFile");
        // console.log('file.archivo',file.archivo)
        // console.log('file',file);
        // console.log('file',file.archivo.size);
        if (file.archivo && file.archivo.size>0 ) {
          console.log('entre');
          
          return axios
            .post(
              process.env.REACT_APP_APPLICATION_FILES  + "/api/ApiDoc/SaveFile",
              dataArray,
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            )
            .then(({ data }) => {
              console.log('data response',data);
              
              state.savePathDoc(
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
    });
  },

  guardaDocumentos: async (idRegistro: string, ruta: string, archivo: File) => {
    const state = useCortoPlazoStore.getState();

    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);
    dataArray.append("ADDROUTE", "true");
    dataArray.append("FILE", archivo);

    if (archivo.size > 0) {
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
          state.savePathDoc(
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
  },

  savePathDoc: async (
    idSolicitud: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocSol",
        {
          IdSolicitud: idSolicitud,
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
});
