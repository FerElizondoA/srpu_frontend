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
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { queries } from "../../queries";
import { AgregarFideicomisos } from "./AgregarFideicomisos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
// import DownloadIcon from "@mui/icons-material/Download";
// import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";

interface Head {
  label: string;
}

const heads: Head[] = [
  {
    label: "Tipo de mecanismo de pago",
  },
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
    label: "Fiduciario",
  },
  {
    label: "fideicomisario",
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
              <StyledTableRow>
                <StyledTableCell>
                  <Typography></Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography></Typography>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Typography>Vacío</Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography></Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography></Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography></Typography>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Tooltip title="Ver">
                    <IconButton type="button">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar">
                    <IconButton
                      type="button"
                      onClick={() => {
                        setAccion("Editar");
                        changeAgregarFideicomisos(!openAgregarFideicomisos);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  {/* <Tooltip title="Comentarios">
                    <IconButton type="button">
                      <CommentIcon />
                    </IconButton>
                  </Tooltip> */}

                  <Tooltip title="Borrar">
                    <IconButton type="button">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <AgregarFideicomisos
        handler={changeAgregarFideicomisos}
        openState={openAgregarFideicomisos}
        accion={accion}
      />
    </Grid>
  );
}
