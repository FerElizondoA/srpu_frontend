import { AppBar, Box, Dialog, Grid, IconButton, Slide, Toolbar, Tooltip } from "@mui/material";
import ModalForm from "./ModalForm";
import { forwardRef, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import PreviewIcon from '@mui/icons-material/Preview';
import MUIXDataGrid from "../../components/MUIXDataGrid";
import { MostrarArchivos } from "./MostrarArchivos";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IInfoFile {
    nombre: string;
    ruta: string;
  }
  export const VisualizadorAyudas = ({
    handleClose,
    arrayAyudas,
    valueTab,
    openState,

  }: {
    handleClose: Function
    arrayAyudas: any[]
    valueTab: string
    openState: boolean;

  }) => {
  
    const [open, setOpen] = useState(false);
    const [infoFile, setInfoFile] = useState<IInfoFile>({ nombre: "", ruta: "" });
  
    const columnsVideo: GridColDef[] = [
      {
        field: "Acciones",
        disableExport: true,
        headerName: "Acciones",
        description: "Acciones",
        sortable: false,
        width: 80,
        renderCell: (v: any) => {
          return (
            <Box>
  
  
              <Tooltip title="Visualizar">
                <IconButton onClick={() => {
                  setOpen(true);
                  setInfoFile({ ruta: v?.row?.RutaVideo, nombre: v?.row?.NombreArchivoServidor })
                }}>
                  <PreviewIcon />
                </IconButton>
              </Tooltip>
            </Box>
  
          );
        },
      },
      { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
      {
        field: "NombreArchivo",
        headerName: "Nombre Video",
        description: "Nombre Video",
        width: 600,
      },
  
    ];
  
    const columnsGuia: GridColDef[] = [
  
      {
        field: "Acciones",
        disableExport: true,
        headerName: "Acciones",
        description: "Acciones",
        sortable: false,
        width: 80,
        renderCell: (v: any) => {
          return (
            <Box>
              <Tooltip title="Visualizar">
                <IconButton onClick={() => {
                  setOpen(true)
                  setInfoFile({ ruta: v?.row?.RutaGuia, nombre: v?.row?.NombreArchivoServidor })
                }}>
                  <PreviewIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
      { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
      {
        field: "Pregunta",
        headerName: "Pregunta",
        description: "Pregunta",
        width: 600,
      },
      {
        field: "NombreArchivo",
        headerName: "Nombre Guía",
        description: "Nombre Guía",
        width: 600,
      },
  
    ];
  
    const columnsPreguntas: GridColDef[] = [
  
      { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
      {
        field: "Pregunta",
        headerName: "Pregunta",
        description: "Pregunta",
        width: 600,
      },
      {
        field: "Texto",
        headerName: "Respuesta",
        description: "Respuesta",
        width: 800,
      },
    ];
  
    const handleCloseModal = () => {
      setOpen(false);
    };
  
    return (
      (
        <Dialog fullScreen open={openState} TransitionComponent={Transition}>
          
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
      {/* <ModalForm
        title="Visualizar" handleClose={() => { handleClose() }}> */}
        <Grid item sx={{ width: "100vw", height: "90vh", justifyContent:"center",alignItems:"center",displa:"flex" }}>
          {/* cambio a tabla preguntas */}
          {valueTab == "Preguntas" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsPreguntas} rows={arrayAyudas} />
  
          ) : null}
          {/* cambio a tabla videos*/}
          {valueTab == "Videos" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsVideo} rows={arrayAyudas} />
          ) : null}
          {/* cambio a tabla guías */}
          {valueTab == "Guias" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsGuia} rows={arrayAyudas} />
          ) : null}
  
        </Grid>
        {open ? <MostrarArchivos
          handleClose={handleCloseModal}
          infoFile={infoFile}
          valueTab={valueTab}
        />
          : null}
  
      {/* </ModalForm> */}
      </Toolbar>
      </Dialog>
      )
    )
  }