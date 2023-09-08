import {
  Grid,
  Tabs,
  Tab,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
//import { useCortoPlazoStore } from "../../../store/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
//import { IRoles } from "../../ObligacionesCortoPlazoPage/Panels/Encabezado"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { subDays } from "date-fns/esm";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { DateInput } from "../../CustomComponents";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";

export interface IUsuariosCorto {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  IdEntidad: string;
  IdRol: string;
  Puesto: string;
}

export function Encabezado() {
  const tipoDocumento: string = useLargoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const getTiposEntesPublicos: Function = useLargoPlazoStore(
    (state) => state.getTiposEntesPublicos
  );
  const tipoEntePublico: { Id: string; TipoEntePublico: string } =
    useLargoPlazoStore((state) => state.encabezado.tipoEntePublico);
  const solicitanteAutorizado: {
    Solicitante: string;
    Cargo: string;
    Nombre: string;
  } = useLargoPlazoStore((state) => state.encabezado.solicitanteAutorizado);

  const organismo: { Id: string; Organismo: string } = useLargoPlazoStore(
    (state) => state.encabezado.organismo
  );
  const getOrganismos: Function = useLargoPlazoStore(
    (state) => state.getOrganismos
  );
  const fechaContratacion: string = useLargoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  const changeEncabezado: Function = useLargoPlazoStore(
    (state) => state.changeEncabezado
  );

  useEffect(() => {
    getListadoUsuarios(setUsuarios);
    getTiposEntesPublicos();
    getOrganismos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [usuarios, setUsuarios] = useState<Array<IUsuariosCorto>>([]);

  const selectedValue =
    usuarios.find((usuario) => usuario.Id === solicitanteAutorizado.Solicitante)
      ?.Id || "";
  const isValueValid = usuarios.some((usuario) => usuario.Id === selectedValue);

  return (
    <Grid container>
      <Grid
        item
        container
        mt={{ xs: 10, sm: 10, md: 10, lg: 5 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={4} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Documento</InputLabel>

          <TextField
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

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <Select
            sx={queries.medium_text}
            fullWidth
            value={isValueValid ? selectedValue : ""}
            onChange={(e) => {
              let x = usuarios.find((usuario) => usuario.Id === e.target.value);
              changeEncabezado({
                tipoDocumento: tipoDocumento,
                solicitanteAutorizado: {
                  Solicitante: x?.Id || "",
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
            {usuarios.map((usuario) => (
              <MenuItem key={usuario.Id} value={usuario.Id}>
                {`${usuario.Nombre} ${usuario.ApellidoPaterno} ${usuario.ApellidoMaterno}`}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Cargo del Solicitante
          </InputLabel>

          <TextField
            fullWidth
            value={solicitanteAutorizado.Cargo}
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
        mt={{ xs: 10, sm: 10, md: 20, lg: 10 }}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 5, lg: 10 }}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Tipo de Ente Público</InputLabel>

          <TextField
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

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Municipio u Organismo
          </InputLabel>

          <TextField
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

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(fechaContratacion)}
              // onChange={(date) => changeFechaContratacion(date?.toString())}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
