/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as React from "react";
import { useEffect } from "react";
import { queries } from "../../../queries";
import { IDatosFideicomiso } from "../../../screens/fuenteDePago/Fideicomisos";
import {
  IDeudorFideicomiso,
  IFideicomisario,
} from "../../../store/Fideicomiso/fideicomiso";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const heads: { label: string }[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Fideicomitente",
  },
  {
    label: "Fideicomitente",
  },
  {
    label: "Fuente de Pago",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente a los Municipios",
  },
  {
    label: "% de Asignación del Fondo o Ingreso Correspondiente al Municipio",
  },
  {
    label: "% del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Afectado al Fideicomiso del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% de Afectación del Gobierno del Estado /100 del Fondo o Ingreso",
  },
  {
    label:
      "% Acumulado de Afectación del Gobierno del Estado a los Mecanismos de Pago /100",
  },
  {
    label:
      "% Afectado al Fideicomiso del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label: "% Afectado al Fideicomiso del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
];

export function DetalleFideicomiso({
  open,
  setOpen,
  fideicomiso,
}: {
  open: boolean;
  setOpen: Function;
  fideicomiso: IDatosFideicomiso;
}) {
  useEffect(() => {
    console.log(fideicomiso);
  }, []);

  return (
    <Dialog
      open={open}
      fullScreen
      maxWidth={"lg"}
      TransitionComponent={Transition}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#686868",
          width: "100%",
          height: "8%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            ...queries.buttonCancelar,
            fontSize: "70%",
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Volver
        </Button>

        <Typography sx={{ ...queries.bold_text, color: "white", ml: 2 }}>
          Detalle de Fideicomiso
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ ...queries.medium_text, mb: 2 }}>
          <strong> Numero de Fideicomiso:</strong>{" "}
          {fideicomiso.NumeroFideicomiso}
        </Typography>

        <Typography sx={{ ...queries.medium_text, mb: 2 }}>
          <strong>Tipo de Fideicomiso:</strong> {fideicomiso.TipoFideicomiso}
        </Typography>

        <Typography sx={{ ...queries.medium_text, mb: 2 }}>
          <strong>Fecha de Fideicomiso:</strong>{" "}
          {format(new Date(fideicomiso.FechaFideicomiso), "PPP", {
            locale: es,
          })}
        </Typography>

        <Typography sx={{ ...queries.medium_text, mb: 2 }}>
          <strong>Fiduciario:</strong> {fideicomiso.Fiduciario}
        </Typography>

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel>Fideicomisario</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>Orden Fideicomisario</TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {JSON.parse(fideicomiso.Fideicomisario).map(
              (e: IFideicomisario, index: number) => (
                <StyledTableRow key={index} id={`${index + 1}`}>
                  <StyledTableCell scope="row">
                    {e.fideicomisario.Descripcion}
                  </StyledTableCell>
                  <StyledTableCell scope="row">
                    {e.ordenFideicomisario.Descripcion}
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {heads.map((head, index) => (
                <StyledTableCell key={index}>
                  <TableSortLabel>{head.label}</TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {JSON.parse(fideicomiso.TipoMovimiento).map(
              (row: IDeudorFideicomiso, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    {/* ID */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.id}
                      </Typography>
                    </StyledTableCell>

                    {/* TIPO MANDANTE */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.tipoFideicomitente.Descripcion}
                      </Typography>
                    </StyledTableCell>

                    {/* fideicomitente */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.fideicomitente.Descripcion}
                      </Typography>
                    </StyledTableCell>

                    {/* FUENTE DE PAGO */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.tipoFuente.Descripcion}
                      </Typography>
                    </StyledTableCell>

                    {/* FONDO INGRESO GOBIERNO ESTATAL */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.fondoIngresoGobiernoEstatal}
                      </Typography>
                    </StyledTableCell>

                    {/* FONDO INGRESO MUNICIPIOS */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.fondoIngresoMunicipios}
                      </Typography>
                    </StyledTableCell>

                    {/* FONDO INGRESO MUNICIPIO */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.fondoIngresoAsignadoMunicipio}
                      </Typography>
                    </StyledTableCell>

                    {/* INGRESO ORGANISMO */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.ingresoOrganismo}
                      </Typography>
                    </StyledTableCell>

                    {/* AFECTADO POR GOBIERNO ESTATAL */}
                    <StyledTableCell align="center">
                      {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                        "gobierno estatal" && (
                        <TextField
                          type="number"
                          inputProps={{
                            sx: {
                              fontSize: "0.7rem",
                            },
                          }}
                          size="small"
                          value={row?.fondoIngresoAfectadoXGobiernoEstatal}
                        />
                      )}
                    </StyledTableCell>

                    {/* AFECTACION GOBIERNO ESTATAL / 100 */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.afectacionGobiernoEstatalEntre100}
                      </Typography>
                    </StyledTableCell>

                    {/* ACUMULADO AFECTACION GOBIERNO ESTATAL / 100 */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                      </Typography>
                    </StyledTableCell>

                    {/* AFECTADO POR MUNICIPIO */}
                    <StyledTableCell align="center">
                      {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                        "municipio" && (
                        <TextField
                          type="number"
                          inputProps={{
                            sx: {
                              fontSize: "0.7rem",
                            },
                          }}
                          size="small"
                          value={row?.fondoIngresoAfectadoXMunicipio}
                        />
                      )}
                    </StyledTableCell>

                    {/* ACUMULADO AFECTACION MUNICIPIOS / ASIGNADO AL MUNICIPIO */}
                    <StyledTableCell align="center">
                      {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                        "municipio" && (
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {(
                            Number(
                              row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                            ) / Number(row?.fondoIngresoAsignadoMunicipio)
                          ).toFixed(6)}
                        </Typography>
                      )}
                    </StyledTableCell>

                    {/* AFECTADO POR ORGANISMO */}
                    <StyledTableCell align="center">
                      {row?.tipoFideicomitente.Descripcion.toLowerCase() !==
                        "gobierno estatal" &&
                        row?.tipoFideicomitente.Descripcion.toLowerCase() !==
                          "municipio" && (
                          <TextField
                            type="number"
                            inputProps={{
                              sx: {
                                fontSize: "0.7rem",
                              },
                            }}
                            size="small"
                            value={row?.ingresoAfectadoXOrganismo}
                          />
                        )}
                    </StyledTableCell>

                    {/* ACUMULADO AFECTACION ORGANISMO / 100 */}
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {(
                          Number(row?.acumuladoAfectacionOrganismoEntre100) /
                          100
                        ).toFixed(6)}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
