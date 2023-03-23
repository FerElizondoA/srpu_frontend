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
  Fab,
  Typography,
} from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import { queries } from "../../../queries";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
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

  const nombreServidorPublico: string = useCortoPlazoStore(state => state.nombreServidorPublico);
  const changeServidorPublico: Function = useCortoPlazoStore(state => state.changeServidorPublico);
  const cargo: string = useCortoPlazoStore(state => state.cargo);
  const changeCargo: Function = useCortoPlazoStore(state => state.changeCargo);
  const solicitanteAutorizado: string = useCortoPlazoStore(state => state.solicitanteAutorizado);
  const changeSolicitanteAutorizado: Function = useCortoPlazoStore(state => state.changeSolicitanteAutorizado);
  const documentoAutorizado: string = useCortoPlazoStore(state => state.documentoAutorizado);
  const changeDocumentoAutorizado: Function = useCortoPlazoStore(state => state.changeDocumentoAutorizado);
  const identificacion: string = useCortoPlazoStore(state => state.identificacion);
  const changeIdentificacion: Function = useCortoPlazoStore(state => state.changeIdentificacion);

  const fetchDocumento: Function = useCortoPlazoStore(state => state.fetchDocumento);

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
            value={nombreServidorPublico}
            onChange={(text) => changeServidorPublico(text.target.value)}
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
            value={cargo}
            onChange={(text) => changeCargo(text.target.value)}
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
            value={solicitanteAutorizado}
            onChange={(text) => changeSolicitanteAutorizado(text.target.value)}
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
            value={documentoAutorizado}
            onChange={(text) => changeDocumentoAutorizado(text.target.value)}
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
            value={identificacion}
            onChange={(text) => changeIdentificacion(text.target.value)}
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
        <Grid
          item
          position="fixed"
          sx={{ top: "auto", bottom: 50, left: window.innerWidth - 300 }}
        >
          <Fab variant="extended" color="success" onClick={fetchDocumento()}>
            <CheckIcon sx={{ mr: 1 }} />
            <Typography sx={queries.medium_text}>FINALIZAR</Typography>
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}
