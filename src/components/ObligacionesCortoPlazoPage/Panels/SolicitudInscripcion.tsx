import * as React from "react";
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
import { ConfirmacionDescargaSolicitud } from "../dialogs/ConfirmacionDescargaSolicitud";
import { ConfirmacionBorradorSolicitud } from "../dialogs/ConfirmacionBorradorSolicitud";
import { ConfirmacionCancelarSolicitud } from "../dialogs/ConfirmacionCancelarSolicitud";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

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

export function SolicitudInscripcion() {
  const [checkObj, setCheckObj] = React.useState<checkBoxType>({});
  let [a] = React.useState(new Array());

  const [openDialog, changeOpenDialog] = React.useState(false);
  const changeOpenDialogState = (open: boolean) => {
    changeOpenDialog(open);
  };

  const [openDialogBorrador, changeOpenDialogBorrador] = React.useState(false);
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
      return <Typography sx={queries.medium_text}>AUTORIZAR</Typography>;
    } else if (localStorage.getItem("Rol") === "Administrador") {
      return <Typography sx={queries.medium_text}>FIRMAR</Typography>;
    }
  };

  React.useEffect(() => {
    getReglas();
  }, []);

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

        {/* <Grid item md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Documento de autorización
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={documentoAutorizado}
            onChange={(text) => changeDocumentoAutorizado(text.target.value)}
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
        </Grid> */}

        {/* <Grid item md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Identificación</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={identificacion}
            onChange={(text) => changeIdentificacion(text.target.value)}
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
        </Grid> */}
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
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell padding="checkbox">
                            <Checkbox
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
                                  ? (a[index] = row.Descripcion)
                                  : delete a[index];

                                changeReglasAplicables(a);
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
              changeOpenDialogState(!openDialog);
            }}
          >
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>FINALIZAR</Typography>
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
