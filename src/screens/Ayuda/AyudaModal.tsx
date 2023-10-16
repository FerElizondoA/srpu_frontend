import { AppBar, Autocomplete, Button, CircularProgress, Dialog, Grid, IconButton, Slide, TextField, ThemeProvider, Toolbar, Tooltip, Typography, createTheme } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import ModalForm from "./ModalForm";
import { createAyuda, getMenus, saveFile } from "./ServicesAyuda";
import Swal from "sweetalert2";
import SliderProgress from "./SliderProgress";
import { queries } from "../../queries";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});

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
  
  export interface IFile { archivo: File; nombreArchivo: string }
  
  export const AyudasModal = ({
    TabValue,
    handleClose,
    openState,
  }: {
    TabValue: string;
    handleClose: Function;
    openState: boolean;

  }) => {
  
    const [menu, setMenu] = useState<ILista>({ Id: "", Label: "" });
    const [menus, setMenus] = useState<ILista[]>([]);
  
    const [newVideo, setNewVideo] = useState<File>(new File([], ""));
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
  
    const [videoPreview, setVideoPreview] = useState("");
    const [slideropen, setslideropen] = useState(false);
  
    function enCambioFile(event: any) {
      if (
        event?.target?.files[0] &&
        event.target.files[0].type.split("/")[0] == "video"
      ) {
        setNombreArchivo(event?.target?.value?.split("\\")[2]);
        let file = event?.target!?.files[0]!;
        setNewVideo(file);
        setVideoPreview(URL.createObjectURL(event.target.files[0]));
  
      } else if (
        event?.target?.files[0] &&
        event.target.files[0].type == "application/pdf"
      ) {
        setNombreArchivo(event?.target?.value?.split("\\")[2]);
        let file = event?.target!?.files[0]!;
        setVideoPreview(URL.createObjectURL(event.target.files[0]));
  
        setNewVideo(file);
      } else {
        Swal.fire({
          confirmButtonColor: "#15212f",
          icon: "error",
          title: "Error",
        });
        
      }
    }
   
  
    useEffect(() => { getMenus(setMenus) }, [])
  
  
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
                Agregar {TabValue}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
              {TabValue == "Videos" && nombreArchivo !== '' ?(
                <ThemeProvider theme={theme}>            
                <Button
                sx={queries.buttonContinuar}
                onClick={() => {
                  if (menu.Id !== "") {
                    setslideropen(true)
                    saveFile(TabValue, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, pregunta, respuesta, handleClose);
                  }
                  else {
                    Swal.fire({
                      confirmButtonColor: "#15212f",
                      icon: "error",
                      title: "Seleccione un menú.",
                    });
                  }
                }
                }
                >
                <Typography
                  sx={{
                    fontSize: "1.3ch",
                    fontFamily: "MontserratMedium",
                    "@media (min-width: 480px)": {
                      fontSize: "1.5ch",
                    },
                  }}
                >
                   Gaurdar {TabValue}
                </Typography>
              </Button>
              </ThemeProvider>
                ):("")
            }

            {TabValue == "Guias" && nombreArchivo !== '' ? (
                <ThemeProvider theme={theme}>            
                <Button
                  sx={{ ...queries.buttonContinuar }} 
                  onClick={() => {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        setslideropen(true)
  
                        saveFile(TabValue, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, pregunta, respuesta, handleClose)
                      }
                      else {
                        Swal.fire({
                          confirmButtonColor: "#15212f",
                          icon: "error",
                          title: "Escriba título de guía.",
                        });
                      }
                    }
                    else {
                      Swal.fire({
                        confirmButtonColor: "#15212f",
                        icon: "error",
                        title: "Seleccione un menú.",
                      });
                    }
                  }
  
                  }
                >
                  Guardar
                </Button>
                </ThemeProvider>
            ) : (
              ""
            )}
            {TabValue == "Preguntas" ? (
                <ThemeProvider theme={theme}>            

                <Button
  
                  //className="aceptar"
                  sx={{ ...queries.buttonContinuar }} 
                  onClick={() => {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        if (respuesta !== "") {
                          setslideropen(true)
  
                          let datos = {
                            IdMenu: menu.Id,
                            Pregunta: pregunta,
                            Texto: respuesta,
                            RutaGuia: "",
                            RutaVideo: "",
                            NombreArchivo: "",
                            NombreArchivoServidor: "",
                            IdUsuario: localStorage.getItem("IdUsuario") || ""
                          }
                          createAyuda(datos, handleClose)
                        }
                        else {
                          Swal.fire({
                            confirmButtonColor: "#15212f",
                            icon: "error",
                            title: "Escriba una respuesta.",
                          });
                        }
                      }
                      else {
                        Swal.fire({
                          confirmButtonColor: "#15212f",
                          icon: "error",
                          title: "Escriba una pregunta.",
                        });
                      }
                    }
                    else {
                      Swal.fire({
                        confirmButtonColor: "#15212f",
                        icon: "error",
                        title: "Seleccione un menú.",
                      });
                    }
                  }
                  }
                >
                  Guardar
                </Button>
              </ThemeProvider>
            ) :null}
              
          </Grid>
        </Toolbar>
      </AppBar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={6.5} lg={8.2}>
            <Typography variant="h6" sx={queries.medium_text}>Menú</Typography>
            <Autocomplete
              noOptionsText="No se encontraron opciones"
              clearText="Borrar"
              closeText="Cerrar"
              openText="Abrir"
              options={menus}
              getOptionLabel={(menu) =>
                menu.Label || "Seleccione Menú"
              }
              value={menu}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setMenu(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  key={params.id}
                  {...params}
                  variant="outlined"                />
              )}
            />
          </Grid>
  
          <Grid
            item
            xs={12}
            md={5.5}
            lg={3.8}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            paddingTop={3}
          >
  
  
            {TabValue !== "Preguntas" ? (
  
              <Button
                
                variant="contained"
                className="aceptar"
                //hidden
                //disabled={modo == "Editar Nombre Video" || !TabValue}
                component="label"
              >
  
                Seleccionar {TabValue}
                <input
                  hidden
                  accept={TabValue == "Videos" ? "video/*" : "application/pdf"}
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
  
        {TabValue == "Videos" || TabValue == "Guias" ? (
          <>
            
            <Grid container>
              <Grid>
                <Typography variant="h6" sx={queries.medium_text}>Nombre del archivo: </Typography>
              </Grid>
              <Grid item xs={12}>
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
            {TabValue == "Guias" ? (
              <Grid container>
                <Grid>
                  <Typography variant="h6"sx={queries.medium_text}>
                    Pregunta / Titulo de guia:{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
        ) :null}
  
        {TabValue == "Preguntas" ? (
          <>
            
            <Grid container>
              <Grid>
                <Typography variant="h6"sx={queries.medium_text}>Pregunta</Typography>
              </Grid>
              <Grid item xs={12}>
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
  
            <Grid container>
              <Grid>
                <Typography variant="h6"sx={queries.medium_text}>Respuesta</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
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
        ) :null}
  
        {TabValue == "Videos" || TabValue == "Guias" ?
  
          (<Grid container item  height={"100vh"} width={"100vw"} sx={{display:"flex", justifyContent:"Center",alignItems:"center"}}>
  
            {TabValue == "Videos" ? (
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
          </Grid>) : 
          null}
  
        <Grid>
        </Grid>
      {/* </ModalForm> */}
      </Dialog>
    );
  };
  
  export default AyudasModal;
  