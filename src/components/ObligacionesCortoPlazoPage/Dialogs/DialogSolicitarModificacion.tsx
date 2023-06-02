import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
  Grid,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/main";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../LateralMenu/APINotificaciones";
import Swal from "sweetalert2";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { IComentario } from "../../../store/comentarios_apartado";
import { IFile } from "../Panels/Documentacion";
import { CondicionFinanciera } from "../../../store/condicion_financiera";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";

export interface IUsuariosAsignables {
  id: string;
  Nombre: string;
  Rol: string;
}

export function DialogSolicitarModificacion({
  handler,
  openState,
  labelBoton,
}: {
  handler: Function;
  openState: boolean;
  labelBoton: string;
}) {

  interface Head {
    label: string;
  }

  interface HeadLabels {
    label: string;
    value: string;
  }

  // Encabezado
  const TipodeDocumento: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const SolicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const CargodelSolicitante: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Cargo
  );
  const TipodeEntePúblico: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const MunicipiouOrganismo: string = useCortoPlazoStore(
    (state) => state.encabezado.organismo.Organismo
  );
  const FechadeContratación: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  // Informacion general
  const gFechadeContratación: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const FechadeVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const Plazo: string = useCortoPlazoStore((state) =>
    state.informacionGeneral.plazo.toString()
  );
  const MontoOriginalContratado: string = useCortoPlazoStore((state) =>
    state.informacionGeneral.monto.toString()
  );
  const Destino: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.destino.Descripcion
  );
  const Denominación: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const InstituciónFinanciera: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );

  const tablaObligados: ObligadoSolidarioAval[] = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );

  // Condiciones Financieras
  const tablaCondicionesFinancieras: CondicionFinanciera[] = useCortoPlazoStore(
    (state) => state.tablaCondicionesFinancieras
  );

  // const comentarios: IComentario[] = useCortoPlazoStore(
  //   (state) => state.comentarios
  // );

  // Documentación
  const documentos: IFile[] = useCortoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Array<IUsuariosAsignables>>([]);

  const [idUsuarioAsignado, setidUsuarioAsignado] = useState("");

  const crearSolicitud: Function = useCortoPlazoStore(
    (state) => state.crearSolicitud
  );

  const modificaSolicitud: Function = useCortoPlazoStore(
    (state) => state.modificaSolicitud
  );

  // const [comentario, setComentario] = useState("");

  const idSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const addComentario: Function = useCortoPlazoStore(
    (state) => state.addComentario
  );

  const comentario: IComentario = useCortoPlazoStore(
    (state) => state.comentario
  );

  const setComentario: Function = useCortoPlazoStore(
    (state) => state.setComentario
  );

  const cleanComentario: Function = useCortoPlazoStore(
    (state) => state.cleanComentario
  );

  const newComentario: Function = useCortoPlazoStore(
    (state) => state.newComentario
  );

  const comentarios: IComentario[] = useCortoPlazoStore(
    (state) => state.comentarios
  );

  const removeComentario: Function = useCortoPlazoStore(
    (state) => state.removeComentario
  );

  const [labelBotonComentarios, setLabelBotonComentarios] = useState("")

  const [errorAsignacion, setErrorAsignacion] = useState(false)

  useEffect(() => {
    getListadoUsuarios(setUsuarios, 1);
  }, [openState]);

  useEffect(() => {
    setErrorAsignacion(false)
  }, [idUsuarioAsignado]);

  useEffect(() => {
    console.log('Documentacion apartados: ', documentos)
  }, [])

  // useEffect(() => {
  //   console.log('Comentario apartados apartados: ', comentarios)
  // }, [])

  useEffect(() => {
    cleanComentario();
    console.log(comentarios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openState]);

  const editCreadoPor: string = useCortoPlazoStore(
    (state) => state.editCreadoPor
  );

  const checkform = () => {
    if (idUsuarioAsignado === "") {
      setErrorAsignacion(true)
    } else {

      if (idSolicitud !== "") {
        modificaSolicitud(editCreadoPor, idUsuarioAsignado, "Captura")
          .then(() => {
            addComentario(idSolicitud, comentario);
            Swal.fire({
              icon: "success",
              title: "Mensaje",
              text: "La solicitud se envió con éxito",
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Mensaje",
              text: "Ocurrió un error, inténtelo de nuevo",
            });
          });
        createNotification(
          "Crédito simple corto plazo",
          "Se te ha asignado una solicitud para modificación.",
          [idUsuarioAsignado]
        );
        navigate("../ConsultaDeSolicitudes");
      } else {
        crearSolicitud(
          localStorage.getItem("IdUsuario"),
          idUsuarioAsignado,
          "Captura",
          comentario
        ).catch(() => {
          Swal.fire({
            icon: "error",
            title: "Mensaje",
            text: "Ocurrió un error, inténtelo de nuevo",
          });
        });
        navigate("../ConsultaDeSolicitudes");
      }

      handler(false);

    }

  }

  return (
    <Dialog
      fullWidth
      open={openState}
      keepMounted
      onClose={() => {
        handler(false);
      }}
    >
      {/* <TextField
          fullWidth
          label="Comentario"
          multiline
          variant="standard"
          rows={4}
          value={comentario}
          onChange={(texto) => {
            if (texto.target.value.length <= 200) {
              setComentario(texto.target.value);
            }
          }}
        /> */}
      <DialogTitle>
        <Typography sx={queries.medium_text}>Asignar a: </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid mb={2}>
          <FormControl fullWidth>
          <TextField
            select
            value={idUsuarioAsignado}
            onChange={(e) => {
              setidUsuarioAsignado(e.target.value);
            }}
            helperText={errorAsignacion === true ? "Debe de asigarle a un usuario la solicitud" : null}
            error={errorAsignacion}
          >
            {usuarios.filter((td: any) => td.Rol === "Capturador").map((usuario, index) => {
              return (
                <MenuItem value={usuario.id} key={index}>
                  {usuario.Nombre + " " + usuario.Rol}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
        </Grid>
        

        <Grid maxHeight={250}>
          <Typography sx={{
            fontSize: "2ch",
            fontFamily: "MontserratBold",
            marginBottom: "1rem",
            "@media (max-width: 600px)": {
              // XS (extra small) screen
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.5ch",
            },
          }}>Comentarios</Typography>
          {comentarios.map((item, index) => {
            return (
              <Grid >
                <Typography sx={queries.medium_text}>* {item.Apartado}: <strong>{item.Comentario}</strong> <br /><br /> </Typography>
              </Grid>
            )
          })}
        </Grid>

      </DialogContent>

      <DialogActions>
        <Button

          sx={queries.buttonCancelar}
          variant="text"
          onClick={() => handler(false)}
        >
          Cancelar
        </Button>

        <Button
          // disabled={idUsuarioAsignado===""}
          variant="text"
          sx={queries.buttonContinuar}
          onClick={() => {
            checkform();
          }}
          
        >
          {labelBoton ? labelBoton :'nulo'}
  
        </Button>
      </DialogActions>
    </Dialog>
  );
}
