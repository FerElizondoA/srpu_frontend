import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { IComentarios } from "./DialogComentariosSolicitud";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";

interface DialogConfirmacionDesechamientoProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  comentariosOriginales: IComentarios[];
  comentariosNuevos: any;
  rowSolicitud: IInscripcion;
}

export function DialogConfirmacionDesechamiento({
  open,
  onClose,
  onConfirm,
  comentariosOriginales,
  comentariosNuevos,
  rowSolicitud,
}: DialogConfirmacionDesechamientoProps) {
  const comentariosNoSolventados = useCortoPlazoStore(
    (state) => state.comentariosNoSolventados
  );
  const setComentariosNoSolventados = useCortoPlazoStore(
    (state) => state.setComentariosNoSolventados
  );
  const removeComentarioNoSolventado = useCortoPlazoStore(
    (state) => state.removeComentarioNoSolventado
  );
  const updateObservacionNoSolventado = useCortoPlazoStore(
    (state) => state.updateObservacionNoSolventado
  );

  // Función para sanitizar texto y prevenir inyección de código
  const sanitizeText = (text: string): string => {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/&/g, '&amp;');
  };

  const getApartadosOriginales = () => {
    const apartados: {
      id: string;
      apartado: string;
      comentario: string;
      fecha: string;
      usuario: string;
    }[] = [];

    comentariosOriginales.forEach((comentario) => {
      try {
        const parsed = JSON.parse(comentario.Comentarios);
        Object.keys(parsed).forEach((apartado) => {
          apartados.push({
            id: `${comentario.Id}-${apartado}`,
            apartado: apartado,
            comentario: parsed[apartado],
            fecha: comentario.FechaCreacion,
            usuario: comentario.Nombre,
          });
        });
      } catch (e) {
        console.error("Error parseando comentario:", e);
      }
    });

    return apartados;
  };

  const getComentariosNuevosArray = () => {
    if (!comentariosNuevos || typeof comentariosNuevos !== "object") {
      return [];
    }

    return Object.keys(comentariosNuevos).map((apartado) => ({
      apartado: apartado,
      comentario: comentariosNuevos[apartado],
    }));
  };

  const getComentariosUnificados = () => {
    const originales = getApartadosOriginales().map((o) => ({
      ...o,
      esNuevo: false,
    }));
    const nuevos = getComentariosNuevosArray();

    const nuevosConId = nuevos.map((item, index) => ({
      id: `nuevo-${index}-${item.apartado}`,
      apartado: item.apartado,
      comentario: item.comentario,
      fecha: new Date().toISOString(),
      usuario: "Autorizador (nuevo)",
      esNuevo: true,
    }));

    return {
      unificados: [...originales, ...nuevosConId],
      originalesCount: originales.length,
      nuevosCount: nuevosConId.length,
    };
  };

  const { unificados: comentariosUnificados, originalesCount, nuevosCount } = getComentariosUnificados();
  const fechaPrevencion = rowSolicitud.FechaRequerimientos
    ? format(new Date(rowSolicitud.FechaRequerimientos), "PPP", { locale: es })
    : "No disponible";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle
        sx={{
          bgcolor: "#AF8C55",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          Confirmación de Desechamiento
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{ p: 2, bgcolor: "#f5f5f5", borderLeft: "4px solid #AF8C55", mt: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Fecha de Prevención:
              </Typography>
              <Typography variant="body1">{fechaPrevencion}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, color: "#AF8C55" }}>
              Resumen de Comentarios
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "300px",
                        bgcolor: "#AF8C55",
                        color: "white",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Apartado
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "450px",
                        bgcolor: "#AF8C55",
                        color: "white",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Comentario Original
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#AF8C55",
                        color: "white",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Estado
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#AF8C55",
                        color: "white",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Observación
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#AF8C55",
                        color: "white",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      Fecha Original
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comentariosUnificados.map((item, index) => {
                    const esNoSolventado = comentariosNoSolventados.some(
                      (c) => c.id === item.id
                    );
                    
                    const comentarioNoSolventado = comentariosNoSolventados.find(
                      (c) => c.id === item.id
                    );
                    const observacionActual = comentarioNoSolventado?.observacion || "";

                    const handleToggleSolventado = () => {
                      if (esNoSolventado) {
                        removeComentarioNoSolventado(item.id);
                      } else {
                        setComentariosNoSolventados({
                          id: item.id,
                          apartado: item.apartado,
                          comentario: item.comentario,
                          fechaOriginal: item.fecha,
                        });
                      }
                    };

                    const handleObservacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const valor = e.target.value;
                      const valorSanitizado = sanitizeText(valor).slice(0, 500);
                      updateObservacionNoSolventado(item.id, valorSanitizado);
                    };

                    return (
                      <TableRow
                        key={index}
                        sx={{
                          bgcolor: esNoSolventado 
                            ? "#ffebee" 
                            : item.esNuevo 
                              ? "#e3f2fd" 
                              : "inherit",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: esNoSolventado ? "#ffcdd2" : "#f5f5f5",
                          },
                        }}
                        onClick={handleToggleSolventado}
                      >
                        <TableCell>
                          {item.apartado}
                          {item.esNuevo && (
                            <Typography variant="caption" sx={{ ml: 1, color: "#1976d2", fontWeight: 600 }}>
                              (NUEVO)
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{item.comentario}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={esNoSolventado}
                            onChange={handleToggleSolventado}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                              color: "#d32f2f",
                              "&.Mui-checked": {
                                color: "#d32f2f",
                              },
                            }}
                          />
                          {esNoSolventado ? (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#d32f2f",
                                fontWeight: 600,
                              }}
                            >
                              NO SOLVENTADO
                            </Typography>
                          ) : (
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#388e3c",
                                fontWeight: 600,
                              }}
                            >
                              Solventado
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            multiline
                            rows={4}
                            disabled={!esNoSolventado}
                            value={observacionActual}
                            onChange={handleObservacionChange}
                            onClick={(e) => e.stopPropagation()}
                            placeholder={
                              esNoSolventado
                                ? "Escriba la observación..."
                                : "Seleccione 'No solventado' para agregar observación"
                            }
                            helperText={`${observacionActual.length}/500`}
                            inputProps={{
                              maxLength: 500,
                            }}
                            sx={{
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                fontSize: "0.85rem",
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {format(new Date(item.fecha), "dd/MM/yyyy")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{ p: 2, bgcolor: "#fff3e0", borderLeft: "4px solid #f57c00" }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#f57c00" }}>
                Resumen Final
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">
                <strong>Total de comentarios:</strong>{" "}
                {comentariosUnificados.length}
              </Typography>
              <Typography variant="body2">
                <strong>Comentarios originales:</strong>{" "}
                {originalesCount}
              </Typography>
              <Typography variant="body2">
                <strong>Comentarios nuevos:</strong>{" "}
                {nuevosCount}
              </Typography>
              <Typography variant="body2">
                <strong>Comentarios no solventados:</strong>{" "}
                {comentariosNoSolventados.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{ 
                p: 2, 
                bgcolor: "#ffebee", 
                border: "1px solid #d32f2f",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#d32f2f", 
                  fontWeight: 600,
                  fontSize: "0.95rem"
                }}
              >
                ⚠️ Esta acción no se puede deshacer. La solicitud será desechada permanentemente.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "#f5f5f5", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: "#AF8C55",
            "&:hover": {
              bgcolor: "#8b6f47",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#15212f",
            "&:hover": {
              bgcolor: "#0d1520",
            },
          }}
        >
          Confirmar Desechamiento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
