/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  IconButton,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/main";
import { DateInput } from "../../CustomComponents";
import { Label } from "@mui/icons-material";
import { Fideicomisario } from "../../../store/Fideicomiso/fideicomiso";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

interface HeadLabels {
  label: string;
  value: string;
}

export function DatoGeneralesFideicomiso() {
  const numeroFideicomiso: string = useCortoPlazoStore(
    (state) => state.generalFideicomiso.numeroFideicomiso
  );
  const tipoFideicomiso: string = useCortoPlazoStore(
    (state) => state.generalFideicomiso.tipoFideicomiso
  );
  const fechaFideicomiso: string = useCortoPlazoStore(
    (state) => state.generalFideicomiso.fechaFideicomiso
  );
  const fiudiciario: string = useCortoPlazoStore(
    (state) => state.generalFideicomiso.fiudiciario
  );

  const fideicomisario: string = useCortoPlazoStore(
    (state) => state.fideicomisario.fideicomisario
  );
  const ordenFideicomisario: string = useCortoPlazoStore(
    (state) => state.fideicomisario.ordenFideicomisario
  );
  const tablaFideicomisario: Fideicomisario[] = useCortoPlazoStore(
    (state) => state.tablaFideicomisario
  );

  const setGeneralFideicomiso: Function = useCortoPlazoStore(
    (state) => state.setGeneralFideicomiso
  );

  const setFideicomisario: Function = useCortoPlazoStore(
    (state) => state.setFideicomisario
  );

  const addFideicomisario: Function = useCortoPlazoStore(
    (state) => state.addFideicomisario
  );

  const heads: HeadLabels[] = [
    {
      label: "Prueba 1 ",
      value: "1",
    },
    {
      label: "Prueba 2",
      value: "2",
    },
    {
      label: "Prueba 3",
      value: "3",
    },
    {
      label: "Prueba 4 ",
      value: "4",
    },
    {
      label: "Prueba 5",
      value: "5",
    },
    {
      label: "Prueba 6",
      value: "6",
    },
  ];

  const headsFideicomisario: HeadLabels[] = [
    {
      label: "Fideicomisario",
      value: "1",
    },
    {
      label: "Orden Fideicomisario",
      value: "2",
    },
  ];

  useEffect(() => {
    if (fideicomisario !== "" && ordenFideicomisario !== "")
      addFideicomisario({
        fideicomisario: fideicomisario,
        ordenFideicomisario: ordenFideicomisario,
      });
  }, [fideicomisario, ordenFideicomisario]);

  return (
    // <Grid container >
    <Grid
      sx={queries.contenedorDatoGenerales}
      item
      container
      mt={2}
      direction="column"
      justifyContent={"space-evenly"}
    >
      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid xs={12} sm={12} lg={2}>
          <InputLabel sx={queries.medium_text}>
            Numero del fideicomiso
          </InputLabel>
          <FormControl fullWidth>
            <Select
              value={numeroFideicomiso}
              onChange={(v) => {
                setGeneralFideicomiso({
                  numeroFideicomiso: v.target.value,
                  tipoFideicomiso: tipoFideicomiso,
                  fechaFideicomiso: fechaFideicomiso,
                  fiudiciario: fiudiciario,
                });
              }}
            >
              {heads.map((item, index) => {
                return (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={12} lg={2}>
          <InputLabel sx={queries.medium_text}>Tipo de fideicomiso</InputLabel>
          <FormControl fullWidth>
            <Select
              value={tipoFideicomiso}
              onChange={(v) => {
                setGeneralFideicomiso({
                  numeroFideicomiso: numeroFideicomiso,
                  tipoFideicomiso: v.target.value,
                  fechaFideicomiso: fechaFideicomiso,
                  fiudiciario: fiudiciario,
                });
              }}
            >
              {heads.map((item, index) => {
                return (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={12} lg={2}>
          <InputLabel sx={queries.medium_text}>Fecha de Primer Pago</InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(fechaFideicomiso)}
              onChange={(date) => {
                setGeneralFideicomiso({
                  numeroFideicomiso: numeroFideicomiso,
                  tipoFideicomiso: tipoFideicomiso,
                  fechaFideicomiso: date,
                  fiudiciario: fiudiciario,
                });
              }}
              // minDate={new Date()}
              // maxDate={new Date(addDays(new Date(), 365))}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid xs={12} sm={12} lg={2}>
          <InputLabel sx={queries.medium_text}>Fiduciario</InputLabel>
          <FormControl fullWidth>
            <Select
              value={fiudiciario}
              onChange={(v) => {
                setGeneralFideicomiso({
                  numeroFideicomiso: numeroFideicomiso,
                  tipoFideicomiso: tipoFideicomiso,
                  fechaFideicomiso: fechaFideicomiso,
                  fiudiciario: v.target.value,
                });
              }}
            >
              {heads.map((item, index) => {
                return (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid>
        <Divider>
          <Typography sx={{ ...queries.bold_text, color: "#af8c55 " }}>
            FIDEICOMISARIO
          </Typography>
        </Divider>
      </Grid>

      <Grid container mt={2} display={"flex"} justifyContent={"space-evenly"}>
        <Grid lg={2}>
          <InputLabel sx={queries.medium_text}>Fideicomisario</InputLabel>
          <FormControl fullWidth>
            <Select
              value={fideicomisario}
              onChange={(v) => {
                setFideicomisario({
                  fideicomisario: v.target.value,
                  ordenFideicomisario: ordenFideicomisario,
                });
              }}
            >
              {heads.map((item, index) => {
                return (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid lg={2}>
          <InputLabel sx={queries.medium_text}>Orden fideicomisario</InputLabel>
          <FormControl fullWidth>
            <Select
              value={ordenFideicomisario}
              onChange={(v) => {
                setFideicomisario({
                  fideicomisario: fideicomisario,
                  ordenFideicomisario: v.target.value,
                });
              }}
            >
              {heads.map((item, index) => {
                return (
                  <MenuItem value={item.label} key={index}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            sx={{
              ...queries.buttonContinuarSolicitudInscripcion,
              width: "15vh",
            }}
          >
            Agregar
          </Button>
        </Grid>

        <Grid container sx={queries.tablaFideicomisario}>
          <Paper sx={{ height: "100%", width: "88%", overflow: "auto" }}>
            <TableContainer
              sx={{
                maxHeight: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#AF8C55",
                  outline: "1px solid slategrey",
                  borderRadius: 1,
                },
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {headsFideicomisario.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <Typography>{head.label}</Typography>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablaFideicomisario.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              // onClick={() => removeComision(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tipoDeComision}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {format(
                            new Date(row.fechaContratacion),
                            "dd/MM/yyyy"
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.periodicidadDePago}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.porcentaje > 0
                            ? row.porcentaje.toString() + "%"
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.monto > 0 ? "$" + row.monto.toString() : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.iva}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
    // </Grid>
  );
}
