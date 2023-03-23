import {
  Grid,
  Table,
  TableBody,
  TableSortLabel,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { queries } from "../../queries";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../CustomComponents";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getSolicitudes } from "../ObligacionesCortoPlazoPage/APIS/APISInformacionGeneral";
import e from "express";
interface IData {
  Institucion: string;
  TipoEntePublico: string;
  ClaveDeInscripcion: string;
  Estatus: string;
  FechaContratacion: Date;
  MontoOriginalContratado: number;
  //search: string
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
];


export function ConsultaDeSolicitudPage() {

  const [datos, setDatos] = useState([]);
  const [datostabla, setDatosTabla] =useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtrar, setFiltrar] = useState<Array<IData>>([]);
  const [baseDeDatos, setBaseDeDatos] = useState<Array<IData>>([]);
  console.log("soy la data1",filtrar);
  const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{

    setBusqueda(e.target.value)
    filtrar2(e.target.value);
    console.log("e..",e.target.value);
    console.log("busqueda",busqueda);
    
  }

  const handleSearch =() =>{
    filtrar2(JSON.stringify(baseDeDatos));

    console.log("busqueda",busqueda);
    
  }

  const filtrar2 = (terminoBusqueda: string) =>{
      let ResultadoBusqueda = baseDeDatos.filter((elemento)=>{

      if (elemento.ClaveDeInscripcion.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Estatus.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.FechaContratacion.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Institucion.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.MontoOriginalContratado.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.TipoEntePublico.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
      )
      console.log("elemento", elemento);
      let solicitud: IData ={
          Institucion: elemento.Institucion,
          TipoEntePublico: elemento.TipoEntePublico,
          ClaveDeInscripcion: elemento.ClaveDeInscripcion,
          Estatus: elemento.Estatus,
          FechaContratacion: elemento.FechaContratacion,
          MontoOriginalContratado:elemento.MontoOriginalContratado,
      }
      setFiltrar([...filtrar,solicitud])
        return elemento;
      
    })
    
    
  }

  

  useEffect(()=>{
    getSolicitudes(setBaseDeDatos)
  },[])

  return (
    <Grid container direction="column">
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid
        item
        //ml={window.innerWidth / 22}
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
            //alignItems: "center",
            width: 800,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar"
            value={busqueda}
            onChange={handleChange}
            //inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon  onClick = {() => handleSearch() }/>
          </IconButton>
        </Paper>
      </Grid>

      <Grid item>
        <TableContainer sx={{ maxHeight: "500px" }}>
          <Table>
            <TableHead>
              {heads.map((head) => (
                <StyledTableCell key={head.id}>
                  <TableSortLabel>{head.label}</TableSortLabel>
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {filtrar.map((row) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" >
                    {row.Institucion.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.TipoEntePublico.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Estatus.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.ClaveDeInscripcion.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.MontoOriginalContratado.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.FechaContratacion.toString()}
                  </StyledTableCell>
                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
