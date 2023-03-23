import Button from "@mui/material/Button";
import { Grid, Typography, TextField } from "@mui/material";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IModulos } from "./Catalogos";
import { creaDesc, delDesc, modDesc } from "./APIS/APISCatalogos";

export function DialogCatalogos({
  modulos,
  edit,
  open,
  setOpen,
}: {
  modulos: Array<IModulos>;
  edit: IDialog;
  open: boolean;
  setOpen: Function;
}) {
  const [element, setElement] = useState("");

  const funcion = () => {
    if (edit.Crud === "edita") {
      modDesc(modulos[edit.Id].fnc, edit.IdDesc, element);
      setElement('')
    } else if (edit.Crud === "crea") {
      creaDesc(modulos[edit.Id].fnc, element);
      setElement('')
    } else {
      delDesc(modulos[edit.Id].fnc, edit.IdDesc);
    }

    setOpen(false);
  };


  return (
    <Grid container direction="column" alignItems={"center"}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ fontFamily: "MontserratMedium" }}>
          {edit.Crud === "crea"
            ? `Agregar nuevo elemento a la tabla: ${edit.Modulo}`
            : edit.Crud === "edita"
            ? `Modificar descripción: ${edit.Descripcion}`
            : `¿Desea eliminar el elemento '${edit.Descripcion}' de la tabla '
          ${edit.Modulo}'?`}
        </DialogTitle>
        {edit.Crud === "crea" || edit.Crud === "edita" ? (
          <DialogContent sx={{ display: "grid" }}>
            <TextField
              size="small"
              label={
                <Typography
                  sx={{
                    fontSize: {
                      xs: "60%",
                      sm: "70%",
                      md: "80%",
                      lg: "80%",
                      xl: "100%",
                    },
                    fontFamily: "Montserrat",
                  }}
                >
                  Nuevo elemento
                </Typography>
              }
              sx={{ m: 2 }}
              inputProps={{
                sx: {
                  fontSize: {
                    xs: "70%",
                    sm: "80%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                },
              }}
              value={element || ""}
              onChange={(v) => {
                setElement(v.target.value);
              }}
            ></TextField>
          </DialogContent>
        ) : null}

        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setOpen(false);
              setElement("");
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              //   modifDesc();
              funcion();
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export interface IDialog {
  Crud: string;
  Id: number;
  IdDesc: string;
  Descripcion: string;
  Modulo: string;
}
