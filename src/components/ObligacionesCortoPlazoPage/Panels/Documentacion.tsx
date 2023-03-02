import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";
import { queries } from "../../../queries";

interface Data {
  isSelected: boolean;
  Documento: String;
}

interface Head {
  id: keyof Data;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "isSelected",
    isNumeric: false,
    label: "Selección",
  },
  {
    id: "Documento",
    isNumeric: false,
    label: "Documento/File",
  },
];

function createDummyData(Documento: String) {
  return {
    Documento,
  };
}

const rows = [createDummyData("Documento cualquiera.pdf")];

export function Documentacion() {
  const [file, setFile] = useState("");

  return (
    <Grid item container direction="column" sx={{ display: "flex" }}>
      <Grid item>
        <TableContainer sx={{ minHeight: "100%" }}>
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

                  <StyledTableCell component="th">
                    {row.Documento.toString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid
        item
        container
        position="fixed"
        //gap={0}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          top: "auto",
          bottom: 0,
        }}
      >
        <Grid item md={6} lg={6} sx={{display:"flex", justifyContent: "flex-end", top: "auto", bottom: 0 }}>
          <Typography
            position={"absolute"}
            sx={{
              border: " 1px solid",
              borderBlockColor: "#AF8C55",
              //backgroundColor: "#AF8C55",
              fontFamily: "MontserratMedium",
              textAlign: "center",
            //   justifyContent:"center",
            //   alignItems:"center",
              margin:"auto 0",
              width: "50%",
              height: "100%",
            }}
          >
            ARRASTRE O DE CLICK AQUI PARA CARGAR EL DOCUMENTO
          </Typography>
          <input
            type="file"
            accept="application/pdf"
            style={{
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          ></input>
        </Grid>

        <Grid item md={6} lg={6}>
          <DeleteButton variant="outlined">BORRAR</DeleteButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
