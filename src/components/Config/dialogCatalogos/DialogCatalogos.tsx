import {
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { queries } from "../../../queries";
import { IModulos } from "../../../screens/Config/Catalogos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { creaDesc, delDesc, modDesc } from "../../APIS/Config/APISCatalogos";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

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
  const [tipoEnte, setTipoEnte] = useState({ Id: "", Descripcion: "" });

  useEffect(() => {
    setOcp(edit.OCP);
    setOlp(edit.OLP);
  }, [edit.OCP, edit.OLP]);

  const clean = () => {
    setElement("");
    setOcp(0);
    setOlp(0);
    setTipoEnte({ Id: "", Descripcion: "" });
  };

  const funcion = () => {
    if (edit.Crud === "edita") {
      modDesc(
        modulos[edit.Id].fnc,
        edit.IdDesc,
        element,
        ocp,
        olp,
        tipoEnte.Id
      );
      clean();
    } else if (edit.Crud === "crea") {
      creaDesc(modulos[edit.Id].fnc, element, ocp, olp, tipoEnte.Id);
      clean();
    } else {
      delDesc(modulos[edit.Id].fnc, edit.IdDesc);
    }

    setOpen(false);
  };

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  useEffect(() => {
    if (edit.Modulo === "Entes Público Obligados") {
      getTipoEntePublicoObligado();
    }
  }, [open]);

  return (
    <Grid container direction="column" alignItems={"center"}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          clean();
        }}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle sx={{ fontFamily: "MontserratMedium" }}>
          {edit.Crud === "crea"
            ? `Agregar nuevo elemento a la tabla: ${edit.Modulo}`
            : edit.Crud === "edita"
            ? `Modificar elemento`
            : `¿Desea eliminar el elemento de la tabla:
          ${edit.Modulo}?`}
        </DialogTitle>
        {edit.Crud === "crea" ? null : (
          <DialogContent
            sx={{
              display: "grid",
              justifyItems: "center",
              fontFamily: "MontserratMedium",
            }}
          >
            {edit.Descripcion}
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
                setElement(
                  /^[a-zA-Z0-9 ()$_,.-]*$/.test(v.target.value)
                    ? v.target.value
                    : element
                );
              }}
            />
            {edit.Modulo === "Reglas de Financiamiento" ||
            edit.Modulo === "Tipos de Documento" ? (
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

            {edit.Modulo === "Entes Público Obligados" ? (
              <Grid>
                <InputLabel sx={queries.medium_text}>
                  Tipo de ente público obligado
                </InputLabel>
                <Autocomplete
                  clearText="Borrar"
                  noOptionsText="Sin opciones"
                  closeText="Cerrar"
                  openText="Abrir"
                  fullWidth
                  options={catalogoTipoEntePublicoObligado}
                  getOptionLabel={(option) => option.Descripcion}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.Descripcion}>
                        <Typography>{option.Descripcion}</Typography>
                      </li>
                    );
                  }}
                  value={{
                    Id: tipoEnte.Id || "",
                    Descripcion: tipoEnte.Descripcion || "",
                  }}
                  onChange={(event, text) =>
                    setTipoEnte({
                      Id: text?.Id || "",
                      Descripcion: text?.Descripcion || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.Descripcion === value.Descripcion ||
                    value.Descripcion === ""
                  }
                />
              </Grid>
            ) : null}
          </DialogContent>
        ) : null}

        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setOpen(false);
              clean();
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
            sx={queries.buttonContinuar}
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
  Tipo: { Id: string; Descripcion: string };
  OCP: number;
  OLP: number;
  Modulo: string;
  TipoEntePublico: string;
}
