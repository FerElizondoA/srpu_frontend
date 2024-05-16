import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
  Paper,
  Table,
  Checkbox,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControlLabel,
  TableBody,
  Autocomplete,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subDays } from "date-fns/esm";
import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IEncabezado,
  IUsuarios,
} from "../../../store/CreditoCortoPlazo/encabezado";
import { LateralMenu } from "../../LateralMenu/LateralMenu";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { IAnexoClausula } from "../../../store/Reestructura/reestructura";
import { kMaxLength } from "buffer";

interface Head {
  label: string;
}

interface headsCatalogo {
  id: string,
  label: string,
}

const heads: readonly Head[] = [
  {
    label: "Anexo ó Cláusula original",
  },
  {
    label: "Anexo ó Cláusula modificada",
  },
  {
    label: "Modificación",
  },
  {
    label: "Eliminar",
  },
];

const headsCatalogo: headsCatalogo[] = [
  { id: "1", label: "I" },
  { id: "2", label: "II" },
  { id: "3", label: "III" },
  { id: "4", label: "IV" },
  { id: "5", label: "V" },
  { id: "6", label: "VI" },
  { id: "7", label: "VII" },
  { id: "8", label: "VIII" },
  { id: "9", label: "IX" },
  { id: "10", label: "X" },
  { id: "11", label: "XI" },
  { id: "12", label: "XII" },
  { id: "13", label: "XIII" },
  { id: "14", label: "XIV" },
  { id: "15", label: "XV" },
  { id: "16", label: "XVI" },
  { id: "17", label: "XVII" },
  { id: "18", label: "XVIII" },
  { id: "19", label: "XIX" },
  { id: "20", label: "XX" },
  { id: "21", label: "XXI" },
  { id: "22", label: "XXII" },
  { id: "23", label: "XXIII" },
  { id: "24", label: "XXIV" },
  { id: "25", label: "XXV" },
  { id: "26", label: "XXVI" },
  { id: "27", label: "XXVII" },
  { id: "28", label: "XXVIII" },
  { id: "29", label: "XXIX" },
  { id: "30", label: "XXX" },
  { id: "31", label: "XXXI" },
  { id: "32", label: "XXXII" },
  { id: "33", label: "XXXIII" },
  { id: "34", label: "XXXIV" },
  { id: "35", label: "XXXV" },
  { id: "36", label: "XXXVI" },
  { id: "37", label: "XXXVII" },
  { id: "38", label: "XXXVIII" },
  { id: "39", label: "XXXIX" },
  { id: "40", label: "XL" },
  { id: "41", label: "XLI" },
  { id: "42", label: "XLII" },
  { id: "43", label: "XLIII" },
  { id: "44", label: "XLIV" },
  { id: "45", label: "XLV" },
  { id: "46", label: "XLVI" },
  { id: "47", label: "XLVII" },
  { id: "48", label: "XLVIII" },
  { id: "49", label: "XLIX" },
  { id: "50", label: "L" },
  { id: "51", label: "LI" },
  { id: "52", label: "LII" },
  { id: "53", label: "LIII" },
  { id: "54", label: "LIV" },
  { id: "55", label: "LV" },
  { id: "56", label: "LVI" },
  { id: "57", label: "LVII" },
  { id: "58", label: "LVIII" },
  { id: "59", label: "LIX" },
  { id: "60", label: "LX" },
  { id: "61", label: "LXI" },
  { id: "62", label: "LXII" },
  { id: "63", label: "LXIII" },
  { id: "64", label: "LXIV" },
  { id: "65", label: "LXV" },
  { id: "66", label: "LXVI" },
  { id: "67", label: "LXVII" },
  { id: "68", label: "LXVIII" },
  { id: "69", label: "LXIX" },
  { id: "70", label: "LXX" },
  { id: "71", label: "LXXI" },
  { id: "72", label: "LXXII" },
  { id: "73", label: "LXXIII" },
  { id: "74", label: "LXXIV" },
  { id: "75", label: "LXXV" },
  { id: "76", label: "LXXVI" },
  { id: "77", label: "LXXVII" },
  { id: "78", label: "LXXVIII" },
  { id: "79", label: "LXXIX" },
  { id: "80", label: "LXXX" },
  { id: "81", label: "LXXXI" },
  { id: "82", label: "LXXXII" },
  { id: "83", label: "LXXXIII" },
  { id: "84", label: "LXXXIV" },
  { id: "85", label: "LXXXV" },
  { id: "86", label: "LXXXVI" },
  { id: "87", label: "LXXXVII" },
  { id: "88", label: "LXXXVIII" },
  { id: "89", label: "LXXXIX" },
  { id: "90", label: "XC" },
  { id: "91", label: "XCI" },
  { id: "92", label: "XCII" },
  { id: "93", label: "XCIII" },
  { id: "94", label: "XCIV" },
  { id: "95", label: "XCV" },
  { id: "96", label: "XCVI" },
  { id: "97", label: "XCVII" },
  { id: "98", label: "XCVIII" },
  { id: "99", label: "XCIX" },
  { id: "100", label: "C" }
]

export function SolicitudReestructura() {

  const setAnexoClausulas: Function = useReestructuraStore(
    (state) => state.setAnexoClausulas
  );

  const AnexoClausulas: IAnexoClausula = useReestructuraStore(
    (state) => state.AnexoClausulas
  );

  const addTablaDeclaratorias: Function = useReestructuraStore(
    (state) => state.addTablaDeclaratorias
  );

  const tablaDeclaratorias: IAnexoClausula[] = useReestructuraStore(
    (state) => state.tablaDeclaratorias
  );

  const cleanAnexoClausulas: Function = useReestructuraStore(
    (state) => state.cleanAnexoClausulas
  );

  const removeDeclaratoria: Function = useReestructuraStore(
    (state) => state.removeDeclaratoria
  );

  return (
    <>
      <Grid container
        display={"flex"}
        justifyContent={"space-around"}

      >
        <Grid xs={10} sm={5} md={4} lg={3} xl={3}>
          <InputLabel
            sx={{
              ...queries.medium_text,
              display: "flex",
            }}
          >
            Anexo ó Clausula original
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={headsCatalogo}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.label}>
                  <Typography>{option.label}</Typography>
                </li>
              );
            }}
            value={{
              id: AnexoClausulas.ClausulaOriginal.Id || "",
              label: AnexoClausulas.ClausulaOriginal.Descripcion || "",
            }}
            onChange={(event, text) => {
              setAnexoClausulas({
                ...AnexoClausulas,
                ClausulaOriginal: {
                  id: text?.id || "",
                  Descripcion: text?.label || ""
                }
              })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label ||
              value.label === ""
            }
          />

        </Grid>

        <Grid xs={10} sm={5} md={4} lg={3} xl={3}>
          <InputLabel
            sx={{
              ...queries.medium_text,
              display: "flex",
            }}
          >
            Anexo ó Clausula modificada
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={headsCatalogo}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.label}>
                  <Typography>{option.label}</Typography>
                </li>
              );
            }}
            value={{
              id: AnexoClausulas.ClausulaModificada.Id || "",
              label: AnexoClausulas.ClausulaModificada.Descripcion || "",
            }}
            onChange={(event, text) => {
              setAnexoClausulas({
                ...AnexoClausulas,
                ClausulaModificada: {
                  id: text?.id || "",
                  Descripcion: text?.label || ""
                }
              })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label ||
              value.label === ""
            }
          />
        </Grid>
      </Grid>

      <Grid mt={4} container width={"100%"} display={"flex"} justifyContent={"center"}>
        <Grid xs={10} sm={10} md={2.5} lg={1.5} xl={1}>
          <InputLabel
            sx={{
              ...queries.medium_text, display: "flex",
              justifyContent: { xs: "start", sm: "start", md: "start", lg: "start" }
            }}
          >
            Modificación  ({AnexoClausulas.Modificacion ? AnexoClausulas.Modificacion.length : 0})
          </InputLabel>
        </Grid>

        <Grid xs={10} sm={11} md={7.5} lg={7.5} xl={8}>
          <TextField
            type="text"
            value={AnexoClausulas.Modificacion}
            inputProps={{ maxlength: 250 }}
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            error={AnexoClausulas.Modificacion.length === 250}
            helperText="El texto de modificación no debe pasar los 250 caracteres"
            onChange={(e) => {
              let inputValue = e.target.value;
              const expRegular = /^[a-zA-Z0-9@#$%^&*()_+\-=<>?/|{}[\]:";'.,!\s]+$/;
              if ((inputValue.length <= 250 && expRegular.test(inputValue)) || e.target.value === "") {
                setAnexoClausulas({
                  ...AnexoClausulas,
                  Modificacion: inputValue
                });
              }
            }}
          >

          </TextField>
        </Grid>
      </Grid>

      <Grid mt={2} mb={2} container width={"100%"} display={"flex"} justifyContent={"center"}>
        <Grid xs={10} sm={10} md={2} lg={2} xl={2}
          //mt={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        //height={"3rem"}
        >
          <Button sx={{
            ...queries.buttonContinuar,
            height: "2rem",
            display: "flex",
            alignItems: "center"
          }}
            onClick={() => {
              addTablaDeclaratorias(AnexoClausulas)
              cleanAnexoClausulas()
            }}
          >
            <Typography>
              Agregar
            </Typography>

          </Button>
        </Grid>

      </Grid>

      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        height={{
          xs: "25rem",
          sm: "25rem",
          md: "25rem",
          lg: "13rem",
          xl: "14rem",
        }}
      >
        <Paper sx={{ width: "90%", height: "100%" }}>
          <TableContainer
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
                height: ".5vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell>
                      <Typography sx={{ ...queries.medium_text }}>
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaDeclaratorias.map((head, index) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {head.ClausulaOriginal.Descripcion}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {head.ClausulaModificada.Descripcion}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {head.Modificacion}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Tooltip title="Eliminar">
                        <IconButton
                          type="button"
                          onClick={() => {
                            removeDeclaratoria(index);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>


    </>
  );
}
