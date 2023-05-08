import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  Typography,
  Dialog,
  Slide,
  Button,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Paper,
  AppBar,
  Toolbar,
  Select,
  InputLabel,
  MenuItem,
  Autocomplete,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { getListadoUsuariosCortoPlazo } from "../../APIS/cortoplazo/APISGetListaUsuariosCortoPlazo";
import { useEffect, useState } from "react";
import { useCortoPlazoStore } from "../../../store/main";
import { createNotificationCortoPlazo } from "../../APIS/cortoplazo/APISCreateNotificacionCortoPlazo";
import { INotificaciones } from "../../Interfaces/Notificaciones/NotificaconesUsuariosCortoPlazo";
import { IDestinatarios } from "../../Interfaces/Notificaciones/NotificaconesUsuariosCortoPlazo";
import { IUsuarios } from "../../Config/Interfaces/IUsuarios";

export function DialogCatalogoUsuarios({
  openState,
  handler,
}: {
  openState: boolean;
  handler: Function;
}) {
    const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([]);

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
      const format = /[¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (dato.length < 201 && !format.test(dato)) {
        setRegistroNotificaciones({ ...registroNotificaciones, Mensaje: dato });
        console.log(dato);
      }
    };
    const validaTitulo = (dato: string) => {
      const format = /[¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (dato.length < 31 && !format.test(dato)) {
        setRegistroNotificaciones({ ...registroNotificaciones, Titulo: dato });
        console.log(dato);
      }
    };
  
    const validaUsuario = (dato: string) => {
      setRegistroNotificaciones({ ...registroNotificaciones, Creador: dato });
      console.log(dato);
    };
  
    //useEffect
    useEffect(() => {
        getListadoUsuariosCortoPlazo(setUsuarios, 0);
    }, []);
  
    // useEffect(() => {
    //   setUsuariosFiltrados(usuarios);
    // }, [usuarios]);
  
    const [destinatarios, setDestinatarios] = useState<Array<IDestinatarios>>([]);
  
    const [idDestinatarios, setIdDestinatarios] = useState([]);
    useEffect(() => {
      console.log(destinatarios);
      console.log(idDestinatarios);
    }, [destinatarios]);
  
    return usuarios.length > 0 ? (
      <Dialog fullWidth maxWidth={"sm"} open={openState} onClose={() => handler()}>
        <DialogTitle>
          <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"bold"}>
            Enviar Notificacion
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            mt={2}
            container
            gap={"20px"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Stack sx={{ width: 600, spacing: 3 }}>
              <Autocomplete
                multiple
                getOptionLabel={(usuarios) =>
                  usuarios.Nombre +
                  " " +
                  usuarios.ApellidoPaterno +
                  " " +
                  usuarios.ApellidoMaterno
                }
                options={usuarios}
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
                  v.map((y: IDestinatarios) => x.push(y.id));
                  setIdDestinatarios(x);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Nombre" variant="outlined" />
                )}
              />
            </Stack>
  
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                //InputProps={{ readOnly: true }}
                fullWidth
                type="text"
                label="Titulo"
                variant="outlined"
                value={registroNotificaciones.Titulo}
                onChange={(e) => {
                  validaTitulo(e.target.value);
                }}
              />
            </Grid>
  
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <TextField
                fullWidth
                label="Mensaje"
                margin="none"
                multiline
                rows={3}
                variant="outlined"
                value={registroNotificaciones.Mensaje}
                onChange={(e) => {
                  validaMensaje(e.target.value);
                }}
                //InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
  
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}
          >
            <Button
              sx={{ mb: 1.5 }}
              color="info"
              variant="contained"
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
  
            <Button
              sx={{ mb: 1.5 }}
              color="error"
              variant="contained"
              onClick={() => {
                handler();
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    ) : null;
}
