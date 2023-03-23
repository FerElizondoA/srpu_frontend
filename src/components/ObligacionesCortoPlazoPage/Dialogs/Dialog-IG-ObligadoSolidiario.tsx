import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  InputLabel,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";
import CloseIcon from "@mui/icons-material/Close";

import { queries } from "../../../queries";
////////////////////////////////////////////////////////
interface DataObligadoSalarial {
  isSelected: boolean;
  obligadosolidario: string;
  tipoentepunlicoobligado: string;
  entepublicoobligado: string;
}

interface Head {
  id: keyof DataObligadoSalarial;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "isSelected",
    isNumeric: false,
    label: "Seleccion",
  },
  {
    id: "isSelected",
    isNumeric: false,
    label: "Obligado solidario / aval",
  },
  {
    id: "isSelected",
    isNumeric: false,
    label: "Tipo de ente público obligado",
  },
  {
    id: "isSelected",
    isNumeric: false,
    label: "Ente público obligado",
  },
];

function createDummyData(
  obligadosolidario: string,
  tipoentepunlicoobligado: string,
  entepublicoobligado: string
) {
  return {
    obligadosolidario,
    tipoentepunlicoobligado,
    entepublicoobligado,
  };
}

const rows = [
  createDummyData("ley federal", "Municipio", "Monterrey"),
  createDummyData("opc1", "opc2", "opc3"),
  createDummyData("ley federal", "Municipio", "Monterrey"),
  createDummyData("opc1", "opc2", "opc3"),
];
////////////////////////////////////////////////////////
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class ObligadoSolidarioAval extends React.Component<{
  handler: Function;
  openState: boolean;
}> {
  state = {
    obligadoCatalog: [""],
    enteCatalog: [""],
  };

  fetchObligadoCatalog() {
    axios
      .get("http://10.200.4.199:8000/api/get-obligadoSolidarioAval", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        response.data.data.forEach((element: any) => {
          // TODO: type
          this.state.obligadoCatalog.push(element.ObligadoSolidarioAval);
        });
      });
    this.state.obligadoCatalog.shift();
  }

  fetchEnteCatalog() {
    axios
      .get("http://10.200.4.199:8000/api/get-entePublicoObligado", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        response.data.data.forEach((element: any) => {
          // TODO: type
          this.state.enteCatalog.push(element.EntePublicoObligado);
        });
      });
    this.state.enteCatalog.shift();
  }

  componentDidMount() {
    this.fetchObligadoCatalog();
    this.fetchEnteCatalog();
  }

  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.openState}
        onClose={() => this.props.handler(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => this.props.handler(false)}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={queries.bold_text}>
              Obligado Solidario / Aval
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container direction="column">
          <Grid item container>
            <Grid
              item
              container
              spacing={5}
              mt={{ xs: 10, sm: 10, md: 5, lg: 5 }}
              ml={{ xs: 15, sm: 20, md: 25, lg: window.innerWidth / 50 + 10 }}
            >
              <Grid item xs={3} md={3} lg={3}>
                <InputLabel sx={queries.medium_text}>
                  Obligado solidario / aval
                </InputLabel>
                <Autocomplete
                  fullWidth
                  options={this.state.obligadoCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3} md={3} lg={3}>
                <InputLabel sx={queries.medium_text}>
                  Tipo de ente público obligado
                </InputLabel>
                <Autocomplete
                  fullWidth
                  options={this.state.enteCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3} md={3} lg={3}>
                <InputLabel sx={queries.medium_text}>
                  Ente público obligado
                </InputLabel>
                <TextField
                  fullWidth
                  variant="standard"
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" mt={10}>
          <Grid item>
            <TableContainer sx={{ maxHeight: "400px" }}>
              <Table>
                <TableHead>
                  {heads.map((head) => (
                    <StyledTableCell key={head.id}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow>
                      <StyledTableCell padding="checkbox">
                        <Checkbox />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.entepublicoobligado.toString()}
                      </StyledTableCell>
                      <StyledTableCell component="th">
                        {row.obligadosolidario.toString()}
                      </StyledTableCell>
                      <StyledTableCell component="th">
                        {row.tipoentepunlicoobligado.toString()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item container position="fixed" sx={{ top: "auto", bottom: 0 }}>
          <Grid item md={6}lg={6}>
            <ConfirmButton
              variant="outlined"
             
            >
              AGREGAR
            </ConfirmButton>
            
          
          </Grid>
          <Grid item md={6} lg={6}>
            <DeleteButton variant="outlined">ELIMINAR</DeleteButton>
          </Grid>
        </Grid>
        </Grid>
      </Dialog>
    );
  }
}
