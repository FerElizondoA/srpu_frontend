import React, { useState } from "react";
import {
  AppBar,
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputLabel,
  Slide,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { IAnexoClausula } from "../../../store/Reestructura/reestructura";
import { queries } from "../../../queries";
import { headsCatalogo } from "../Panels/Reestructura";

export function EditarSolicitudDeRestructura({
  openState,
  handleClose,
  Index,
}: {
  openState: boolean;
  handleClose: Function;
  Index: number;
}) {
  const setAnexoClausulas: Function = useReestructuraStore(
    (state) => state.setAnexoClausulas
  );

  const AnexoClausulas: IAnexoClausula = useReestructuraStore(
    (state) => state.AnexoClausulas
  );

  const addTablaDeclaratorias: Function = useReestructuraStore(
    (state) => state.addTablaDeclaratorias
  );

  const EditTablaDeclaratorias: Function = useReestructuraStore(
    (state) => state.EditTablaDeclaratorias
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

  const getBorderColor = (): string => {
    const length = AnexoClausulas.Modificacion.length;
    if (length === 600) {
      return "orange";
    } else if (length === 650) {
      return "red";
    } else if (length > 650) {
      return "#15212f";
    }
    return "";
  };

  const getHelperTextColor = (): string => {
    return AnexoClausulas.Modificacion.length === 600 ? "orange" : "";
  };

  const [openEditarCondicion, setEditarCondicion] = useState(false);

  const handleCloseEnviar = () => {
    setEditarCondicion(false);
  };

  const updateClausulasModificatorias: Function = useReestructuraStore(
    (state) => state.updateClausulasModificatorias
  );

 

  return (
    <Dialog open={openState} onClose={() => handleClose()}>
      <DialogContent
      //sx={{ display: "flex", flexDirection: "row" }}
      >
        <Grid container>
          <Grid container item display={"flex"} justifyContent={"space-evenly"}>
            <Grid item xs={12} sm={5} md={4} lg={3} xl={12}>
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
                      Descripcion: text?.label || "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label || value.label === ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={12}>
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
                      Descripcion: text?.label || "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={queries.medium_text}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label || value.label === ""
                }
              />
            </Grid>

            <Grid
              mt={4}
              container
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Grid xs={10} sm={10} md={2.5} lg={1.5} xl={12}>
                <InputLabel
                  sx={{
                    ...queries.medium_text,
                    display: "flex",
                    justifyContent: {
                      xs: "start",
                      sm: "start",
                      md: "start",
                      lg: "start",
                    },
                  }}
                >
                  Modificación
                </InputLabel>
              </Grid>

              <Grid xs={10} sm={11} md={7.5} lg={7.5} xl={12}>
                <TextField
                  type="text"
                  value={AnexoClausulas.Modificacion}
                  inputProps={{ maxlength: 650 }}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                  error={AnexoClausulas.Modificacion.length === 650}
                  FormHelperTextProps={{
                    sx: {
                      color: getHelperTextColor(),
                    },
                  }}
                  helperText={`El texto de modificación no debe pasar los 650 caracteres. Caracteres Usados: ${
                    AnexoClausulas.Modificacion
                      ? AnexoClausulas.Modificacion.length
                      : 0
                  }`}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: getBorderColor(),
                      },
                      "&:hover fieldset": {
                        borderColor: getBorderColor(),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: getBorderColor(),
                      },
                    },
                  }}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    const expRegular =
                      /^[a-zA-Z0-9@#$%^&*()_+\-=<>?/|{}[\]:";'.,!\s]+$/;
                    if (
                      (inputValue.length <= 650 &&
                        expRegular.test(inputValue)) ||
                      e.target.value === ""
                    ) {
                      setAnexoClausulas({
                        ...AnexoClausulas,
                        Modificacion: inputValue,
                      });
                    }
                  }}
                ></TextField>
              </Grid>
            </Grid>

            <Grid
              mt={2}
              mb={2}
              container
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Grid
                xs={10}
                sm={10}
                md={2}
                lg={2}
                xl={2}
                //mt={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                //height={"3rem"}
              >
                <Button
                  sx={{
                    ...queries.buttonContinuar,
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    updateClausulasModificatorias(AnexoClausulas, Index);
                    //cleanAnexoClausulas();
                    handleClose();

                  }}
                >
                  <Typography>Modificar</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
