import {
  Button,
  Dialog,
  Grid,
  Paper,
  Slide,
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
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
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

  const [menu, setMenu] = useState(
    rolesAdmin.includes(localStorage.getItem("Rol")!)
      ? "Requerimientos"
      : "Comentarios"
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
      maxWidth={"md"}
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
      <DialogContent>
        {menu === "Requerimientos" ? (
          <Grid>
            {datosComentario.filter((f) => f.Tipo === "Requerimiento")[0] &&
            Object.entries(
              JSON.parse(
                datosComentario.filter((f) => f.Tipo === "Requerimiento")[0]
                  ?.Comentarios
              )
            ).length > 0
              ? Object.entries(
                  JSON.parse(
                    datosComentario.filter((f) => f.Tipo === "Requerimiento")[0]
                      ?.Comentarios
                  )
                ).map(([key, val], index) =>
                  (val as string) === "" ? null : (
                    <Typography key={index}>
                      <strong>{key}:</strong>
                      {val as string}
                    </Typography>
                  )
                )
              : ""}
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
                  {datosComentario?.length !== 0 ? (
                    datosComentario
                      ?.filter((r) => r.Tipo !== "Requerimiento")
                      .map((row, index) => {
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
                              {Object.entries(JSON.parse(row?.Comentarios))
                                .length > 0
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
