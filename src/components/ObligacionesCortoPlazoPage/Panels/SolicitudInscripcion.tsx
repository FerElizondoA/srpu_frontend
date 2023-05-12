import * as React from "react";
import { useState, useEffect } from "react";
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
  TableRow,
  Button,
} from "@mui/material";

import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { ConfirmacionDescargaSolicitud } from "../Dialogs/DialogEnviarSolicitud";
import { ConfirmacionBorradorSolicitud } from "../Dialogs/DialogGuardarBorrador";
import { ConfirmacionCancelarSolicitud } from "../Dialogs/DialogCancelarSolicitud";
import { DialogCatalogoUsuarios } from "../Dialogs/DialogCrearNotificacion";
import { DialogSolicitarModificacion } from "../Dialogs/DialogSolicitarModificacion";

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

  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  let [reglasSeleccionadas] = React.useState(new Array());

  const [openDialogEnviar, setOpenDialogEnviar] = useState(false);

  const [openDialogBorrador, setOpenDialogBorrador] = useState(false);

  const [openDialogCancelar, setOpenDialogCancelar] = React.useState(false);

  const [openDialogModificacion, setOpenDialogModificacion] =
    React.useState(false);

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

  useEffect(() => {
    getReglas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                  ? (reglasSeleccionadas[index] =
                                      row.Descripcion)
                                  : delete reglasSeleccionadas[index];

                                changeReglasAplicables(reglasSeleccionadas);
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

        {localStorage.getItem("Rol") !== "Administrador" ? (
          <Grid
            item
            position="fixed"
            sx={{
              bottom: 50,
              left: window.innerWidth - 300,
              display: "flex",
              flexDirection: "column",
              height: "27%",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={() => {
                setOpenDialogCancelar(!openDialogCancelar);
              }}
              sx={queries.buttonCancelar}
            >
              Cancelar
            </Button>

            {localStorage.getItem("Rol") === "Verificador" ? (
              <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setOpenDialogModificacion(!openDialogModificacion);
              }}>
                Solicitar Modificacion
              </Button>
            ) : null}

            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setOpenDialogBorrador(!openDialogBorrador);
              }}
            >
              Guardar Borrador
            </Button>

            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setOpenDialogEnviar(!openDialogEnviar);
              }}
            >
              {localStorage.getItem("Rol") === "Verificador"
                ? "Finalizar"
                : "Enviar"}
            </Button>

            <ConfirmacionBorradorSolicitud
              handler={setOpenDialogBorrador}
              openState={openDialogBorrador}
            />
            <ConfirmacionDescargaSolicitud
              handler={setOpenDialogEnviar}
              openState={openDialogEnviar}
            />
            <ConfirmacionCancelarSolicitud
              handler={setOpenDialogCancelar}
              openState={openDialogCancelar}
            />
            <DialogSolicitarModificacion
              handler={setOpenDialogModificacion}
              openState={openDialogModificacion}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}

export interface checkBoxType {
  [key: string]: boolean | undefined;
}
