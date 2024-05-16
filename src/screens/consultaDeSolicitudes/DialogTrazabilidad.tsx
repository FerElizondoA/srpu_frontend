/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { queries } from "../../queries";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { useEffect } from "react";
import { useTrazabilidad } from "../../store/Trazabilidad/main";
import { IDataTrazabilidad } from "../../store/Trazabilidad/Trazabilidad";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";

type Props = {
  handler: Function;
  openState: boolean;
  row: IInscripcion;
};

const heads: Array<{ label: string }> = [
  {
    label: "Usuario Modificador",
  },
  {
    label: "Cambio de estatus",
  },
  {
    label: "Fecha del movimiento",
  },
];

export function DialogTrazabilidad(props: Props) {
  const getRegistroTrazabilidad: Function = useTrazabilidad(
    (state) => state.getRegistroTrazabilidad
  );

  const listadoRegistroTrazabilidad: IDataTrazabilidad[] = useTrazabilidad(
    (state) => state.listadoRegistroTrazabilidad
  );

  const Id: string = useInscripcionStore((state) => state.inscripcion.Id);

  useEffect(() => {
    getRegistroTrazabilidad(props.row.Id);
    console.log(listadoRegistroTrazabilidad)
  }, [!props.openState]);

  return (
    <Dialog
      open={props.openState}
      maxWidth={"lg"}
      onClose={() => {
        props.handler(false);
        //cleanSolicitud();
      }}
    >
      <DialogTitle>
        <Typography
          sx={{
            ...queries.bold_text,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Historial de la solicitud
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: ".5vw",
            height: ".5vh",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#AF8C55",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Grid height={"20rem"} width={"60rem"}>
          <Table
            stickyHeader
            sx={{
              height: "10rem",
            }}
          >
            <TableHead>
              <StyledTableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="center" key={index}>
                    <TableSortLabel>{head.label} </TableSortLabel>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {listadoRegistroTrazabilidad.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell align="center"></StyledTableCell>

                  <StyledTableCell align="center">
                    <Typography>Sin registro previo</Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center"></StyledTableCell>
                </StyledTableRow>
              ) : (
                listadoRegistroTrazabilidad.map((row, index) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      <Typography>
                        {row.NombreCompletoUsuarioModificador}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography>{row.NombreEstatus}</Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography>
                        {format(new Date(row.FechaModificacion), "PPP", {
                          locale: es,
                        })}
                        {/* {row.FechaModificacion} */}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          onClick={() => {
            props.handler(false);
          }}
        >
          <Typography>Cerrar</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
