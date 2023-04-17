import * as React from "react";
import {
  Grid,
  Typography,
  Dialog,
  Slide,
  Button,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
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
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
////////////////////////////////////////////////////////////////////////

interface IData {
  Id: string;
  Comentario: string;
  Fecha: Date;
}

interface Head {
  id: keyof IData;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "Id",
    isNumeric: true,
    label: "Id's",
  },
  {
    id: "Comentario",
    isNumeric: true,
    label: "Comentarios",
  },
  {
    id: "Fecha",
    isNumeric: true,
    label: "Fechas",
  },
];

////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
export function VerComentariosSolicitud(props: Props, Solicitud: string) {

    const comentarios: string = useCortoPlazoStore(state => state.comentarios);
  return (
    <Dialog
      open={props.openState}
      keepMounted
      TransitionComponent={Transition}
      onClose={() => {
        props.handler(false);
      }}
    >
      <Grid item>
        <Table>
          <TableHead>
            {heads.map((head) => (
              <StyledTableCell key={head.id}>
                <TableSortLabel>{head.label} </TableSortLabel>
              </StyledTableCell>
            ))}
          </TableHead>
          <TableBody>
                {/* {comentarios.localeCompare((row, index) =>(
                    <StyledTableRow>

                    </StyledTableRow>
                ))} */}
            
          </TableBody>
        </Table>
      </Grid>
    </Dialog>
  );
}
