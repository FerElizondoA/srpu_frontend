import {
  Button,
  Dialog,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableSortLabel,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { Transition } from "../../../screens/fuenteDePago/Mandatos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getComentariosSolicitudPlazo } from "../../APIS/cortoplazo/ApiGetSolicitudesCortoPlazo";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { AgregarComentario } from "./DialogAgregarComentario";
import { rolesAdmin } from "./DialogSolicitarModificacion";

export interface IComentarios {
  Id: string;
  IdSolicitud: string;
  Comentarios: string;
  Tipo: string;
  FechaCreacion: string;
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
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const [menu, setMenu] = useState(
    rolesAdmin.includes(localStorage.getItem("Rol")!)
      ? "Requerimientos"
      : "Comentarios"
  );

  const eliminarRequerimientos: Function = useCortoPlazoStore(
    (state) => state.eliminarRequerimientos
  );

  useEffect(() => {
    if (IdSolicitud !== "") {
      getComentariosSolicitudPlazo(IdSolicitud, setDatosComentarios);
    }
  }, [IdSolicitud, openDialogCrear]);

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"lg"}
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle sx={{ color: "#AF8C55" }}>
        <Tabs
          value={menu}
          onChange={() => {
            menu === "Requerimientos"
              ? setMenu("Comentarios")
              : setMenu("Requerimientos");
          }}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons
          allowScrollButtonsMobile
          sx={{ width: "100%", fontSize: ".8rem" }}
        >
          {rolesAdmin.includes(localStorage.getItem("Rol")!) && (
            <Tab
              label="Requerimientos"
              value={"Requerimientos"}
              sx={{ ...queries.bold_text_Largo_Plazo }}
            />
          )}

          <Tab
            label="Comentarios"
            value={"Comentarios"}
            sx={{ ...queries.bold_text_Largo_Plazo }}
          />
        </Tabs>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
        {menu === "Requerimientos" ? (
          <Grid>
            {datosComentario.filter((f) => f.Tipo === "Requerimiento")[0] &&
            Object.entries(
              JSON.parse(
                datosComentario.filter((f) => f.Tipo === "Requerimiento")[0]
                  ?.Comentarios
              )
            ).length > 0 ? (
              Object.entries(
                JSON.parse(
                  datosComentario.filter((f) => f.Tipo === "Requerimiento")[0]
                    ?.Comentarios
                )
              ).map(([key, val], index) =>
                (val as string) === "" ? null : (
                  <Typography key={index} sx={{ mb: 1 }}>
                    <strong>{key}:</strong>
                    {val as string}
                  </Typography>
                )
              )
            ) : (
              <Typography sx={{ mb: 1 }}>
                <strong>Sin requerimientos</strong>
              </Typography>
            )}
          </Grid>
        ) : (
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
                  {datosComentario?.filter((r) => r.Tipo !== "Requerimiento")
                    .length !== 0 ? (
                    datosComentario
                      ?.filter((r) => r.Tipo !== "Requerimiento")
                      .map((row, index) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              sx={{
                                fontSize: "1.5ch",
                                width: "30%",
                              }}
                            >
                              {row.Nombre}
                            </StyledTableCell>

                            <StyledTableCell
                              sx={{
                                fontSize: "1.5ch",
                                width: "20%",
                              }}
                            >
                              {format(
                                new Date(row.FechaCreacion),
                                "dd/MM/yyyy"
                              )}
                            </StyledTableCell>

                            <StyledTableCell
                              sx={{
                                fontSize: "1.5ch",
                                width: "50%",
                              }}
                            >
                              {row?.Comentarios.includes("{")
                                ? Object.entries(
                                    JSON.parse(row?.Comentarios)
                                  ).map(([key, val], index) =>
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
                        Sin comentarios
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
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
        {rolesAdmin.includes(localStorage.getItem("Rol")!) && (
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenDialogEliminar(true);
            }}
          >
            Eliminar Requerimientos
          </Button>
        )}
        <Button
          sx={queries.buttonContinuar}
          onClick={() => {
            changeOpenDialogCrear(!openDialogCrear);
          }}
        >
          Crear nuevo comentario
        </Button>
      </DialogActions>
      <AgregarComentario
        handler={changeOpenDialogCrear}
        openState={openDialogCrear}
        IdSolicitud={IdSolicitud}
      />
      <Dialog
        open={openDialogEliminar}
        onClose={() => {
          setOpenDialogEliminar(false);
        }}
      >
        <DialogTitle>¿Eliminar requerimientos?</DialogTitle>
        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              setOpenDialogEliminar(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => {
              eliminarRequerimientos(
                datosComentario?.filter((r) => r.Tipo === "Requerimiento")[0]
                  .Id,
                () => {
                  setOpenDialogEliminar(false);
                  handler(false);
                }
              );
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
