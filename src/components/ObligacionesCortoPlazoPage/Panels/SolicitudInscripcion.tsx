import * as React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Grid,
  InputLabel,
  TextField,
  Divider,
  Checkbox,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Fab,
  Typography,
  TableRow,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import CancelIcon from "@mui/icons-material/Cancel";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { ConfirmacionDescargaSolicitud } from "../Dialogs/ConfirmacionDescargaSolicitud";
import { ConfirmacionBorradorSolicitud } from "../Dialogs/ConfirmacionBorradorSolicitud";
import { ConfirmacionCancelarSolicitud } from "../Dialogs/ConfirmacionCancelarSolicitud";
import { styled } from "@mui/material/styles";

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Selección",
  },
  {
    label: "Regla",
  },
];
export let errores: string[] = [];
export function SolicitudInscripcion() {
  const [checkObj, setCheckObj] = React.useState<checkBoxType>({});

  const [openDialog, changeOpenDialog] = useState(false);
  const changeOpenDialogState = (open: boolean) => {
    changeOpenDialog(open);
  };

  const [openDialogBorrador, changeOpenDialogBorrador] = useState(false);
  const changeOpenDialogBorradorState = (open: boolean) => {
    changeOpenDialogBorrador(open);
  };

  const [openDialogCancelar, changeOpenDialogCancelar] = React.useState(false);
  const changeOpenDialogCancelarState = (open: boolean) => {
    changeOpenDialogCancelar(open);
  };
  const nombreServidorPublico: string = useCortoPlazoStore(
    (state) => state.inscripcion.servidorPublicoDirigido
  );
  const cargoServidorPublico: string = useCortoPlazoStore(
    (state) => state.inscripcion.cargo
  );
  const solicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const catalogoReglas: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoReglas
  );
  const changeReglasAplicables: Function = useCortoPlazoStore(
    (state) => state.changeReglasAplicables
  );

  const getReglas: Function = useCortoPlazoStore((state) => state.getReglas);

  const buttodescription = () => {
    if (localStorage.getItem("Rol") === "Capturador") {
      return <Typography sx={queries.medium_text}>CAPTURAR</Typography>;
    } else if (localStorage.getItem("Rol") === "Verificador") {
      return (
        <Typography sx={queries.medium_text}>FINALIZAR SOLICITUD</Typography>
      );
    } else if (localStorage.getItem("Rol") === "Administrador") {
      return <Typography sx={queries.medium_text}>FINALIZAR</Typography>;
    }
  };

  const buttonEstatus = () => {
    if (localStorage.getItem("Rol") === "Verificador") {
      return (
        <Typography sx={queries.medium_text}>ENVIAR A ADMINISTRADOR</Typography>
      );
    } else if (localStorage.getItem("Rol") === "Administrador") {
      return <Typography sx={queries.medium_text}> FINALIZAR</Typography>;
    }
  };

  const [numero, setNumero] = useState(0);
  const opciones = (numero: number) => {
    if (localStorage.getItem("Rol") === "Capturador") {
      return (
        <Grid
          item
          position="fixed"
          sx={{ top: "auto", bottom: 50, left: window.innerWidth - 300 }}
        >
          <Fab
            variant="extended"
            color="error"
            onClick={() => {
              changeOpenDialogCancelarState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CancelIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>Cancelar</Typography>
          </Fab>

          {localStorage.getItem("Rol") !== "Capturador" && (
            <Fab variant="extended" color="success" sx={{ mb: "10px" }}>
              <CheckIcon sx={{ mr: 1 }} />
              {buttonEstatus()}
            </Fab>
          )}

          <Fab
            variant="extended"
            color="success" //onClick={() => crearSolicitud(selected)}
            onClick={() => {
              changeOpenDialogBorradorState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>BORRADOR</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            onClick={() => {
              // changeOpenDialogUsuariosState(!openDialogUsuarios)
              changeOpenDialogState(!openDialog);
            }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            {buttodescription()}
          </Fab>
        </Grid>
      );
    } else if (localStorage.getItem("Rol") === "Verificador") {
      return (
        <Grid
          item
          position="fixed"
          sx={{ top: "auto", bottom: 50, left: window.innerWidth - 300 }}
        >
          <Fab
            variant="extended"
            color="error"
            onClick={() => {
              changeOpenDialogCancelarState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CancelIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>Cancelar</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            onClick={() => {
              numero = 2;

              setNumero(numero);
              changeOpenDialogState(!openDialog);
            }}
            sx={{
              mb: "10px",
              // "&:disabled": { backgroundColor: "#D42C2C", color: "white" },
            }}
            //disabled={IdSolicitud === ""}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>
              SOLICITAR MODIFICACION
            </Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success" //onClick={() => crearSolicitud(selected)}
            onClick={() => {
              changeOpenDialogBorradorState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>BORRADOR</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            onClick={() => {
              numero = 1;

              setNumero(numero);
              changeOpenDialogState(!openDialog);
            }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            {buttodescription()}
          </Fab>
        </Grid>
      );
    } else if (localStorage.getItem("Rol") === "Administrador") {
      return (
        <Grid
          item
          position="fixed"
          sx={{ top: "auto", bottom: 50, left: window.innerWidth - 300 }}
        >
          <Fab
            variant="extended"
            color="error"
            onClick={() => {
              changeOpenDialogCancelarState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CancelIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>Cancelar</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            sx={{ mb: "10px" }}
            disabled={
              localStorage.getItem("Rol") === "Capturador"
                ? false
                : localStorage.getItem("Rol") === "Verificador"
                ? false
                : localStorage.getItem("Rol") === "Administrador"
                ? false
                : true
            }
          >
            <CheckIcon sx={{ mr: 1 }} />
            {buttonEstatus()}
          </Fab>

          <Fab
            variant="extended"
            color="success" //onClick={() => crearSolicitud(selected)}
            onClick={() => {
              changeOpenDialogBorradorState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>BORRADOR</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            onClick={() => {
              changeOpenDialogState(!openDialog);
            }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            {buttodescription()}
          </Fab>
        </Grid>
      );
    }
  };

  const reglasAplicables:  string[] = useCortoPlazoStore(
    (state) => state.reglasAplicables
  ) 
   
  React.useEffect(() => {
    getReglas();
  }, []);
  let err = 0;

  const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    // confirmButtonColor: "red",
    // confirmButtonText: "De acuerdo",
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const InfoFaltante = () => {
    errores = [];

    const state = useCortoPlazoStore.getState();
    const solicitud: any = {
      encabezado: state.encabezado,
      MontoOriginalContratado: state.informacionGeneral.monto,
      PlazoDias: state.informacionGeneral.plazo,
      Destino: state.informacionGeneral.destino.Descripcion,
      Denominacion: state.informacionGeneral.denominacion,
      InstitucionFinanciera:
        state.informacionGeneral.institucionFinanciera.Descripcion,
    };
    /////////////////// Por definir /////////////////////
    let entePublicoObligado = "";
    let obligadoSolidario = "";
    let tipoEntePublicoObligado = "";

    for (let i = 0; i < state.tablaObligadoSolidarioAval.length; i++) {
      const item = state.tablaObligadoSolidarioAval[0];
      entePublicoObligado = item.entePublicoObligado;
      obligadoSolidario = item.obligadoSolidario;
      tipoEntePublicoObligado = item.tipoEntePublicoObligado;
    }
    ///////////////////   Condiciones Financieras /////////////////////
    let importe = 0;
    let numeroDePago = 0;
    let PeriocidadDePago = "";
    let diasEjercicio = "";
    let tasaEfectiva = "";
    let comisiones: any = [];
    let TasaDeInteres: any = [];

    for (let i = 0; i < state.tablaCondicionesFinancieras.length; i++) {
      const item = state.tablaCondicionesFinancieras[0];
      importe = item.disposicion.importe;
      numeroDePago = item.pagosDeCapital.numeroDePago;
      PeriocidadDePago = item.pagosDeCapital.periodicidadDePago;
      TasaDeInteres = item.tasaInteres;
      diasEjercicio = item.diasEjercicio;
      tasaEfectiva = item.tasaEfectiva;
      comisiones = item.comisiones;
    }
    ////////////////////////// Documentos //////////////////////////
    console.log("reglasAplicables: EN solicitud de inscripcion",state.reglasAplicables);
    
    //////////////////
    if (
      solicitud.PlazoDias === undefined ||
      solicitud.PlazoDias === 0 ||
      /^[\s]*$/.test(solicitud.PlazoDias)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:El Plazo a Días no puede ser  0."
      );
    }

    if (
      solicitud.MontoOriginalContratado === undefined ||
      solicitud.MontoOriginalContratado === 0 ||
      /^[\s]*$/.test(solicitud.MontoOriginalContratado)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:Ingrese un Monto original contratado valido."
      );
    }
    if (
      solicitud.Destino === undefined ||
      solicitud.Destino === "" ||
      /^[\s]*$/.test(solicitud.Destino)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:Seleccione  el Destino."
      );
    }
    if (
      solicitud.InstitucionFinanciera === undefined ||
      solicitud.InstitucionFinanciera === "" ||
      /^[\s]*$/.test(solicitud.InstitucionFinanciera)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Información General</strong>:Seleccione la Institución Financiera."
      );
    }

    if (
      state.tablaCondicionesFinancieras[0] === undefined ||
      state.tablaCondicionesFinancieras[0] === null
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agruege al menos una Condicion Financiera."
      );
    }

    if (TasaDeInteres[0] === undefined || TasaDeInteres[0].tasa === "") {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agruege al menos una Tasa De Interés."
      );
    }
    if (importe === undefined || importe === 0) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Ingrese el Importe."
      );
    }
    if (numeroDePago === undefined || numeroDePago === 0) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Ingrese el Numero de pagos."
      );
    }
    if (
      PeriocidadDePago === undefined ||
      PeriocidadDePago === "" ||
      /^[\s]*$/.test(PeriocidadDePago)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Seleccione la periocidad de pago."
      );
    }
    if (
      diasEjercicio === undefined ||
      diasEjercicio === "" ||
      /^[\s]*$/.test(diasEjercicio)
    ) {
      err = 1;

      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Seleccione los Díaz del Ejercicio."
      );
    }
    if (
      tasaEfectiva === undefined ||
      tasaEfectiva === "" ||
      /^[\s]*$/.test(tasaEfectiva)
    ) {
      err = 1;
      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Ingrese la tasa Efectiva."
      );
    }

    if (comisiones[0] === undefined || comisiones[0].tipoDeComision === "") {
      errores.push(
        "Sección <strong>Condiciones Financieras</strong>:Agregue al menos una comision."
      );
    }

    if (
      state.reglasAplicables[0] === undefined ||
      state.reglasAplicables[0] === ""
    ) {
      errores.push(
        "Sección <strong>Solicitud de Inscripción</strong>:Agregue al menos una regla."
      );
    }
  };
  
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  let arrReglas:Array<string>=[]
  arrReglas=reglasAplicables;
  useEffect(() => {
    //  setSelectedItems(reglasAplicables)
     console.log("reglasAplicables:",reglasAplicables);
     
    //  console.log("selectedItems:",selectedItems);
   }, [])

  const removeRegla=(descripcion: string)=>{
    let aux:Array<string>=[]
    arrReglas.map((regla,index)=>{if(regla!==descripcion){aux.push(regla)}})
    arrReglas=aux;
    changeReglasAplicables(arrReglas);
  }
  return (
    <Grid item container>
      <Grid
        item
        container
        flexDirection="row"
        mt={{ sm: 0, md: 0, lg: 0 }}
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 10, lg: 10 }}
      >
        <Grid item md={4.5} lg={4.5}>
          <InputLabel sx={queries.medium_text}>
            Servidor publico a quien va dirigido
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={nombreServidorPublico}
            // onChange={(text) => changeServidorPublico(text.target.value)}
            disabled
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item md={4.5} lg={4.5}>
          <InputLabel sx={queries.medium_text}>Cargo</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={cargoServidorPublico}
            // onChange={(text) => changeCargo(text.target.value)}
            disabled
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        flexDirection="row"
        mt={4}
        mb={4}
        justifyContent={"center"}
      >
        <Grid item md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <TextField
            disabled
            fullWidth
            variant="standard"
            value={
              solicitanteAutorizado || localStorage.getItem("NombreUsuario")
            }
            // onChange={(text) => changeSolicitanteAutorizado(text.target.value)}
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        //flexDirection="row"
        justifyContent={"center"}
        alignItems={"flex-start"}
        spacing={{ md: 10, lg: 10 }}
      >
        <Grid item md={9} lg={9} xl={9}>
          <Divider sx={queries.medium_text}>
            Declaratorias aplicables al financiamiento u obligación.
          </Divider>
        </Grid>
        <Grid item md={9} lg={9} xl={9}>
          <Grid container direction="column">
            <Grid item>
              <TableContainer
                sx={{
                  height: "50vh",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".2vw",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {heads.map((head, index) => (
                        <StyledTableCell key={index}>
                          <TableSortLabel>{head.label}</TableSortLabel>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {catalogoReglas.map((row, index) => {
                      // const stringIndex = index.toString()
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell padding="checkbox">
                            <Checkbox
                            checked ={reglasAplicables.includes(row.Descripcion)}
                            
                              disabled={
                                (checkObj[1] === true && index === 2) ||
                                (checkObj[2] === true && index === 1) ||
                                (checkObj[3] === true && index === 4) ||
                                (checkObj[4] === true && index === 3)
                              }
                              onChange={(v) => {
                                
                                v.target.checked
                                  ? setCheckObj({ ...checkObj, [index]: true })
                                  : setCheckObj({
                                      ...checkObj,
                                      [index]: false,
                                    });

                                    v.target.checked
                                  ? (arrReglas.push(row.Descripcion))
                                  : removeRegla(row.Descripcion);
                                  ;
                                  //
                                  
                                // changeReglasAplicables(reglasAplicables)
                                // setSelectedItems(reglasAplicables)
                                //console.log("selectedItems: ",selectedItems);
                                changeReglasAplicables(arrReglas);
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell>{row.Descripcion}</StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          position="fixed"
          sx={{ top: "auto", bottom: 50, left: window.innerWidth - 300 }}
        >
          <Fab
            variant="extended"
            color="error"
            onClick={() => {
              changeOpenDialogCancelarState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CancelIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>Cancelar</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            sx={{ mb: "10px" }}
            disabled={
              localStorage.getItem("Rol") === "Capturador"
                ? false
                : localStorage.getItem("Rol") === "Verificador"
                ? false
                : localStorage.getItem("Rol") === "Administrador"
                ? false
                : true
            }
          >
            <CheckIcon sx={{ mr: 1 }} />
            {buttodescription()}
          </Fab>

          <Fab
            variant="extended"
            color="success" //onClick={() => crearSolicitud(selected)}
            onClick={() => {
              changeOpenDialogBorradorState(!openDialog);
            }}
            sx={{ mb: "10px" }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>BORRADOR</Typography>
          </Fab>

          <Fab
            variant="extended"
            color="success"
            onClick={() => {
              InfoFaltante();
              if (err === 0) {
                changeOpenDialogState(!openDialog);
              } else {
                Toast.fire({
                  icon: "error",
                  html: `
                  <div style="height:100%;">
                  <h3>Se han encontrado los siguientes errores:</h3>
                  <div style="text-align: left; margin-left: 10px; color: red; height: 400px; overflow: auto;">
                <small>
                <strong>
                *</strong>${errores.join("<br><strong>*</strong>")}
                </small>
                </div>
                </div>`,
                });
              }
            }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>-FINALIZAR-</Typography>
          </Fab>

          <ConfirmacionDescargaSolicitud
            handler={changeOpenDialogState}
            openState={openDialog}
            // selected={selected}
          />
          <ConfirmacionBorradorSolicitud
            handler={changeOpenDialogBorradorState}
            openState={openDialogBorrador}
            // selected={selected}
          />
          <ConfirmacionCancelarSolicitud
            handler={changeOpenDialogCancelarState}
            openState={openDialogCancelar}
            // selected={selected}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface checkBoxType {
  [key: string]: boolean | undefined;
}
