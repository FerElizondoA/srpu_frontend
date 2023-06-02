import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import DialogContentText from "@mui/material/DialogContentText";
import { IUsuarios } from "../../Interfaces/InterfacesUsuario/IUsuarios";

import { ICatalogo } from "../../../screens/Config/Catalogos";
import { getCatalogo } from "../../APIS/Config/APISCatalogos";
import { createSolicitud } from "../../APIS/Config/Solicitudes-Usuarios";

export const DialogUsuarios = ({
  open,
  title,
  handleClose,
  UserObject,
  ActionButton,
}: {
  open: boolean;
  title: string;
  handleClose: Function;
  UserObject?: IUsuarios;
  ActionButton: string;
}) => {
  const [registroDatos, setRegistroDatos] = useState<IUsuarios>({
    id: UserObject?.id || "",
    IdCentral: UserObject?.IdCentral || "",
    Nombre: UserObject?.Nombre || "",
    ApellidoPaterno: UserObject?.ApellidoPaterno || "",
    ApellidoMaterno: UserObject?.ApellidoMaterno || "",
    NombreUsuario: UserObject?.NombreUsuario || "",
    CorreoElectronico: UserObject?.CorreoElectronico || "",
    Curp: UserObject?.Curp || "",
    Rfc: UserObject?.Rfc || "",
    Telefono: UserObject?.Telefono || "",
    Ext: UserObject?.Ext || "",
    Celular: UserObject?.Celular || "",
    Cargo: UserObject?.Cargo || "",
    CorreoDeRecuperacion: UserObject?.CorreoDeRecuperacion || "",
    Rol: UserObject?.Rol || "",
    IdRol: UserObject?.IdRol || "",
    MunicipioUOrganizacion: UserObject?.MunicipioUOrganizacion || "",
    IdMunicipioUOrganizacion: UserObject?.IdMunicipioUOrganizacion || "",
  });

  /*DIALOGF */

  const [tipoUsuario, setTipoUsuario] = useState<Array<ICatalogo>>([]);

  const [entesPublicos, setEntesPublicos] = useState<Array<ICatalogo>>([]);

  useEffect(() => {
    if (UserObject !== undefined) {
      setRegistroDatos(UserObject);
    }
  }, [UserObject]);

  useEffect(() => {
    getCatalogo(setTipoUsuario, "roles");
    getCatalogo(setEntesPublicos, "entePublicoObligado");
    setErrorNombre(false);
    setErrorUsuario(false);
    setErrorEmail(false);
    setErrorAPaterno(false);
    setErrorAMaterno(false);
    setErrorCargo(false);
    setErrorMunicipio(false);
    setErrorTipoUsuario(false);
    setErrorCurp(false);
    setErrorRfc(false);
    setErrorTelefono(false);
    setErrorCelular(false);
    setErrorExt(false);
    setErrorEmailAlt(false);
  }, []);

  /* Variables Dialog confirmacion*/
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  /*///// ***********  VALIDACIONES  **********/ /////

  const [comentario, setComentario] = useState("");

  const [statusSolicitud, setStatusSolicitud] = useState(false);

  useEffect(() => {
    if (statusSolicitud === true) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusSolicitud]);

  const validaUsuario = (dato: string) => {
    var format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 21 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, NombreUsuario: dato });
    }
  };

  const validaEmail = (dato: string) => {
    const format = /^ [A-Z0-9._%+-]+@ [A-Z0-9.-]+\\. [A-Z] {2,}$/i;
    if (dato.length < 101 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, CorreoElectronico: dato });
    }
  };

  const validaNombre = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 20 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Nombre: dato });
    }
  };

  const validaApellidoP = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 20 && !format.test(dato)) {
      setRegistroDatos((registroDatos) => ({
        ...registroDatos,
        ...{ ApellidoPaterno: dato },
      }));
    }
  };

  const validaApellidoM = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 20 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, ApellidoMaterno: dato });
    }
  };

  const validaMunicipio = (dato: string) => {
    setRegistroDatos({ ...registroDatos, MunicipioUOrganizacion: dato });
  };

  const validaTipoUsuario = (dato: string) => {
    let aux = tipoUsuario.filter((item) => {
      if (item.Id === dato) {
        return item;
      } else {
        return null;
      }
    });
    setRegistroDatos({
      ...registroDatos,
      IdRol: dato,
      Rol: aux[0].Descripcion,
    });
  };

  const validaCargo = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 255 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Cargo: dato });
    }
  };

  const validaTelefono = (dato: number) => {
    if (dato < 9999999999) {
      setRegistroDatos({ ...registroDatos, Telefono: dato.toString() });
    } else if (dato.toString() === "NaN") {
      setRegistroDatos({ ...registroDatos, Telefono: "0" });
    }
    if (registroDatos.Telefono.length < 9) {
      setErroresTelefono(true);
      setLeyendaErrorTelefono("Número de Telefono no valido");
    } else {
      setErroresTelefono(false);
      setLeyendaErrorTelefono("");
    }
  };

  const validaExtension = (dato: number) => {
    if (dato <= 9999) {
      setRegistroDatos({ ...registroDatos, Ext: dato.toString() });
    } else if (dato.toString() === "NaN") {
      setRegistroDatos({ ...registroDatos, Ext: "0" });
    }
  };

  const validaCelular = (dato: number) => {
    if (dato < 9999999999) {
      setRegistroDatos({ ...registroDatos, Celular: dato.toString() });
    } else if (dato.toString() === "NaN") {
      setRegistroDatos({ ...registroDatos, Celular: "0" });
    }
    if (registroDatos.Celular.length < 9) {
      setErroresCelular(true);
      setLeyendaErrorCelular("Número de Celular no valido");
    } else {
      setErroresCelular(false);
      setLeyendaErrorCelular("");
    }
  };

  const validaCURP = (dato: string) => {
    var format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 19 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Curp: dato.toUpperCase() });
    }
    if (registroDatos.Curp.length < 18) {
      setErroresCurp(true);
      setLeyendaErrorCurp("El CURP esta incompleto");
    } else {
      setErroresCurp(false);
      setLeyendaErrorCurp("");
    }
  };

  const validaRFC = (dato: string) => {
    var format = /[¬°`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;
    if (dato.length < 14 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Rfc: dato.toUpperCase() });
    }
    if (registroDatos.Rfc.length < 12 || registroDatos.Rfc.length > 13) {
      setErroresRfc(true);
      setLeyendaErrorRfc("El RFC esta incompleto");
    } else {
      setErroresRfc(false);
      setLeyendaErrorRfc("");
    }
  };

  const validaComentario = (dato: string) => {
    const format =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    if (dato.length < 2000 && !format.test(dato)) {
      setComentario(dato);
    }
  };

  const validaEmailRecuperacion = (dato: string) => {
    const format =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    if (dato.length < 101 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, CorreoDeRecuperacion: dato });
    }
  };

  ////////////////////////////////////////////////////////

  /* *********** ERRORES ***************/
  const [ErrorUsuario, setErrorUsuario] = useState(false);
  const [ErrorEmail, setErrorEmail] = useState(false);
  const [ErrorNombre, setErrorNombre] = useState(false);
  const [ErrorAPaterno, setErrorAPaterno] = useState(false);
  const [ErrorAMaterno, setErrorAMaterno] = useState(false);
  const [ErrorCargo, setErrorCargo] = useState(false);
  const [ErrorMunicipio, setErrorMunicipio] = useState(false);
  const [ErrorTipoUsuario, setErrorTipoUsuario] = useState(false);
  const [ErrorRfc, setErrorRfc] = useState(false);
  const [ErrorCurp, setErrorCurp] = useState(false);
  const [ErrorTelefono, setErrorTelefono] = useState(false);
  const [ErrorCelular, setErrorCelular] = useState(false);
  const [ErrorExt, setErrorExt] = useState(false);
  const [ErrorEmailAlt, setErrorEmailAlt] = useState(false);

  const [ErroresCurp, setErroresCurp] = useState(false);
  const [ErroresRfc, setErroresRfc] = useState(false);

  const [LeyendaErrorCurp, setLeyendaErrorCurp] = useState("");
  const [LeyendaErrorRfc, setLeyendaErrorRfc] = useState("");

  const [ErroresCelular, setErroresCelular] = useState(false);
  const [ErroresTelefono, setErroresTelefono] = useState(false);

  const [LeyendaErrorCelular, setLeyendaErrorCelular] = useState("");
  const [LeyendaErrorTelefono, setLeyendaErrorTelefono] = useState("");

  const [error, setError] = useState("");

  const checkedForm = () => {
    let check = false;

    if (registroDatos.Nombre === null || /^[\s]*$/.test(registroDatos.Nombre)) {
      setErrorNombre(true);
      check = true;
    } else {
      setErrorNombre(false);
    }

    if (
      registroDatos.NombreUsuario === null ||
      /^[\s]*$/.test(registroDatos.NombreUsuario)
    ) {
      setErrorUsuario(true);
      check = true;
    } else {
      setErrorUsuario(false);
    }

    if (
      registroDatos.CorreoElectronico === null ||
      /^[\s]*$/.test(registroDatos.CorreoElectronico)
    ) {
      setErrorEmail(true);
      check = true;
    } else {
      setErrorEmail(false);
    }

    if (
      registroDatos.ApellidoPaterno === null ||
      /^[\s]*$/.test(registroDatos.ApellidoPaterno)
    ) {
      setErrorAPaterno(true);
      check = true;
    } else {
      setErrorAPaterno(false);
    }

    if (
      registroDatos.ApellidoMaterno === null ||
      /^[\s]*$/.test(registroDatos.ApellidoMaterno)
    ) {
      setErrorAMaterno(true);
      check = true;
    } else {
      setErrorAMaterno(false);
    }

    if (registroDatos.Cargo === null || /^[\s]*$/.test(registroDatos.Cargo)) {
      setErrorCargo(true);
      check = true;
    } else {
      setErrorCargo(false);
    }

    if (
      registroDatos.MunicipioUOrganizacion === null ||
      /^[\s]*$/.test(registroDatos.MunicipioUOrganizacion)
    ) {
      setErrorMunicipio(true);
      check = true;
    } else {
      setErrorMunicipio(false);
    }

    if (registroDatos.Rol === null || /^[\s]*$/.test(registroDatos.Rol)) {
      setErrorTipoUsuario(true);
      check = true;
    } else {
      setErrorTipoUsuario(false);
    }

    if (registroDatos.Curp === null || /^[\s]*$/.test(registroDatos.Curp)) {
      setErrorCurp(true);
      check = true;
    } else {
      setErrorCurp(false);
    }

    if (registroDatos.Rfc === null || /^[\s]*$/.test(registroDatos.Rfc)) {
      setErrorRfc(true);
      check = true;
    } else {
      setErrorRfc(false);
    }

    if (
      registroDatos.Telefono === null ||
      /^[\s]*$/.test(registroDatos.Telefono)
    ) {
      setErrorTelefono(true);
      check = true;
    } else {
      setErrorTelefono(false);
    }

    if (
      registroDatos.Celular === null ||
      /^[\s]*$/.test(registroDatos.Celular)
    ) {
      setErrorCelular(true);
      check = true;
    } else {
      setErrorCelular(false);
    }

    if (registroDatos.Ext === null || /^[\s]*$/.test(registroDatos.Ext)) {
      setErrorExt(true);
      check = true;
    } else {
      setErrorExt(false);
    }

    if (
      registroDatos.CorreoDeRecuperacion === null ||
      /^[\s]*$/.test(registroDatos.CorreoDeRecuperacion)
    ) {
      setErrorEmailAlt(true);
      check = true;
    } else {
      setErrorEmailAlt(false);
    }

    if (!check) {
      setOpenDialogConfirm(true);
    }
  };

  ////////////////////////////////////////////////////////

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ height: "100vh" }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ height: "90%" }}> {title}</Typography>
          <Typography sx={{ height: "90%" }} color={"red"}>
            {" "}
            {error !== "" ? error : null}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                fullWidth
                required
                label="Usuario"
                margin="dense"
                variant="outlined"
                onChange={(e) => {
                  validaUsuario(e.target.value);
                }}
                value={registroDatos.NombreUsuario}
                helperText={ErrorUsuario ? "Usuario inválido" : ""}
                error={ErrorUsuario}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={8}
              lg={8}
              sm={12}
            >
              <TextField
                type="email"
                margin="dense"
                variant="outlined"
                fullWidth
                label="Correo Electronico"
                required
                value={registroDatos.CorreoElectronico}
                onChange={(e) => {
                  validaEmail(e.target.value);
                }}
                helperText={ErrorEmail ? "Correo electrónico inválido" : ""}
                error={ErrorEmail}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="Nombre(s)"
                required
                value={registroDatos.Nombre}
                onChange={(e) => {
                  validaNombre(e.target.value);
                }}
                helperText={ErrorNombre ? "Nombre inválido" : ""}
                error={ErrorNombre}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="Apellido Paterno"
                required
                value={registroDatos.ApellidoPaterno}
                onChange={(e) => {
                  validaApellidoP(e.target.value);
                }}
                helperText={ErrorAPaterno ? "Apellido paterno inválido" : ""}
                error={ErrorAPaterno}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="Apellido Materno"
                required
                value={registroDatos.ApellidoMaterno}
                onChange={(e) => {
                  validaApellidoM(e.target.value);
                }}
                helperText={ErrorAMaterno ? "Apellido materno inválido" : ""}
                error={ErrorAMaterno}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                select
                variant="outlined"
                fullWidth
                label="Tipo de Usuario"
                margin="dense"
                required
                value={registroDatos.IdRol}
                onChange={(e) => {
                  validaTipoUsuario(e.target.value);
                }}
                helperText={
                  ErrorTipoUsuario ? "Seleccione tipo de usuario" : ""
                }
                error={ErrorTipoUsuario}
              >
                {tipoUsuario?.map((option) => (
                  <MenuItem key={option.Id} value={option.Id}>
                    {option.Descripcion}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="Cargo"
                required
                value={registroDatos.Cargo}
                onChange={(e) => {
                  validaCargo(e.target.value);
                }}
                helperText={ErrorCargo ? "Cargo inválido" : ""}
                error={ErrorCargo}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={4}
              lg={4}
              sm={12}
            >
              <TextField
                disabled={localStorage.getItem("Rol") === "Capturador"}
                required
                margin="dense"
                variant="outlined"
                fullWidth
                select
                label="Municipio o Delegacion"
                value={registroDatos.MunicipioUOrganizacion}
                onChange={(e) => {
                  validaMunicipio(e.target.value);
                }}
                helperText={ErrorMunicipio ? "Seleccione Municipio" : ""}
                error={ErrorMunicipio}
              >
                {entesPublicos?.map((option) => (
                  <MenuItem key={option.Id} value={option.Id}>
                    {option.Descripcion}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={6}
              lg={6}
              sm={12}
            >
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="CURP"
                required
                value={registroDatos.Curp}
                onChange={(e) => {
                  validaCURP(e.target.value);
                }}
                helperText={
                  LeyendaErrorCurp || ErrorCurp
                    ? "Curp incompleto o invalido"
                    : ""
                }
                error={ErrorCurp || ErroresCurp}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={6}
              lg={6}
              sm={12}
            >
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                label="RFC"
                required
                value={registroDatos.Rfc}
                onChange={(e) => {
                  validaRFC(e.target.value);
                }}
                helperText={LeyendaErrorRfc || ErrorRfc ? "RFC invalido" : ""}
                error={ErrorRfc || ErroresRfc}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={5}
              lg={5}
              sm={12}
            >
              <TextField
                fullWidth
                required
                margin="dense"
                variant="outlined"
                label="Telefono"
                value={
                  registroDatos.Telefono === "0" ? "" : registroDatos.Telefono
                }
                helperText={
                  LeyendaErrorTelefono || ErrorTelefono
                    ? "Telefono inválido"
                    : ""
                }
                error={ErrorTelefono || ErroresTelefono}
                onChange={(e) => {
                  validaTelefono(parseInt(e.target.value));
                }}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={2}
              lg={2}
              sm={12}
            >
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "/[0-9]{10}/" }}
                margin="dense"
                variant="outlined"
                label="Extension"
                fullWidth
                required
                value={registroDatos.Ext === "0" ? "" : registroDatos.Ext}
                onChange={(e) => {
                  validaExtension(parseInt(e.target.value));
                }}
                helperText={ErrorExt ? "Extension inválido" : ""}
                error={ErrorExt}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={5}
              lg={5}
              sm={12}
            >
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "/[0-9]{10}/" }}
                margin="dense"
                variant="outlined"
                label="Celular"
                fullWidth
                required
                value={
                  registroDatos.Celular === "0" ? "" : registroDatos.Celular
                }
                helperText={
                  ErroresCelular
                    ? LeyendaErrorCelular
                    : ErrorCelular
                    ? "Celular inválido"
                    : ""
                }
                error={ErrorCelular || ErroresCelular}
                onChange={(e) => {
                  validaCelular(parseInt(e.target.value));
                }}
              />
            </Grid>

            <Grid
              item
              textTransform={"uppercase"}
              xs={12}
              md={12}
              lg={12}
              sm={12}
            >
              <TextField
                type="email"
                margin="dense"
                variant="outlined"
                fullWidth
                label="Correo Alternativo"
                required
                value={registroDatos.CorreoDeRecuperacion}
                onChange={(e) => {
                  validaEmailRecuperacion(e.target.value);
                }}
                helperText={ErrorEmailAlt ? "Correo electrónico inválido." : ""}
                error={ErrorEmailAlt}
              />
            </Grid>

            <Grid
              item
              sx={{ width: { xs: 232, sm: 200 } }}
              textTransform={"uppercase"}
              xs={12}
              md={12}
              lg={12}
              sm={12}
            >
              <TextField
                fullWidth
                label="Comentario"
                margin="none"
                multiline
                rows={1}
                variant="outlined"
                value={comentario}
                onChange={(e) => {
                  validaComentario(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ display: "flex", alignItems: "flex-end" }}>
          {ActionButton === "Agregar" ? (
            <Button
              sx={{ mb: 1.5, mr: 1.5 }}
              type="submit"
              variant="contained"
              onClick={() => {
                checkedForm();
              }}
              endIcon={<SendIcon />}
            >
              Crear Usuario
            </Button>
          ) : ActionButton === "Editar" ? (
            <Button
              sx={{ mb: 1.5, mr: 1.5 }}
              type="submit"
              variant="contained"
              onClick={() => {
                checkedForm();
              }}
              endIcon={<SendIcon />}
            >
              Editar Usuario
            </Button>
          ) : null}

          <Button
            sx={{ mb: 1.5 }}
            color="error"
            variant="contained"
            onClick={() => {
              handleClose();
              setError("");
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogConfirm}
        onClose={() => {
          setOpenDialogConfirm(!openDialogConfirm);
        }}
      >
        <DialogTitle>{"Confirmacion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'¿Estas seguro de que quieres "' +
              ActionButton +
              '" el usuario: ' +
              registroDatos?.Nombre +
              " " +
              registroDatos?.ApellidoPaterno +
              "?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialogConfirm(!openDialogConfirm);
              setError("");
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              createSolicitud(
                registroDatos,
                ActionButton === "Agregar" ? "ALTA" : "MODIFICACION",
                comentario,
                setStatusSolicitud,
                setError
              );
              setOpenDialogConfirm(!openDialogConfirm);
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
