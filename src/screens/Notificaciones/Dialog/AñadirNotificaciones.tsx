import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
  DialogActions,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  TextField,
} from "@mui/material";

export const AñadirNotificaciones = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: Function;
}) => {
  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={() => handleClose()}>
      <DialogContent>
       
          <Grid xs={6} sm={6} md={6} lg={6} xl={4} >
          <TextField
            fullWidth
            //InputProps={{ readOnly: true }}
            id="outlined-basic"
            label="Usuario"
            variant="standard"

          />
          </Grid>

          <Grid xs={6} sm={6} md={6} lg={6} xl={4} >
          <TextField
            fullWidth
            //InputProps={{ readOnly: true }}
            id="outlined-basic"
            label="Titulo"
            variant="standard"

          />
          </Grid>
          
        
        <Grid height={100} display={"flex"} justifyContent={"center"} alignItems={"center"}>
             <TextField
            fullWidth
            //InputProps={{ readOnly: true }}
            id="outlined-basic"
            label="Mensaje"
            variant="outlined"

          />
          </Grid>
      </DialogContent>
    </Dialog>
  );
};
