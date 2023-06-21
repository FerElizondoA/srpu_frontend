import Button from "@mui/material/Button";
import {
  Grid,
  Typography,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { IModulos } from "../../../screens/Config/Catalogos"
import { creaDesc, delDesc, modDesc } from "../../APIS/Config/APISCatalogos";
import { queries } from "../../../queries";


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
  const [element, setElement] = useState(edit.Descripcion);

  const [ocp, setOcp] = useState(0);
  const [olp, setOlp] = useState(0);

  useEffect(() => {
    setOcp(edit.OCP);
    setOlp(edit.OLP);
  }, [edit.OCP, edit.OLP]);

  const funcion = () => {
    if (edit.Crud === "edita") {
      modDesc(modulos[edit.Id].fnc, edit.IdDesc, element, ocp, olp);
      setElement("");
      setOcp(0);
      setOlp(0);
    } else if (edit.Crud === "crea") {
      creaDesc(modulos[edit.Id].fnc, element, ocp, olp);
      setElement("");
      setOcp(0);
      setOlp(0);
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
        maxWidth={"md"}
      >
        <DialogTitle sx={{ fontFamily: "MontserratMedium" }}>
          {edit.Crud === "crea"
            ? `Agregar nuevo elemento a la tabla: ${edit.Modulo}`
            : edit.Crud === "edita"
            ? `Modificar descripción`
            : `¿Desea eliminar el elemento de la tabla
          '${edit.Modulo}'?`}
        </DialogTitle>
        {edit.Crud === "crea" ? (
          ``
        ) : (
          <DialogContent
            sx={{
              display: "grid",
              justifyItems: "center",
              fontFamily: "MontserratMedium",
            }}
          >
            Elemento: {edit.Descripcion}
          </DialogContent>
        )}
        {edit.Crud === "crea" || edit.Crud === "edita" ? (
          <DialogContent sx={{ display: "grid", justifyItems: "center" }}>
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
                    fontFamily: "MontserratMedium",
                  }}
                >
                  Nuevo elemento
                </Typography>
              }
              sx={{ m: 2, width: "100%" }}
              multiline
              inputProps={{
                sx: {
                  fontSize: {
                    xs: "70%",
                    sm: "80%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratMedium",
                },
              }}
              value={element || ""}
              onChange={(v) => {
                setElement(v.target.value);
              }}
            />
            {edit.Modulo === "Reglas de financiamiento" ||
            edit.Modulo === "Tipos de documento" ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={ocp === 1}
                      onChange={(e) => {
                        e.target.checked ? setOcp(1) : setOcp(0);
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: "Montserrat" }}>
                      Obligatorio en inscripción a corto plazo
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={olp === 1}
                      onChange={(e) => {
                        e.target.checked ? setOlp(1) : setOlp(0);
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: "Montserrat" }}>
                      Obligatorio en inscripción a largo plazo
                    </Typography>
                  }
                />
              </FormGroup>
            ) : null}
          </DialogContent>
        ) : null}

        <DialogActions>
          <Button
           
            color="error"
            onClick={() => {
              setOpen(false);
              setElement("");
            }}
            sx={queries.buttonCancelar}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              //   modifDesc();
              funcion();
            }}
            sx= {queries.buttonContinuar}
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
  OCP: number;
  OLP: number;
  Modulo: string;
}
