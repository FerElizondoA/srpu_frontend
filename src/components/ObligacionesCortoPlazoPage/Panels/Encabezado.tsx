import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subDays } from "date-fns/esm";
import enGB from "date-fns/locale/en-GB";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getListadoUsuarios } from "../../APIS/solicitudesUsuarios/Solicitudes-Usuarios";
import { DateInput } from "../../CustomComponents";

export interface IUsuariosCorto {
  IdUsuario: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  IdEntidad: string;
  IdRol: string;
  Puesto: string;
}

export interface IRoles {
  Id: string;
  Descripcion: string;
}

export function Encabezado() {
  const tipoDocumento: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const getTiposEntesPublicos: Function = useCortoPlazoStore(
    (state) => state.getTiposEntesPublicos
  );
  const tipoEntePublico: { Id: string; TipoEntePublico: string } =
    useCortoPlazoStore((state) => state.encabezado.tipoEntePublico);
  const solicitanteAutorizado: {
    Solicitante: string;
    Cargo: string;
    Nombre: string;
  } = useCortoPlazoStore((state) => state.encabezado.solicitanteAutorizado);

  const organismo: { Id: string; Organismo: string } = useCortoPlazoStore(
    (state) => state.encabezado.organismo
  );
  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );
  const fechaContratacion: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  const changeEncabezado: Function = useCortoPlazoStore(
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
    usuarios.find(
      (usuario) => usuario.IdUsuario === solicitanteAutorizado.Solicitante
    )?.IdUsuario || "";
  // Verificar si el valor seleccionado existe en la lista de opciones
  const isValueValid = usuarios.some(
    (usuario) => usuario.IdUsuario === selectedValue
  );

  return (
    <Grid container
    height={"25rem"}
    >
      <Grid
        item
        container
        mt={{xs: 2}}
        // mt={{ xs: 10, sm: 10, md: 10, lg: 5 }}
        // ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        // spacing={{ xs: 2, md: 5, lg: 10 }}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid item xs={10} md={3} lg={3}>
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

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante Autorizado
          </InputLabel>
          <Select
            sx={queries.medium_text}
            fullWidth
            value={isValueValid ? selectedValue : ""}
            onChange={(e) => {
              let x = usuarios.find(
                (usuario) => usuario.IdUsuario === e.target.value
              );
              changeEncabezado({
                tipoDocumento: tipoDocumento,
                solicitanteAutorizado: {
                  Solicitante: x?.IdUsuario || "",
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
              <MenuItem key={usuario.IdUsuario} value={usuario.IdUsuario}>
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
        // mt={{ xs: 10, sm: 10, md: 20, lg: 10 }}
        // ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        // spacing={{ xs: 2, md: 5, lg: 10 }}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid item xs={10} md={3} lg={3}>
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

        <Grid item xs={10} md={3} lg={3}>
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

        <Grid item xs={10} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DesktopDatePicker
            sx={{width:"100%"}}
              value={new Date(fechaContratacion)}
              onChange={(date) => {
                changeEncabezado({
                  tipoDocumento: tipoDocumento,
                  solicitanteAutorizado: {
                    Solicitante: solicitanteAutorizado.Solicitante || "",
                    Cargo: solicitanteAutorizado?.Cargo || "",
                    Nombre: solicitanteAutorizado.Nombre,
                  },
                  tipoEntePublico: tipoEntePublico,
                  organismo: organismo,
                  fechaContratacion: date,
                });
              }}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
              // slots={{
              //   textField: DateInput,
              // }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
