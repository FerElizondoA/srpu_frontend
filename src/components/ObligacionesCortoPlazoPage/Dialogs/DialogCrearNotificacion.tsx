import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { queries } from "../../../queries";
import { createNotificationCortoPlazo } from "../../APIS/cortoplazo/APISCreateNotificacionCortoPlazo";
import {
  IDestinatarios,
  INotificaciones,
} from "../../Interfaces/Notificaciones/NotificaconesUsuariosCortoPlazo";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IUsuarios } from "../../../store/CreditoCortoPlazo/encabezado";

export function DialogCatalogoUsuarios({
  openState,
  handler,
}: {
  openState: boolean;
  handler: Function;
}) {
  const listadoUsuarios: Array<IUsuarios> = useCortoPlazoStore(
    (state) => state.listadoUsuarios
  );

  const [registroNotificaciones, setRegistroNotificaciones] =
    useState<INotificaciones>({
      Id: "",
      Titulo: "",
      Mensaje: "",
      FechaDeCreacion: "",
      Creador: "",
      Cargo: "",
    });

  //Validaciones
  const validaMensaje = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if (dato.length < 201 && !format.test(dato)) {
      setRegistroNotificaciones({ ...registroNotificaciones, Mensaje: dato });
    }
  };

  const validaTitulo = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if (dato.length < 31 && !format.test(dato)) {
      setRegistroNotificaciones({ ...registroNotificaciones, Titulo: dato });
    }
  };

  const [destinatarios, setDestinatarios] = useState<Array<IDestinatarios>>([]);

  const [idDestinatarios, setIdDestinatarios] = useState([]);

  return listadoUsuarios.length > 0 ? (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={openState}
      onClose={() => handler()}
    >
      <DialogTitle>
        <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"bold"}>
          Enviar Notificacion
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          m: 4,
          height: "40vh",
          justifyContent: "space-around",
        }}
      >
        <Autocomplete
          clearText="Limpiar"
          multiple
          getOptionLabel={(usuarios) =>
            usuarios.Nombre +
            " " +
            usuarios.ApellidoPaterno +
            " " +
            usuarios.ApellidoMaterno
          }
          options={listadoUsuarios}
          isOptionEqualToValue={(option, value) =>
            option.Nombre === value.Nombre
          }
          noOptionsText={"No existe"}
          renderOption={(props, usuarios) => (
            <Box component="li" {...props} key={usuarios.Nombre}>
              {usuarios.Nombre +
                " " +
                usuarios.ApellidoPaterno +
                " " +
                usuarios.ApellidoMaterno}
            </Box>
          )}
          value={destinatarios}
          onChange={(event, v) => {
            setDestinatarios(v);
            let x: any = [];
            v.map((y: IDestinatarios) => x.push(y.Id));
            setIdDestinatarios(x);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Nombre" variant="outlined" />
          )}
        />

        <TextField
          fullWidth
          type="text"
          label="Titulo"
          variant="outlined"
          value={registroNotificaciones.Titulo}
          onChange={(e) => {
            validaTitulo(e.target.value);
          }}
        />

        <TextField
          fullWidth
          label="Mensaje"
          multiline
          rows={3}
          variant="outlined"
          value={registroNotificaciones.Mensaje}
          onChange={(e) => {
            validaMensaje(e.target.value);
          }}
        />

        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              handler();
            }}
          >
            Cancelar
          </Button>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              createNotificationCortoPlazo(
                registroNotificaciones.Titulo,
                registroNotificaciones.Mensaje,
                idDestinatarios
              );

              handler();
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  ) : null;
}
