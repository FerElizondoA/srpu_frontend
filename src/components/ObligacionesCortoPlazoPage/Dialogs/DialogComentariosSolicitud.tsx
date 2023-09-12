import {
  Button,
  Dialog,
  Grid,
  Paper,
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { AgregarComentario } from "./DialogAgregarComentario";

interface IComentarios {
  Comentarios: string;
  CreadoPor: string;
  FechaCreacion: string;
  Id: string;
  Mensaje: string;
  Nombre: string;
}

interface Head {
  id: keyof IComentarios;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "Nombre",
    isNumeric: true,
    label: "Usuario",
  },
  {
    id: "FechaCreacion",
    isNumeric: true,
    label: "Fecha",
  },
  {
    id: "Comentarios",
    isNumeric: true,
    label: "Comentarios",
  },
];

// const comentarios: IComentario[] = useCortoPlazoStore(
//   (state) => state.comentarios
// );

////////////////////////////////////////////////////////////////////////

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function VerComentariosSolicitud({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
  const [datosComentario, setDatosComentarios] = useState<Array<IComentarios>>(
    []
  );

  const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  const [openDialogCrear, changeOpenDialogCrear] = useState(false);

  const changeOpenDialogState = (open: boolean) => {
    changeOpenDialogCrear(open);
  };

  useEffect(() => {
    if (IdSolicitud !== "") {
      getComentariosSolicitudPlazo(IdSolicitud, setDatosComentarios);
    }
  }, [IdSolicitud, openDialogCrear]);

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle sx={{ color: "#AF8C55" }}>Comentarios</DialogTitle>
      <DialogContent>
        <Grid item>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <StyledTableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell key={index}>
                      <TableSortLabel sx={{ color: "#AF8C55" }}>
                        {head.label}{" "}
                      </TableSortLabel>
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {datosComentario.length !== 0 ? (
                  datosComentario?.map((row, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.Nombre}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {row.FechaCreacion.split("T")[0]}
                        </StyledTableCell>

                        <StyledTableCell
                          sx={{
                            fontSize: "1.5ch",
                          }}
                        >
                          {Object.entries(JSON.parse(row.Comentarios)).length >
                          0
                            ? Object.entries(JSON.parse(row.Comentarios)).map(
                                ([key, val], index) =>
                                  (val as string) === "" ? null : (
                                    <Typography key={index}>
                                      <strong>{key}:</strong>
                                      {val as string}
                                    </Typography>
                                  )
                              )
                            : row.Comentarios}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <StyledTableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center"></StyledTableCell>

                    <StyledTableCell align="center">
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "normal",
                          width: 600,
                          fontSize: 14,
                        }}
                      >
                        Sin comentarios
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          sx={queries.buttonCancelar}
          onClick={() => {
            handler(false);
          }}
        >
          Cerrar
        </Button>
        <Button
          sx={queries.buttonContinuar}
          onClick={() => {
            changeOpenDialogState(!openDialogCrear);
          }}
        >
          CREAR NUEVO COMENTARIO
        </Button>
      </DialogActions>
      <AgregarComentario
        handler={changeOpenDialogState}
        openState={openDialogCrear}
        IdSolicitud={IdSolicitud}
      />
    </Dialog>
  );
}
