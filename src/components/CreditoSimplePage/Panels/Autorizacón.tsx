import React, { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  Button,
  InputLabel,
  TextField,
  ButtonGroup,
  Select,
  MenuItem,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { queries } from "../../../queries";

{
  /*------------------------------------------------------------*/
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#AF8C55",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

{
  /*------------------------------------------------------------*/
}
export function Autorización() {
  {
    /*------------------------------------------------------------*/
  }
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  {
    /*------------------------------------------------------------*/
  }

  return (
    <Grid container>
      <Grid
        item
        container
        spacing={5}
        mt={{ sm: 3, md: 10, lg: 10, xl: 10 }}
        ml={{ md: 5, lg: 12, xl: 50 }}
      >
        <Grid item xs={3.5} md={6} lg={4}>
          <InputLabel sx={queries.medium_text}>
            Autorización de la legislatura local
          </InputLabel>
          <Select fullWidth variant="standard" label="test">
            <MenuItem sx={queries.text}>Item 1</MenuItem>
            <MenuItem sx={queries.text}>Item 2</MenuItem>
            <MenuItem sx={queries.text}>Item 3</MenuItem>
          </Select>
        </Grid>

        <Grid item container flexDirection="row" xs={3.5} md={5} lg={4}>
          <Grid
            item
            xs={3.5}
            md={5}
            lg={5}
            sx={{
              display: "center",
              //alignItems: "center",
            }}
          >
            <Button variant="outlined">Asignar</Button>
          </Grid>

          <Grid
            item
            xs={3.5}
            md={4}
            lg={4}
            sx={{
              display: "center",
              //alignItems: "center",
            }}
          >
            <Button variant="outlined">Nuevo</Button>
          </Grid>
        </Grid>
      </Grid>

        <Grid
        container
          item
          xs={3.5}
          md={8}
          lg={8}
          mt={{ sm: 3, md: 5, lg: 12, xl: 12 }}
          ml={{ md: 19, lg: 30, xl: 30 }}
          sx={{
            width: "50%"
            //alignItems: "center",
          }}
        >
          <TableContainer>
            <Table aria-label="customized table"
            sx={{
                    height: "100%"
                //alignItems: "center",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                  <StyledTableCell align="right">Calories</StyledTableCell>
                  <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                  <StyledTableCell align="right">
                    Carbs&nbsp;(g)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Protein&nbsp;(g)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.protein}
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
