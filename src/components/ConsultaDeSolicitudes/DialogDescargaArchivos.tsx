/* eslint-disable react-hooks/exhaustive-deps */
import DownloadIcon from "@mui/icons-material/Download";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableHead,
  TableSortLabel,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { IInscripcion } from "../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../store/Inscripcion/main";
import { getPdf } from "../../store/SolicitudFirma/solicitudFirma";
import {
  descargaDocumento,
  getPathDocumentos,
} from "../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../CustomComponents";
import { queries } from "../../queries";
import { LateralMenu } from "../LateralMenu/LateralMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DocumentosFirmados } from "./DocumentosFirmadoSolicitudes";
import { AcusesSolicitudes } from "./AcusesSolicitudes";
import ClearIcon from "@mui/icons-material/Clear";


export interface IDocumentos {
  Id: string;
  IdPathDoc: string;
  IdSolicitud: string;
  NombreArchivo: string;
  NombreIdentificador: string;
  Ruta: string;
  Tipo: string;
  Descargas: number;
  FechaCreacion: string;
  FechaDescarga: string;
}

const heads: Array<{ label: string }> = [
  {
    label: "Nombre del archivo",
  },
  {
    label: "Descargar",
  },
  {
    label: "Fecha",
  },
];


export function DialogDescargaArchivos({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const [archivos, setArchivos] = useState<Array<IDocumentos>>([]);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  const [tabIndex, setTabIndex] = useState(0);

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
    isTittle: useMediaQuery("(min-width: 0px) and (max-width: 467px)"),
  };

  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => {
    console.log("inscripcion", inscripcion);
    getPathDocumentos(inscripcion.Id, setArchivos);
  }, [inscripcion]);

  return (
    <Dialog open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth={"xl"}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem", lg: "1.2rem" },
          }}>
            Descarga de archivos de la solicitud:{" "}
            <strong>{inscripcion.NumeroRegistro}</strong>
          </Typography>
        </Grid>

        <Grid>
          <Tooltip title="Cerrar">
            <Button onClick={() => setOpen(false)}>
              <ClearIcon fontSize={"large"} />
            </Button>
          </Tooltip>
        </Grid>


      </DialogTitle>
      <DialogContent>

        <Grid item container direction="column">
          <Grid
            sx={{
              mb: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <Tabs
              value={tabIndex}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
              sx={{ width: "100%", fontSize: ".8rem" }}
            >
              <Tab label="Documentos Firmados"
                sx={{ ...queries.bold_text_Largo_Plazo }} />
              <Tab
                label="Acuses Solicitudes"
                sx={{ ...queries.bold_text_Largo_Plazo }}
              />
            </Tabs>
          </Grid>
          {/* <Grid item
            width={{ xs: "100%", sm: "100%", md: "50%", lg: "33%" }}
            display={"flex"}
            justifyContent={"center"}>
            <Typography sx={{ ...queries.text }}>
              Descarga de archivos de la solicitud:{" "}
              <strong>{inscripcion.NumeroRegistro}</strong>
            </Typography>
          </Grid> */}
        </Grid>

        {tabIndex === 0 && <DocumentosFirmados />}
        {tabIndex === 1 && <AcusesSolicitudes />}


      </DialogContent>



    </Dialog>
  );
}

// export function DialogDescargaArchivos({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: Function;
// }) {
//   const [archivos, setArchivos] = useState<Array<IDocumentos>>([]);

//   const inscripcion: IInscripcion = useInscripcionStore(
//     (state) => state.inscripcion
//   );

//   useEffect(() => {
//     getPathDocumentos(inscripcion.Id, setArchivos);
//   }, [inscripcion]);

//   return (
//     <Dialog open={open} onClose={() => setOpen(false)}>
//       <DialogTitle>
//         Descarga de archivos de la solicitud:{" "}
//         <strong>{inscripcion.NumeroRegistro}</strong>
//       </DialogTitle>
//       <DialogContent>
//         <Table>
//           <TableHead>
//             <StyledTableRow>
//               {heads.map((head, index) => (
//                 <StyledTableCell align="center" key={index}>
//                   <TableSortLabel>
//                     {" "}
//                     <strong>{head.label}</strong>{" "}
//                   </TableSortLabel>
//                 </StyledTableCell>
//               ))}
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
//             {archivos.length > 0 ? (
//               archivos.map((e, i) => (
//                 <StyledTableRow>
//                   <StyledTableCell>
//                     <Typography> {e.NombreArchivo} </Typography>
//                   </StyledTableCell>

//                   <StyledTableCell>
//                     <Typography>
//                       {" "}
//                       <Tooltip title="Descargar">
//                         <IconButton
//                           type="button"
//                           onClick={() => {
//                             if (e.Tipo === "oficio") {
//                               descargaDocumento(
//                                 e.Ruta.replaceAll(
//                                   `${e.NombreIdentificador}`,
//                                   "/"
//                                 ),
//                                 e.NombreIdentificador,
//                                 e.Descargas === 0 ? e.Id : ""
//                               );
//                             } else {
//                               getPdf(
//                                 e.IdPathDoc,
//                                 inscripcion.NumeroRegistro,
//                                 new Date().toString(),
//                                 e.Descargas === 0 ? e.Id : ""
//                               );
//                             }
//                           }}
//                         >
//                           <DownloadIcon />
//                         </IconButton>
//                       </Tooltip>{" "}
//                     </Typography>
//                   </StyledTableCell>
//                 </StyledTableRow>
//                 // <Grid key={i}>
//                 //   <Grid
//                 //     sx={{
//                 //       display: "grid",
//                 //       gridTemplateColumns: "4fr 1fr",
//                 //       alignItems: "center",
//                 //     }}
//                 //   >

//                 //   </Grid>
//                 //   <Divider />
//                 // </Grid>
//               ))
//             ) : (
//               <Typography> Sin archivos disponibles para descargar </Typography>
//             )}
//           </TableBody>
//         </Table>
//       </DialogContent>
//       <DialogActions>

//         <Button
//           sx={queries.buttonCancelar}
//           onClick={() => {
//             setOpen(false)
//           }}
//         >
//           Cerrar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
