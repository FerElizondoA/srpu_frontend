/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { AgregarFideicomisos } from "../../components/fideicomisos/dialog/AgregarFideicomisos";
import { queries } from "../../queries";
import { Fideicomiso } from "../../store/Fideicomiso/fideicomiso";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Numero del fideicomiso",
  },
  {
    label: "Fecha",
  },
  {
    label: "Tipo de fideicomiso",
  },
  {
    label: "Fiudiciario",
  },
  {
    label: "Accion",
  },
];

export function Fideicomisos() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [busqueda, setBusqueda] = useState("");

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    // filtrarDatos();
  };

  const [openAgregarFideicomisos, changeAgregarFideicomisos] = useState(false);

  const [accion, setAccion] = useState("Agregar");

  const tablaFideicomisos: Fideicomiso[] = useCortoPlazoStore(
    (state) => state.tablaFideicomisos
  );
  const getFideicomisos: Function = useCortoPlazoStore(
    (state) => state.getFideicomisos
  );

  const editFideicomiso: Function = useCortoPlazoStore(
    (state) => state.editFideicomiso
  );

  useEffect(() => {
    getFideicomisos();
  }, []);

  return (
    <Grid container flexDirection="column" justifyContent={"space-between"}>
      <Grid item>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>

      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={60}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            "@media (max-width: 600px)": {
              // XS (extra small) screen
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              // SM (small) screen
              fontSize: "1.5ch",
            },
          }}
        >
          Fideicomisos
        </Typography>
      </Grid>

      <Grid item mb={5} lg={12} display="center" justifyContent="space-between">
        <Grid width={"80%"} display={"flex"} justifyContent={"end"}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              width: "80%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => handleSearch()}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid width={"10%"} display={"flex"} justifyContent={"start"}>
          <Button
            sx={{ ...queries.buttonContinuar }}
            onClick={() => {
              setAccion("Agregar");
              changeAgregarFideicomisos(!openAgregarFideicomisos);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {heads.map((head, index) => (
                  <StyledTableCell key={index} align="center">
                    {head.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tablaFideicomisos.map((row: any, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {row.NumeroDeFideicomiso}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.TipoDeFideicomiso}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.FechaDeFideicomiso}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Fiudiciario}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton
                          type="button"
                          onClick={() => {
                            editFideicomiso(
                              JSON.parse(row.Fideicomisario),
                              JSON.parse(row.SoporteDocumental)
                            );
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          type="button"
                          // onClick={() => removeSoporteDocumental(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <AgregarFideicomisos
        handler={changeAgregarFideicomisos}
        openState={openAgregarFideicomisos}
        accion={accion}
      />

      {/* <Dialog open={openDialogEliminar}>
        <DialogTitle sx={queries.bold_text}>Advertencia </DialogTitle>
        <DialogContent>
          <Typography sx={queries.medium_text}>
            ¿Seguro que desea eliminar a este usuario?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonContinuar}
            onClick={() => setOpendDialogEliminar(!openDialogEliminar)}
          >
            Aceptar
          </Button>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => setOpendDialogEliminar(!openDialogEliminar)}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  );
}
