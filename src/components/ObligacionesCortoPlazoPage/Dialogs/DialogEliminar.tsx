import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, Dialog, Slide, Button } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/main";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getSolicitudes } from "../../APIS/cortoplazo/APISInformacionGeneral";
// import { IData } from "../../LateralMenu/LateralMenu";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export function DialogEliminar({
    handler,
    openState,
    texto,
    id,
    
  }: {
    handler: Function;
    openState: boolean;
    texto: string;
    id: string
    
    
  }) {
  
    const borrarSolicitud: Function = useCortoPlazoStore(
        (state) => state.borrarSolicitud
      );

    
      

  return (
    <Dialog
      open={openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        handler(false);
      }}
    >
      <DialogTitle>
        <Typography align="center" sx={queries.medium_text} mb={2}>
           Confirmacion de Borrado 
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{textalign: "center"}}>Deseas Eliminar la {texto}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="text"
          onClick={() => handler(false)}
          sx={queries.buttonCancelar}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            console.log(id);
            handler(false);
           borrarSolicitud(id)
          
          }} 
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
