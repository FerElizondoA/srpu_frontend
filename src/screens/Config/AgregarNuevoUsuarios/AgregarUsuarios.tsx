import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { queries } from "../../../queries";

export const IFrame = ({
  baseURL,
  source,
  open,
  setOpen,
}: {
  source: string;
  baseURL: string;
  open: number;
  setOpen: Function;
}) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open !== 0} fullScreen>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Tooltip title="Volver">
            <IconButton
              edge="start"
              onClick={() => {
                setOpen(0);
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                {open === 1 ? "Agregar" : "Editar"} Usuario
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Grid width={"100%"} height={"85vh"}>
          <object
            style={{ width: "100%", height: "100%" }}
            data={String(baseURL) + String(source)}
            type="text/html"
            aria-label="Agregar Usuario"
          ></object>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default IFrame;
