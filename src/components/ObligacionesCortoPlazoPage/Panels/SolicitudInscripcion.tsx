import * as React from "react";
import { useEffect, useState } from "react";
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
  Snackbar,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { ConfirmacionSolicitud } from "../Dialogs/ConfirmacionSolicitud";
import { ConfirmacionBorradorSolicitud } from "../Dialogs/ConfirmacionBorradorSolicitud";
import { ConfirmacionCancelarSolicitud } from "../Dialogs/ConfirmacionCancelarSolicitud";
import { DialogCatalogoUsuarios } from "../Dialogs/DialogCatalogoUsuarios";

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
  const [openDialog, changeOpenDialog] = useState(false);
  const changeOpenDialogState = (open: boolean) => {
    changeOpenDialog(open);
  };

  const [openDialogBorrador, changeOpenDialogBorrador] = useState(false);
  const changeOpenDialogBorradorState = (open: boolean) => {
    changeOpenDialogBorrador(open);
  };

  const [openDialogCancelar, changeOpenDialogCancelar] = useState(false);
  const changeOpenDialogCancelarState = (open: boolean) => {
    changeOpenDialogCancelar(open);
  };

  const [openDialogUsuarios, changeOpenDialogUsuarios] = useState(false);
  const changeOpenDialogUsuariosState = (open: boolean) => {
    changeOpenDialogUsuarios(open);
  };

  const nombreServidorPublico: string = useCortoPlazoStore(
    (state) => state.nombreServidorPublico
  );
  const changeServidorPublico: Function = useCortoPlazoStore(
    (state) => state.changeServidorPublico
  );
  const cargo: string = useCortoPlazoStore((state) => state.cargo);
  const changeCargo: Function = useCortoPlazoStore(
    (state) => state.changeCargo
  );
  const solicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.solicitanteAutorizado
  );
  const changeSolicitanteAutorizado: Function = useCortoPlazoStore(
    (state) => state.changeSolicitanteAutorizado
  );
  const documentoAutorizado: string = useCortoPlazoStore(
    (state) => state.documentoAutorizado
  );
  const changeDocumentoAutorizado: Function = useCortoPlazoStore(
    (state) => state.changeDocumentoAutorizado
  );
  const identificacion: string = useCortoPlazoStore(
    (state) => state.identificacion
  );
  const changeIdentificacion: Function = useCortoPlazoStore(
    (state) => state.changeIdentificacion
  );
  const reglasCatalog: string[] = useCortoPlazoStore(
    (state) => state.reglasCatalog
  );

  const fetchReglas: Function = useCortoPlazoStore(
    (state) => state.fetchReglas
  );
  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );
  const IdSolicitud: string = useCortoPlazoStore((state) => state.IdSolicitud);

  const [selected, setSelected] = React.useState<number[]>([]);

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

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

  const buttonAdminVerificador = () => {
    if (localStorage.getItem("Rol") === "Verificador" && IdSolicitud !== "") {
      return (
        <Typography sx={queries.medium_text}>SOLICITAR MODIFICACION</Typography>
      );
    } else if (
      localStorage.getItem("Rol") === "Verificador" &&
      IdSolicitud === ""
    ) {
      return (
        <Typography sx={queries.medium_text}>
          Solicitud aun no creada
        </Typography>
      );
    }
  };

  const opciones = () => {
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
              changeOpenDialogUsuariosState(!openDialogUsuarios);
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
            onClick={() => changeOpenDialogUsuariosState(!openDialogUsuarios)}
            sx={{
              mb: "10px",
              "&:disabled": { backgroundColor: "#D42C2C", color: "white" },
            }}
            disabled={IdSolicitud === ""}
          >
            <CheckIcon sx={{ mr: 1 }} />
            {buttonAdminVerificador()}
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  React.useEffect(() => {
    fetchReglas();
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
            onChange={(text) => changeServidorPublico(text.target.value)}
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
            value={cargo}
            onChange={(text) => changeCargo(text.target.value)}
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
        mt={{ sm: 2, md: 0, lg: 0 }}
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ md: 10, lg: 10 }}
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
            onChange={(text) => changeSolicitanteAutorizado(text.target.value)}
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

        <Grid item md={3} lg={3} xl={3}>
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
        </Grid>

        <Grid item md={3} lg={3} xl={3}>
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
        </Grid>

        <Grid item md={9} lg={9} xl={9}>
          <Divider sx={queries.medium_text}>
            Declaratorias aplicables al financiamiento u obligación.
          </Divider>
        </Grid>
      </Grid>

      <Grid
        item
        container
        //flexDirection="row"
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ md: 10, lg: 10 }}
      >
        <Grid item md={9} lg={9} xl={9}>
          <Grid container direction="column">
            <Grid item>
              <TableContainer sx={{ maxHeight: "350px" }}>
                <Table>
                  <TableHead>
                    {heads.map((head) => (
                      <StyledTableCell>
                        <TableSortLabel>{head.label}</TableSortLabel>
                      </StyledTableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {reglasCatalog.map((row, index) => {
                      const isItemSelected = isSelected(index);
                      return (
                        <StyledTableRow>
                          <StyledTableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) => handleClick(event, index)}
                              checked={isItemSelected}
                            />
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row}
                          </StyledTableCell>
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
          {opciones()}
        </Grid>

        <ConfirmacionSolicitud
          handler={changeOpenDialogState}
          openState={openDialog}
          //Id ={}
          selected={selected}
        />

        {changeOpenDialogBorradorState ? (
          <ConfirmacionBorradorSolicitud
            handler={changeOpenDialogBorradorState}
            openState={openDialogBorrador}
            selected={selected}
          />
        ) : null}

        <ConfirmacionCancelarSolicitud
          handler={changeOpenDialogCancelarState}
          openState={openDialogCancelar}
          selected={selected}
        />
        <DialogCatalogoUsuarios
          handler={changeOpenDialogUsuariosState}
          openState={openDialogUsuarios}
        />
      </Grid>
    </Grid>
  );
}
