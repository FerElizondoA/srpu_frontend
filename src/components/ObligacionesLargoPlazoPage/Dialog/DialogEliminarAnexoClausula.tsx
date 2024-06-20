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

export function DialogEliminarAnexoClausula({
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
                ¿Deseas eliminat el Anexo ó Clausula original?
              </InputLabel>
            </Grid>

            <Grid
              mt={4}
             // mb={4}
              container
              xs={12}
              sm={12}
              md={12}
              lg={10}
              xl={10}
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
        
            >
              <Grid
                xs={10}
                sm={10}
                md={6}
                lg={6}
                xl={6}
                
                //mt={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                //height={"3rem"}
              >
                <Button
                  sx={{
                    ...queries.buttonCancelar,
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    //updateClausulasModificatorias(AnexoClausulas, Index);
                    //cleanAnexoClausulas();}
                    removeDeclaratoria(Index);
                    handleClose();
                  }}
                >
                  <Typography>Eliminar</Typography>
                </Button>
              </Grid>

              <Grid
                xs={10}
                sm={10}
                md={6}
                lg={6}
                xl={6}
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
                    //updateClausulasModificatorias(AnexoClausulas, Index);
                    //cleanAnexoClausulas();}
                    // removeDeclaratoria(Index)
                    handleClose();
                  }}
                >
                  <Typography>Cancelar</Typography>
                </Button>
              </Grid>


            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
