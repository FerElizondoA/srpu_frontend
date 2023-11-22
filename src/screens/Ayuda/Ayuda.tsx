/* eslint-disable react-hooks/exhaustive-deps */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import { queries } from "../../queries";
import AyudasModal from "./AyudaModal";
import { deleteFile, getAyuda } from "./ServicesAyuda";

export interface IAyudaVideo {
  Id: string;
  IdMenu: string;
  Menu: string;
  NombreArchivo: string;
  RutaVideo: string;
  UltimaActualizacion: string;
}

export interface IAyudaGuia {
  Id: string;
  IdMenu: string;
  Menu: string;
  NombreArchivo: string;
  RutaGuia: string;
  Pregunta: string;
  UltimaActualizacion: string;
}

export interface IAyudaPregunta {
  Id: string;
  IdMenu: string;
  Menu: string;
  Respuesta: string;
  Pregunta: string;
  UltimaActualizacion: string;
}

const Ayuda = () => {
  const [valueTab, setValueTab] = useState<string>("Guías");
  const [Preguntas, setPreguntas] = useState<IAyudaPregunta[]>([]);
  const [Guias, setGuias] = useState<IAyudaGuia[]>([]);
  const [Videos, setVideos] = useState<IAyudaVideo[]>([]);
  const [open, setOpen] = useState(false);

  function eliminar(v: any) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este registro?",
      icon: "question",
      showCancelButton: true,
      iconColor: "#15212f",

      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFile(v?.row?.RutaGuia, v?.row?.NombreArchivoServidor, v?.row?.Id)
          .then((response) => {
            obtenerDatos();

            Swal.fire({
              confirmButtonColor: "#15212f",
              icon: "success",
              title: "Se ha eliminado exitosamente",

              //text: "El archivo se ha eliminado exitosamente",
            });
          })
          .catch((error) => {
            Swal.fire({
              confirmButtonColor: "#15212f",
              icon: "error",
              title: "Error al cargar archivo.",
            });
          });
      }
    });
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const columnsGuia: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Guía">
              <IconButton
                onClick={() => {
                  eliminar(v);
                }}
              >
                <DeleteForeverIcon />
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

  const columnsVideo: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Video">
              <IconButton
                onClick={() => {
                  eliminar(v);
                }}
              >
                <DeleteForeverIcon />
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

  const columnsPreguntas: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Pregunta">
              <IconButton
                onClick={() => {
                  eliminar(v);
                }}
              >
                <DeleteForeverIcon />
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
      field: "Texto",
      headerName: "Respuesta",
      description: "Respuesta",
      width: 730,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    obtenerDatos();
  };

  const obtenerDatos = () => {
    if (valueTab === "Guías") {
      getAyuda(setGuias, "0", "Guías");
    }
    if (valueTab === "Videos") {
      getAyuda(setVideos, "0", "Videos");
    }
    if (valueTab === "Preguntas") {
      getAyuda(setPreguntas, "0", "Preguntas");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1000)"),
  };

  // const query = {
  //     isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  //   };

  useEffect(() => {
    obtenerDatos();
  }, [valueTab]);

  return (
    <>
      <LateralMenu />
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={60}
      >
        <Typography
          sx={{
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            fontSize: "1rem",
            "@media (min-width: 480px)": {
              fontSize: "1.2rem",
            },
          }}
        >
          Administración de Ayudas
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{ maxHeight: "90vh", maxWidth: "100vw" }}
        width={"100%"}
      >
        <Grid
          container
          sx={{
            height: "8vh",
            width: "100%",
            display: "flex",

            //justifyContent: "flex-end",
          }}
        >
          <Grid
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "end",
              width: "69%",
              "@media (min-width: 480px)": {
                width: "58%",
              },

              "@media (min-width: 768px)": {
                width: "66.5%",
              },

              "@media (min-width: 1140px)": {
                width: "62%",
              },

              "@media (min-width: 1400px)": {
                width: "60%",
              },

              "@media (min-width: 1870px)": {
                width: "58%",
              },
            }}
          >
            <Tabs
              value={0}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                label="Guías"
                sx={{ ...queries.bold_text, textTransform: "capitalize" }}
                value="Guías"
              ></Tab>
              <Tab
                label="Videos"
                sx={{ ...queries.bold_text, textTransform: "capitalize" }}
                value="Videos"
              ></Tab>
              <Tab
                label="Preguntas"
                sx={{ ...queries.bold_text, textTransform: "capitalize" }}
                value="Preguntas"
              ></Tab>
              {open ? (
                <AyudasModal
                  TabValue={valueTab}
                  handleClose={handleClose}
                  openState={open}
                />
              ) : null}
            </Tabs>
          </Grid>
          <Grid
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "end",
              width: "30%",
            }}
          >
            <Button
              sx={{ ...queries.buttonContinuar, height: "2.5rem" }}
              onClick={() => {
                setOpen(true);
                handleOpen();
                //agregar = { true}
              }}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100vw", height: "72vh" }}>
          {/* <MUIXDataGrid  id={(row: any) => row.Id} columns={columnsPreguntas} rows={[]}/> */}

          {/* cambio a tabla preguntas */}
          {valueTab === "Preguntas" ? (
            <MUIXDataGrid
              id={(row: any) => row.Id}
              columns={columnsPreguntas}
              rows={Preguntas}
            />
          ) : null}
          {/* cambio a tablas videos y guías */}
          {valueTab === "Videos" ? (
            <MUIXDataGrid
              id={(row: any) => row.Id}
              columns={columnsVideo}
              rows={Videos}
            />
          ) : null}

          {valueTab === "Guías" ? (
            <MUIXDataGrid
              id={(row: any) => row.Id}
              columns={columnsGuia}
              rows={Guias}
            />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};
export default Ayuda;
