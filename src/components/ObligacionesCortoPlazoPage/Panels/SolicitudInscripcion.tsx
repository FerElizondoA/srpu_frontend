import {
  Grid,
  InputLabel,
  TextField,
  Divider,
  Checkbox,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
} from "@mui/material";
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

// dummy data

interface Data {
  isSelected: boolean;
  rule: String;
  
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
    id: "rule",
    isNumeric: false,
    label: "Regla",
  },
 
];

function createDummyData(rule: string) {
  return {
    rule
  };
}

const rows = [createDummyData("Cuerpo de un escrito, prescindiendo de las notas, los comentarios, las portadas, las ilustraciones, etc."), createDummyData("Cuerpo de un escrito, prescindiendo de las notas, los comentarios, las portadas, las ilustraciones, etc.")];

export function SolicitudInscripcion() {
  return (
    <Grid item container>
      <Grid
        item
        container
        flexDirection="row"
        mt={{ sm: 0, md: 0, lg: 0 }}
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ xs: 2, md: 10, lg: 10 }}
      >
        <Grid item md={4.5} lg={4.5}>
          <InputLabel sx={queries.medium_text}>
            Nombre del servidor publico a quien va dirigido
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
        <Grid item md={4.5} lg={4.5}>
          <InputLabel sx={queries.medium_text}>Cargo</InputLabel>
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

      <Grid
        item
        container
        flexDirection="row"
        mt={{ sm: 2, md: 0, lg: 0 }}
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ md: 10, lg: 10 }}
      >
        <Grid item md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Solicitante autorizado
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

        <Grid item md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>
            Documento de autorización
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

        <Grid item md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Identificación</InputLabel>
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

        <Grid item md={9} lg={9} xl={9}>
          <Divider sx={queries.medium_text}>
            Declaratorias aplicables al financiamiento u obligación.
          </Divider>
        </Grid>
      </Grid>

      <Grid
        item
        container
        //flexDirection="row"
        mt={{ sm: 2, md: 0, lg: 0 }}
        ml={{ sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={{ md: 10, lg: 10 }}
      >
        <Grid item md={9} lg={9} xl={9}>
          <Grid container direction="column">
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
                        <StyledTableCell component="th" scope="row">
                          {row.rule}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
}
