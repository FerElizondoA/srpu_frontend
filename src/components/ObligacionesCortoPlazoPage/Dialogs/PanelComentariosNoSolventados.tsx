import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IComentarios } from "./DialogComentariosSolicitud";

interface PanelComentariosNoSolventadosProps {
  open: boolean;
  onClose: () => void;
  comentariosOriginales: IComentarios[];
}

export function PanelComentariosNoSolventados({
  open,
  onClose,
  comentariosOriginales,
}: PanelComentariosNoSolventadosProps) {
  const comentariosNoSolventados = useCortoPlazoStore(
    (state) => state.comentariosNoSolventados
  );
  const setComentariosNoSolventados = useCortoPlazoStore(
    (state) => state.setComentariosNoSolventados
  );
  const removeComentarioNoSolventado = useCortoPlazoStore(
    (state) => state.removeComentarioNoSolventado
  );

  const handleCheckboxChange = (
    comentario: IComentarios,
    apartado: string,
    textoComentario: string
  ) => {
    const existe = comentariosNoSolventados.some((c) => c.id === comentario.Id);

    if (existe) {
      removeComentarioNoSolventado(comentario.Id);
    } else {
      setComentariosNoSolventados({
        id: comentario.Id,
        apartado: apartado,
        comentario: textoComentario,
        fechaOriginal: comentario.FechaCreacion,
      });
    }
  };

  const isMarcadoComoNoSolventado = (id: string) => {
    return comentariosNoSolventados.some((c) => c.id === id);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          margin: 0,
          borderRadius: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#AF8C55",
          color: "white",
        }}
      >
        <Typography variant="h6">
          Comentarios No Solventados ({comentariosNoSolventados.length})
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {comentariosOriginales.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            No hay comentarios originales para mostrar
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {comentariosOriginales.map((comentario, index) => {
              const parsedComentarios = JSON.parse(comentario.Comentarios);
              const apartados = Object.keys(parsedComentarios);

              return apartados.map((apartado, idx) => {
                const textoComentario = parsedComentarios[apartado];
                const marcado = isMarcadoComoNoSolventado(comentario.Id);

                return (
                  <Grid item xs={12} key={`${comentario.Id}-${idx}`}>
                    <Box
                      sx={{
                        p: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        bgcolor: marcado ? "#fff3e0" : "#fafafa",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={marcado}
                            onChange={() =>
                              handleCheckboxChange(
                                comentario,
                                apartado,
                                textoComentario
                              )
                            }
                            sx={{
                              color: "#AF8C55",
                              "&.Mui-checked": {
                                color: "#AF8C55",
                              },
                            }}
                          />
                        }
                        label={
                          <Box sx={{ width: "100%" }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: "#AF8C55",
                                mb: 0.5,
                              }}
                            >
                              {apartado}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 1,
                                whiteSpace: "pre-line",
                              }}
                            >
                              {textoComentario}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              Por: {comentario.Nombre} •{" "}
                              {new Date(
                                comentario.FechaCreacion
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                        sx={{
                          width: "100%",
                          alignItems: "flex-start",
                          m: 0,
                        }}
                      />
                    </Box>
                  </Grid>
                );
              });
            })}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
