import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useEffect } from "react";
import { getListadoUsuarios } from "../../../components/APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { IUsuarios } from "../../../store/CreditoCortoPlazo/encabezado";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

export const AñadirNotificaciones = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: Function;
}) => {
  //Declaraciones
  // const [usuariosFiltrados, setUsuariosFiltrados] = useState<Array<IUsuarios>>([]);

  // const [registroNotificaciones, setRegistroNotificaciones] =
  //   useState<INotificaciones>({
  //     Id: "",
  //     Titulo: "",
  //     Mensaje: "",
  //     FechaDeCreacion: "",
  //     Creador: "",
  //     Cargo: "",
  //   });

  //Validaciones
  // const validaMensaje = (dato: string) => {
  //   const format = /[¬°`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  //   if (dato.length < 201 && !format.test(dato)) {
  //     setRegistroNotificaciones({ ...registroNotificaciones, Mensaje: dato });
  //   }
  // };
  // const validaTitulo = (dato: string) => {
  //   const format = /[¬°`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  //   if (dato.length < 31 && !format.test(dato)) {
  //     setRegistroNotificaciones({ ...registroNotificaciones, Titulo: dato });
  //   }
  // };

  //useEffect
  useEffect(() => {
    getListadoUsuarios();
  }, []);

  const listadoUsuarios: IUsuarios[] = useCortoPlazoStore(
    (state) => state.listadoUsuarios
  );

  // const [destinatarios, setDestinatarios] = useState<Array<IDestinatarios>>([]);

  // const [idDestinatarios, setIdDestinatarios] = useState([]);

  return listadoUsuarios.length > 0 ? (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={() => handleClose()}>
      <DialogTitle>
        <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"bold"}>
          Enviar Notificacion
        </Typography>
      </DialogTitle>
      {/* <DialogContent>
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
              clearText="Borrar"
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

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
              createNotification(
                registroNotificaciones.Titulo,
                registroNotificaciones.Mensaje,
                idDestinatarios
              );

              handleClose();
            }}
          >
            Enviar
          </Button>

          <Button
            sx={{ mb: 1.5 }}
            color="error"
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </DialogContent> */}
    </Dialog>
  ) : null;
};
