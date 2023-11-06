import { useEffect, useState } from "react";
import { IInfoFile } from "./VisualizadorAyudas";
import { getFileByName } from "./ServicesAyuda";
import { AppBar, Box, Dialog, Grid, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Transition } from "../fuenteDePago/Mandatos";
import { queries } from "../../queries";


export const MostrarArchivos = ({
    handleClose,
    valueTab,
    infoFile,

}: {
    handleClose: Function
    valueTab: string
    infoFile:IInfoFile
}) => {

    const [archivoUrl, setArchivoUrl] = useState<string>("");

    const savePDF =(data:string)=>{
        setArchivoUrl(`data:application/pdf;base64,${data}`);
    }

    const saveVideo =(data:string)=>{
        setArchivoUrl(`data:video/mp4;base64,${data}`);
    }

    useEffect(() => {
        valueTab == "Video" ?
        getFileByName(process.env.REACT_APP_DOC_ROUTE+'/VIDEOS/TUTORIALES/',infoFile.nombre, saveVideo):
        getFileByName(process.env.REACT_APP_DOC_ROUTE+'/GUIAS/', infoFile.nombre,savePDF)
    }, [])

    return (
        <Dialog
            className="containerVizualizar"
            fullScreen
            sx={{ zIndex: 2000 }}
            open={true}
            TransitionComponent={Transition}
        >


            <Grid container sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "flex-end" }}>
            <AppBar sx={{ position: "relative" }}>
                <Toolbar>
          <Tooltip title="Volver">
            <IconButton
              edge="start"
              onClick={() => {
                handleClose();
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                Visualizar 
              </Typography>
            </Grid>
          </Grid>
          </Toolbar>
                </AppBar>


                <Grid item   container xs={12} sm={12} md={12} lg={12} sx={{height:"90vh", display: "flex", justifyContent: "center",alignItems:"center"}}>
                    {
                        valueTab == "Video" ? (

                            <video
                                //autoFocus
                                loop
                                autoPlay
                                width={"98%"}
                                height={"98%"}
                                src={archivoUrl}
                                id="video_player"
                                controls
                            />

                        ) : (

                            <iframe
                                style={{
                                    width: "98%",
                                    height: "98%",
                                }}
                                src={`${archivoUrl}`}
                                title="description"
                            />
                        )
                    }
                </Grid>
            </Grid>
        </Dialog >
    )
}


