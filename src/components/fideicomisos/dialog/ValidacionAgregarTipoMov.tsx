/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { queries } from "../../../queries";
import ErrorIcon from "@mui/icons-material/Error";

export function ValidacionAgregarTipoMov({
  openValidacionAgregarTipoMov,
  setOpenValidacionAgregarTipoMov,
  TipoFuentePago,
}: {
  openValidacionAgregarTipoMov: boolean;
  setOpenValidacionAgregarTipoMov: Function;
  TipoFuentePago: string;
}) {
  return (
    <Dialog open={openValidacionAgregarTipoMov} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <ErrorIcon
            sx={{ color: "#AF8C55", height: "5rem", fontSize: "5rem" }}
          />
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            ...queries.medium_text,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Favor de llenar el campo de &nbsp; <strong> Numero de {TipoFuentePago}</strong> &nbsp; antes de agregar un
          tipo de movimiento.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{ ...queries.buttonContinuar }}
          onClick={() => setOpenValidacionAgregarTipoMov(false)}
        >
          <Typography>Aceptar</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
