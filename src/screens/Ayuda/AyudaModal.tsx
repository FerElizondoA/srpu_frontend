import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Autocomplete,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { buttonTheme } from "../../components/mandatos/dialog/AgregarMandatos";
import { queries } from "../../queries";
import { createAyuda, getMenus, saveFile } from "./ServicesAyuda";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface ILista {
  Id: string;
  Label: string;
}

export interface Tabla {
  Opcion: string;
  IdMenu: string;
}

export interface MenuItem {
  Id: string;
  Label: string;
  Path: string;
}

export interface IFile {
  archivo: File;
  nombreArchivo: string;
}

export const AyudasModal = ({
  TabValue,
  handleClose,
  openState,
}: {
  TabValue: string;
  handleClose: Function;
  openState: boolean;
}) => {
  const [menu, setMenu] = useState<MenuItem>({ Id: "", Label: "", Path: "" });
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const [newVideo, setNewVideo] = useState<File>(new File([], ""));
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const [videoPreview, setVideoPreview] = useState("");

  function enCambioFile(event: any) {
    if (
      event?.target?.files[0] &&
      event.target.files[0].type.split("/")[0] === "video"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setNewVideo(file);
      setVideoPreview(URL.createObjectURL(event.target.files[0]));
    } else if (
      event?.target?.files[0] &&
      event.target.files[0].type === "application/pdf"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setVideoPreview(URL.createObjectURL(event.target.files[0]));

      setNewVideo(file);
    } else {
      Swal.fire({
        confirmButtonColor: "#15212f",
        iconColor: "#AF8C55",
        icon: "error",
        title: "Error al cargar",
      });
    }
  }

  useEffect(() => {
    getMenus(setMenus);
  }, []);

  return (
    <Dialog fullScreen open={openState} TransitionComponent={Transition}>
      {/* <ModalForm title="Administración de Ayudas" handleClose={handleClose}>   */}
      {/* <SliderProgress open={slideropen} texto={"Cargando..."}></SliderProgress> */}
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Tooltip title="Volver">
            <IconButton
              edge="start"
              onClick={() => {
                handleClose();
                //reset();
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                {TabValue === "Guías"
                  ? "Agregar Guía"
                  : TabValue === "Videos"
                  ? "Agregar Video"
                  : TabValue === "Preguntas"
                  ? "Agregar Pregunta"
                  : null}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            {TabValue === "Videos" && nombreArchivo !== "" ? (
              <ThemeProvider theme={buttonTheme}>
                <Button
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (menu.Id !== "") {
                      saveFile(
                        TabValue,
                        { nombreArchivo: nombreArchivo, archivo: newVideo },
                        menu.Id,
                        pregunta,
                        respuesta,
                        handleClose
                      );
                    } else {
                      Swal.fire({
                        confirmButtonColor: "#15212f",
                        iconColor: "#AF8C55",
                        icon: "error",
                        title: "Seleccione un menú.",
                      });
                    }
                  }}
                >
                  Guardar
                </Button>
              </ThemeProvider>
            ) : (
              ""
            )}

            {TabValue === "Guías" && nombreArchivo !== "" ? (
              <ThemeProvider theme={buttonTheme}>
                <Button
                  sx={{ ...queries.buttonContinuar }}
                  onClick={() => {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        saveFile(
                          TabValue,
                          { nombreArchivo: nombreArchivo, archivo: newVideo },
                          menu.Id,
                          pregunta,
                          respuesta,
                          handleClose
                        );
                      } else {
                        Swal.fire({
                          confirmButtonColor: "#15212f",
                          iconColor: "#AF8C55",
                          icon: "error",
                          title: "Escriba título de guía.",
                        });
                      }
                    } else {
                      Swal.fire({
                        confirmButtonColor: "#15212f",
                        iconColor: "#AF8C55",
                        icon: "error",
                        title: "Seleccione un menú.",
                      });
                    }
                  }}
                >
                  Guardar
                </Button>
              </ThemeProvider>
            ) : (
              ""
            )}
            {TabValue === "Preguntas" ? (
              <ThemeProvider theme={buttonTheme}>
                <Button
                  //className="aceptar"
                  sx={{ ...queries.buttonContinuar }}
                  onClick={() => {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        if (respuesta !== "") {
                          let datos = {
                            IdMenu: menu.Id,
                            Pregunta: pregunta,
                            Texto: respuesta,
                            RutaGuia: "",
                            RutaVideo: "",
                            NombreArchivo: "",
                            NombreArchivoServidor: "",
                            IdUsuario: localStorage.getItem("IdUsuario") || "",
                          };
                          createAyuda(datos, handleClose);
                        } else {
                          Swal.fire({
                            confirmButtonColor: "#15212f",
                            iconColor: "#AF8C55",
                            icon: "error",
                            title: "Escriba una respuesta.",
                          });
                        }
                      } else {
                        Swal.fire({
                          confirmButtonColor: "#15212f",
                          iconColor: "#AF8C55",
                          icon: "error",
                          title: "Escriba una pregunta.",
                        });
                      }
                    } else {
                      Swal.fire({
                        confirmButtonColor: "#15212f",
                        iconColor: "#AF8C55",
                        icon: "error",
                        title: "Seleccione un menú.",
                      });
                    }
                  }}
                >
                  Guardar
                </Button>
              </ThemeProvider>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          ml={2}
          mt={2}
          width={"60%"}
          sx={{
            width: "52%",
            "@media (min-width: 480px)": {
              width: "50%",
            },

            "@media (min-width: 768px)": {
              width: "60%",
            },

            "@media (min-width: 1140px)": {
              width: "60%",
            },

            "@media (min-width: 1400px)": {
              width: "60%",
            },

            "@media (min-width: 1870px)": {
              width: "60%",
            },
          }}
        >
          <Typography variant="h6" sx={queries.medium_text}>
            Menú
          </Typography>
          <Autocomplete
            noOptionsText="No se encontraron opciones"
            clearText="Borrar"
            closeText="Cerrar"
            openText="Abrir"
            options={menus}
            getOptionLabel={(menu) => menu.Label || "Seleccione Menú"}
            value={menu}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setMenu(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField key={params.id} {...params} variant="outlined" />
            )}
          />
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="start"
          paddingTop={3}
          sx={{
            width: "40%",
            "@media (min-width: 480px)": {
              width: "40%",
            },

            "@media (min-width: 768px)": {
              width: "30%",
            },

            "@media (min-width: 1140px)": {
              width: "22%",
            },

            "@media (min-width: 1400px)": {
              width: "22%",
            },

            "@media (min-width: 1870px)": {
              width: "22%",
            },
          }}
        >
          {TabValue !== "Preguntas" ? (
            <Button
              variant="contained"
              className="aceptar"
              //hidden
              //disabled={modo == "Editar Nombre Video" || !TabValue}
              component="label"
            >
              <Typography
                sx={{ ...queries.medium_text, textTransform: "none" }}
              >
                {TabValue === "Guías"
                  ? "Seleccionar Guía"
                  : TabValue === "Videos"
                  ? "Seleccionar Video"
                  : TabValue === "Preguntas"
                  ? "Seleccionar Pregunta"
                  : null}
              </Typography>

              <input
                hidden
                accept={TabValue === "Videos" ? "video/*" : "application/pdf"}
                onChange={(v) => {
                  enCambioFile(v);
                }}
                type="file"
              />
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      {TabValue === "Videos" || TabValue === "Guías" ? (
        <>
          <Grid container ml={2} mt={2} direction={"column"} width={"89%"}>
            <Grid>
              <Typography sx={queries.medium_text}>
                Nombre del archivo:{" "}
              </Typography>
            </Grid>
            <Grid item width={"100%"}>
              <TextField
                disabled
                margin="dense"
                id="nombreEvento"
                value={nombreArchivo}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setNombreArchivo(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            </Grid>
          </Grid>
          {TabValue === "Guías" ? (
            <Grid container ml={2} width={"89%"}>
              <Grid>
                <Typography variant="h6" sx={queries.medium_text}>
                  Pregunta / Título de guía:{" "}
                </Typography>
              </Grid>
              <Grid item width={"100%"}>
                <TextField
                  margin="dense"
                  id="nombreEvento"
                  value={pregunta}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 300 }}
                  onChange={(v) => setPregunta(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      ) : null}

      {TabValue === "Preguntas" ? (
        <>
          <Grid container direction={"column"} mt={2}>
            <Grid ml={2}>
              <Typography variant="h6" sx={queries.medium_text}>
                Pregunta
              </Typography>
            </Grid>
            <Grid container ml={2} width={"89%"}>
              <TextField
                inputProps={{ maxLength: 300 }}
                margin="dense"
                id="nombreEvento"
                value={pregunta}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setPregunta(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            </Grid>
          </Grid>

          <Grid container direction={"column"} mt={2}>
            <Grid ml={2}>
              <Typography variant="h6" sx={queries.medium_text}>
                Respuesta
              </Typography>
            </Grid>
            <Grid container ml={2} width={"89%"}>
              <TextField
                rows={3}
                multiline
                inputProps={{ maxLength: 700 }}
                margin="dense"
                id="nombreEvento"
                value={respuesta}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setRespuesta(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            </Grid>
          </Grid>
        </>
      ) : null}

      {TabValue === "Videos" || TabValue === "Guías" ? (
        <Grid
          container
          item
          height={"100vh"}
          width={"100vw"}
          sx={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "center",
          }}
        >
          {TabValue === "Videos" ? (
            <video
              loop
              autoPlay
              width={"98%"}
              height={"98%"}
              src={videoPreview}
              id="videoPlayer"
              controls
            />
          ) : (
            <iframe
              src={videoPreview}
              width="98%"
              height="98%"
              title="PDF Viewer"
            ></iframe>
          )}
        </Grid>
      ) : null}

      <Grid></Grid>
      {/* </ModalForm> */}
    </Dialog>
  );
};

export default AyudasModal;
