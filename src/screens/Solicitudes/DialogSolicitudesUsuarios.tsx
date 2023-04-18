import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  DialogActions,
  Button
} from "@mui/material";
import { IComentarios } from "./ISoliciudes";
import { queriesSolicitud } from "./queriesSolicitudes";
import { useEffect } from "react";

export const DialogSolicitudesUsuarios = ({
  open,
  handleClose,
  comentarios,
}:{
  open: boolean;
  handleClose: Function;
  comentarios: Array<IComentarios>;
}) => {

  useEffect(() => {
    console.log('comentario', comentarios);
    
 
  }, [])
  
return (
 
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>{"Comentarios"}</DialogTitle>
      <DialogContent>
        <Grid>
          {comentarios?.map((dato, index) => (
            <List
              sx={{ width: "100%", maxWidth: 350, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={queriesSolicitud.boxContenidoBuscador}>
                      <Typography
                        sx={queriesSolicitud.typograhyCampoBuscador}
                        // color={index === indexSelect ? "#af8c55 " : "black"}
                      >
                        USUARIO:{" "}
                      </Typography>
                      <Typography
                        sx={queriesSolicitud.typograhyResultadoBuscador}
                        // color={index === indexSelect ? "#af8c55 " : "black"}
                      >
                        {dato.Comentario.toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              <Divider component="li" />
            </List>
          ))}
        </Grid>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  
);}
