import * as React from "react";
import {
  Grid,
  Typography,
  Dialog,
  Slide,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCortoPlazoStore } from "../../../store/main";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
  selected: number[];
  //Solicitud: string;
};

export function VerBorradorDocumento(props: Props, Solicitud: string){




    return(
        <Dialog
        open={props.openState}
        keepMounted
        TransitionComponent={Transition}
        onClose={() => {
          props.handler(false);
        }}
        >
            
            <Typography
          align="center"
          //position= "fixed"
          sx={queries.medium_text}
          mb={2}
        >
          Hola
        </Typography>

        </Dialog>
    )
}