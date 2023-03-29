import {
  Grid,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Chip,
} from "@mui/material";
import { LateralMenu } from "../LateralMenu/LateralMenu";

import {
  StyledTableCell,
  StyledTableRow,
} from "../CustomComponents";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { useEffect, useState } from "react";
import { getSolicitudes } from "../ObligacionesCortoPlazoPage/APIS/APISInformacionGeneral";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

import { format } from 'date-fns'

interface IData {
  Institucion: string;
  TipoEntePublico: string;
  ClaveDeInscripcion: string;
  Estatus: string;
  FechaContratacion: Date;
  MontoOriginalContratado: number;
  Ver: boolean;
  Solicitud: string;
}

interface Head {
  id: keyof IData;
  isNumeric: boolean;
  label: string;
}
const heads: readonly Head[] = [
  {
    id: "Institucion",
    isNumeric: true,
    label: "Institucion financiera",
  },
  {
    id: "TipoEntePublico",
    isNumeric: true,
    label: "Tipo de ente público obligado",
  },
  {
    id: "Estatus",
    isNumeric: true,
    label: "Estatus",
  },
  {
    id: "ClaveDeInscripcion",
    isNumeric: true,
    label: "Clave de inscripcion",
  },
  {
    id: "MontoOriginalContratado",
    isNumeric: true,
    label: "Monto original contratado",
  },
  {
    id: "FechaContratacion",
    isNumeric: true,
    label: "Fecha de contratacion",
  },
  {
    id: "Ver",
    isNumeric: true,
    label: "Ver",
  },
];

export function ConsultaDeSolicitudPage() {
  const [datos, setDatos] = useState<Array<IData>>([]);
  // const [datostabla, setDatosTabla] =useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState<Array<IData>>([]);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const filtrarDatos = () => {
    let ResultadoBusqueda = datos.filter((elemento) => {
      if (
        elemento.ClaveDeInscripcion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Estatus.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaContratacion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Institucion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MontoOriginalContratado.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.TipoEntePublico.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        console.log(elemento);

        return elemento;
      }
    });
    setDatosFiltrados(ResultadoBusqueda);
  };

  useEffect(() => {
    getSolicitudes(setDatos);
  }, []);

  useEffect(() => {
    setDatosFiltrados(datos);
  }, [datos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length != 0 ? setDatosFiltrados(datos) : null;
  }, [busqueda]);

  const navigate = useNavigate();

  const handleNavigate = (solicitud: any) => {
    console.log("solicitud!: ", solicitud)
    let aux: any = JSON.parse(solicitud)
    console.log("aux!: ", aux);
    navigate("../ObligacionesCortoPlazo")
  };

  return (
    <Grid container direction="column">
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid
        item
        mt={5}
        mb={5}
        lg={12}
        display="center"
        justifyContent="center"
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            width: 800,
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
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon onClick={() => handleSearch()} />
          </IconButton>
        </Paper>
      </Grid>

      <Grid item>
        <TableContainer sx={{ maxHeight: "900px" }}>
          <Table>
            <TableHead>
              {heads.map((head) => (
                <StyledTableCell key={head.id}>
                  <TableSortLabel>{head.label}</TableSortLabel>
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {datosFiltrados.map((row) => {

                let chip = <></>;
                if(row.Estatus === "En_actualizacion "){
                  chip = <Chip label="En verificación" icon={<WarningAmberIcon/>} 
                  color="warning" variant="outlined"/>
                }

                return (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.Institucion.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.TipoEntePublico.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {chip}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {row.ClaveDeInscripcion.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center">
                      {"$" + row.MontoOriginalContratado.toString()}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {format(new Date(row.FechaContratacion), "dd/MM/yyyy")}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <VisibilityIcon
                          onClick={() => {
                            handleNavigate(row.Solicitud);
                          }}
                        />
                        {row.Ver}
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
})}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
