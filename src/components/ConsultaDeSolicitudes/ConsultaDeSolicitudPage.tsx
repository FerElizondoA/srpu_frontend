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
import { element } from "prop-types";

interface Data {
  Institucion_financiera: string;
  Tipo_de_ente_público_obligado: string;
  Clave_de_inscripcion: string;
  Estatus: string;
  Fecha_de_contratacion_desde: Date;
  Monto_original_contratado: number;
  //search: string
}

interface Head {
  id: keyof Data;
  isNumeric: boolean;
  label: string;
}
const heads: readonly Head[] = [
  {
    id: "Institucion_financiera",
    isNumeric: true,
    label: "Institucion financiera",
  },
  {
    id: "Tipo_de_ente_público_obligado",
    isNumeric: true,
    label: "Tipo de ente público obligado",
  },
  {
    id: "Estatus",
    isNumeric: true,
    label: "Estatus",
  },
  {
    id: "Clave_de_inscripcion",
    isNumeric: true,
    label: "Clave de inscripcion",
  },
  {
    id: "Monto_original_contratado",
    isNumeric: true,
    label: "Monto original contratado",
  },
  {
    id: "Fecha_de_contratacion_desde",
    isNumeric: true,
    label: "Fecha de contratacion desde",
  },
];

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "white",
//     color: theme.palette.common.black,
//     fontFamily: "MontserratMedium",
//     fontSize: "1.8ch",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontFamily: "MontserratRegular",
//     fontSize: "1.5ch",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   fontFamily: "MontserratMedium",
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
const ejemplos = [
  {
    Institucion_financiera: "Banorte",
    Monto_original_contratado: 2000000,
    Tipo_de_ente_público_obligado: "Municipio",
    Clave_de_inscripcion: "123-rg",
    Estatus: "completa",
    Fecha_de_contratacion_desde: "12/03/2023", 
  },
  {
    Institucion_financiera: "Santandar",
    Monto_original_contratado: 3000000,
    Tipo_de_ente_público_obligado: "Municipio",
    Clave_de_inscripcion: "434-ph",
    Estatus: "por terminar",
    Fecha_de_contratacion_desde: "06/01/2023",
  },
  {
    Institucion_financiera: "Banco Azteca",
    Monto_original_contratado: 4500000,
    Tipo_de_ente_público_obligado: "Municipio",
    Clave_de_inscripcion: "988-tf",
    Estatus: "incompleta",
    Fecha_de_contratacion_desde: "01/02/2023",
  },
  {
    Institucion_financiera: "Citibanamex",
    Monto_original_contratado: 8500000,
    Tipo_de_ente_público_obligado: "Municipio",
    Clave_de_inscripcion: "788-ap",
    Estatus: "por terminar",
    Fecha_de_contratacion_desde: "01/01/2023",
  },
];



export function ConsultaDeSolicitudPage() {
  //console.log("hola soy el objeto", ejemplos);

  // const [word, setWord] = useState("");
  // const [filterDisplay, setFilterDisplay] = useState([])
  // const [busqueda] = useState([ejemplos])
  // const handleChange = () =>{
  //   //setWord();
  //   let oldList = ejemplos.map(row => {
  //     return {Instituto: row.Institucion_financiera, Monto: row.Monto_original_contratado, Ente_público: row.Tipo_de_ente_público_obligado,
  //             Clave: row.Clave_de_inscripcion, Estatus: row.Estatus, Fecha: row.Fecha_de_contratacion_desde
  //     };
  //   });
  //   if (word !== ""){
  //     let newList = [];

  //     newList = oldList.filter(row =>
  //       row.Instituto.includes(word.toLowerCase())
  //       );
  //       setFilterDisplay(newList);
  //   }else{
  //     setFilterDisplay(ejemplos)
  //   };

  // }

  const [datos, setDatos] = useState([]);
  const [datostabla, setDatosTabla] =useState([]);
  const [busqueda, setBusqueda] = useState("");

  const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    setBusqueda(e.target.value)
    filtrar(e.target.value);
    
  }

  const filtrar = (terminoBusqueda: string) =>{
    let ResultadoBusqueda = ejemplos.filter((elemento)=>{
      if (elemento.Clave_de_inscripcion.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Estatus.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Fecha_de_contratacion_desde.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Institucion_financiera.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Monto_original_contratado.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
        || elemento.Tipo_de_ente_público_obligado.toString().toLocaleLowerCase().includes(terminoBusqueda.toLocaleLowerCase())
      )
      {
        console.log("elemento", elemento);
        return elemento;
        
        
      }
    })
  }

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
            <SearchIcon  onClick = {() =>handleChange}/>
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
              {ejemplos.map((row) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" >
                    {row.Institucion_financiera.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Tipo_de_ente_público_obligado.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Estatus.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Clave_de_inscripcion.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Monto_original_contratado.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row.Fecha_de_contratacion_desde}
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
