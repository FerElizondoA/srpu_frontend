import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subDays } from "date-fns/esm";
import es from "date-fns/locale/es";
import { useEffect } from "react";
import { queries } from "../../../queries";
import {
  IEncabezado,
  IUsuarios,
} from "../../../store/CreditoCortoPlazo/encabezado";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

export function Encabezado() {
  const tipoDocumento: string = useLargoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const tipoEntePublico: { Id: string; TipoEntePublico: string } =
    useLargoPlazoStore((state) => state.encabezado.tipoEntePublico);

  const organismo: { Id: string; Organismo: string } = useLargoPlazoStore(
    (state) => state.encabezado.organismo
  );
  const fechaContratacion: string = useLargoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );
  const changeEncabezado: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );

  const encabezado: IEncabezado = useLargoPlazoStore(
    (state) => state.encabezado
  );

  const listadoUsuarios: Array<IUsuarios> = useCortoPlazoStore(
    (state) => state.listadoUsuarios
  );

  useEffect(() => {
    listadoUsuarios.length <= 0 && getListadoUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datosActualizar: Array<string> = useLargoPlazoStore(
    (state) => state.datosActualizar
  );

  const reestructura: string = useCortoPlazoStore(
    (state) => state.reestructura
  );

  return (
    <Grid container height={"25rem"}>
      <Grid
        item
        container
        mt={{ xs: 2 }}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>

          <TextField
            disabled={
              reestructura === "con autorizacion" || 
              (datosActualizar.length > 0 &&
              !datosActualizar.includes("Tipo de Documento"))
            }
            fullWidth
            value={tipoDocumento}
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <Select
            disabled={
              reestructura === "con autorizacion" || 
              (datosActualizar.length > 0 &&
              !datosActualizar.includes("Solicitante Autorizado"))
            }
            sx={queries.medium_text}
            fullWidth
            value={
              listadoUsuarios.length <= 0
                ? ""
                : encabezado.solicitanteAutorizado.IdSolicitante
            }
            onChange={(e) => {
              let x = listadoUsuarios.find(
                (usuario) => usuario.Id === e.target.value
              );
              changeEncabezado({
                tipoDocumento: tipoDocumento,
                solicitanteAutorizado: {
                  IdSolicitante: x?.Id || "",
                  Cargo: x?.Puesto || "",
                  Nombre: `${x?.Nombre} ${x?.ApellidoPaterno} ${x?.ApellidoMaterno}`,
                },
                tipoEntePublico: tipoEntePublico,
                organismo: organismo,
                fechaContratacion: fechaContratacion,
              });
            }}
            variant="standard"
          >
            {listadoUsuarios.map((usuario) => (
              <MenuItem key={usuario.Id} value={usuario.Id}>
                {`${usuario.Nombre} ${usuario.ApellidoPaterno} ${usuario.ApellidoMaterno}`}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Cargo del Solicitante
          </InputLabel>

          <TextField
            disabled={
              reestructura === "con autorizacion" || 
              (datosActualizar.length > 0 &&
              !datosActualizar.includes("Cargo del Solicitante"))
            }
            fullWidth
            value={encabezado.solicitanteAutorizado.Cargo}
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
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
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Ente Público</InputLabel>

          <TextField
            disabled={
              reestructura === "con autorizacion" || 
              (datosActualizar.length > 0 &&
              !datosActualizar.includes("Tipo de Ente Público"))
            }
            fullWidth
            value={tipoEntePublico.TipoEntePublico}
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Municipio u Organismo
          </InputLabel>

          <TextField
            disabled={
              reestructura === "con autorizacion" || 
              (datosActualizar.length > 0 &&
              !datosActualizar.includes("Municipio u Organismo"))
            }
            multiline
            fullWidth
            value={organismo.Organismo}
            variant="standard"
            sx={queries.medium_text}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
          />
        </Grid>

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              disabled={
                reestructura === "con autorizacion" || 
                (datosActualizar.length > 0 &&
                !datosActualizar.includes("Fecha de Contratación"))
              }
              sx={{ width: "100%" }}
              value={new Date(fechaContratacion)}
              onChange={(date) => {
                changeEncabezado({ ...encabezado, fechaContratacion: date });
              }}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
