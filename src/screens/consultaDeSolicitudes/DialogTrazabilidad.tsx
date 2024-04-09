import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { IData } from "./ConsultaDeSolicitudPage";
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

type Props = {
  handler: Function;
  openState: boolean;
  idSolicitud: string;
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

  useEffect(() => {
    getRegistroTrazabilidad(props.idSolicitud);
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
      <DialogTitle >
        <Typography sx={{
          ...queries.bold_text,
          display: "flex",
          justifyContent: "center"
        }}>Historial de la solicitud</Typography>
      </DialogTitle>

      <DialogContent sx={{
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
      }}>
        <Grid height={"20rem"} width={"60rem"}>
          <Table stickyHeader sx={{
            height: "10rem",
          }}
          >
            <TableHead>
              <StyledTableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="center" key={index}>
                    <TableSortLabel >{head.label} </TableSortLabel>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {listadoRegistroTrazabilidad.length === 0 ?
                <StyledTableRow>
                  <StyledTableCell align="center">
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Typography>
                      Sin registro previo
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                  </StyledTableCell>
                </StyledTableRow>
                :
                listadoRegistroTrazabilidad.map((row, index) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      <Typography>
                        {row.NombreCompletoUsuarioModificador}
                      </Typography>
                    </StyledTableCell>


                    <StyledTableCell align="center">
                      <Typography>
                        {row.NombreEstatus}
                      </Typography>
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
              }

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
