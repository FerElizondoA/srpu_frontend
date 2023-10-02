/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { GridSearchIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  getDocumento,
  getPathDocumentosMandato,
} from "../../components/APIS/pathDocSol/APISDocumentos";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { IPathDocumentos } from "../../components/ObligacionesCortoPlazoPage/Panels/Resumen";
import { AgregarMandatos } from "../../components/mandatos/dialog/AgregarMandatos";
import { queries } from "../../queries";
import { useMandatoStore } from "../../store/Mandatos/main";
import { Mandato } from "../../store/Mandatos/mandato";
export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Head {
  label: string;
}

export interface IDatosMandatos {
  FechaCreacion: string;
  FechaMandato: string;
  Id: string;
  Mandatario: string;
  ModificadoPor: string;
  MunicipioMandante: string;
  NumeroMandato: string;
  OrganismoMandante: string;
  SoporteDocumental: string;
  TipoMovimiento: string;
}

const heads: Head[] = [
  {
    label: "Número de mandato",
  },
  {
    label: "Fecha del mandato",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Mandante",
  },
  {
    label: "Acciones",
  },
];

export function Mandatos() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [accion, setAccion] = useState("Agregar");

  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);

  const getMandatos: Function = useMandatoStore((state) => state.getMandato);

  const cleanMandato: Function = useMandatoStore((state) => state.cleanMandato);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    filtrarDatos();
  };

  const [busqueda, setBusqueda] = useState("");
  const [mandatos, setMandatos] = useState<IDatosMandatos[]>([]);
  const [mandatosFiltrados, setMandatosFiltrados] = useState<IDatosMandatos[]>(
    []
  );

  const filtrarDatos = () => {
    let ResultadoBusqueda = mandatos.filter((elemento) => {
      if (
        elemento.NumeroMandato.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.FechaCreacion.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.Mandatario.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.MunicipioMandante.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase()) ||
        elemento.OrganismoMandante.toString()
          .toLocaleLowerCase()
          .includes(busqueda.toLocaleLowerCase())
      ) {
        return elemento;
      }
    });
    setMandatosFiltrados(ResultadoBusqueda);
  };

  // useEffect(() => { PARA DIALOG ELIMINAR
  //   if (!openDialogEliminar) {
  //     getFideicomisos(setFideicomisos);
  //   }
  // }, [openAgregarFideicomisos]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    busqueda.length !== 0 ? setMandatos(mandatos) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda]);

  useEffect(() => {
    getMandatos(setMandatos);
  }, []);

  const idMandato: string = useMandatoStore((state) => state.idMandato);
  const changeIdMandato: Function = useMandatoStore(
    (state) => state.changeIdMandato
  );

  const mandatoSelect: Mandato[] = useMandatoStore(
    (state) => state.mandatoSelect
  );
  const setMandatoSelect: Function = useMandatoStore(
    (state) => state.setMandatoSelect
  );

  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
  );

  const [pathDocumentos, setPathDocumentos] = useState<Array<IPathDocumentos>>(
    []
  );

  const arrDocs: any[] = useMandatoStore((state) => state.arrDocs);
  const setArrDocs: Function = useMandatoStore((state) => state.setArrDocs);

  // const filtrarDatos = () => {
  //   // eslint-disable-next-line array-callback-return
  //   let ResultadoBusqueda = datos.filter((elemento) => {
  //     if (
  //       // elemento.NumeroDeFideicomiso.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase()) ||
  //       // elemento.FechaDeFideicomiso.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase()) ||
  //       // elemento.DescripcionTipoFideicomiso.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase()) ||
  //       // elemento.DescripcionFiudiciario.toString()
  //       //   .toLocaleLowerCase()
  //       //   .includes(busqueda.toLocaleLowerCase())
  //     ) {
  //       return elemento;
  //     }
  //   });
  //   setMandatosFiltrados(ResultadoBusqueda);
  // };

  useEffect(() => {
    setMandatosFiltrados(mandatos);
  }, [mandatos]);

  useEffect(() => {
    if (pathDocumentos.length > 0) {
      let loc: any = [...arrDocs];
      pathDocumentos?.map((val: any) => {
        return getDocumento(
          val?.Ruta?.replaceAll(`${val?.NombreIdentificador}`, "/"),
          val?.NombreIdentificador,
          (res: any, index: number) => {
            loc.push({ file: res, nombre: val.NombreArchivo });
          }
        );
      });
      setArrDocs(loc);
    }
  }, [pathDocumentos]);

  useEffect(() => {
    if (mandatoSelect.length !== 0) {
      getPathDocumentosMandato(idMandato, setPathDocumentos);
      // listFile(`/Autorizaciones/${idMandato}`);
    }
  }, [mandatoSelect]);

  useEffect(() => {
    getMandatos(setMandatos);
    !openAgregarMandato && cleanMandato();
  }, [openAgregarMandato]);

  const changeNumeroMandato: Function = useMandatoStore(
    (state) => state.changeNumeroMandato
  );

  return (
    <Grid height={"74vh"}>
      <Grid item>
        {/* {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />} */}
        <LateralMenu />
      </Grid>

      <Grid
        display={"flex"}
        justifyContent={"center"}
        width={"97%"}
        height={"4rem"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            fontSize: "2.3ch",
            fontFamily: "MontserratBold",
            color: "#AF8C55",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
            },
            "@media (min-width: 601px) and (max-width: 900px)": {
              fontSize: "1.5ch",
            },
          }}
        >
          Mandatos
        </Typography>
      </Grid>

      <Grid display="center" justifyContent="space-between" height={"4rem"}>
        <Grid
          width={"80%"}
          height={"75%"}
          display={"flex"}
          justifyContent={"end"}
        >
          <Paper
            component="form"
            sx={{
              display: "flex",
              width: "80%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => {
                if (e.target.value === "") {
                  handleSearch();
                }
                handleChange(e.target.value);
              }}
              onKeyPress={(ev) => {
                //cuando se presiona Enter
                if (ev.key === "Enter") {
                  handleSearch();
                  ev.preventDefault();
                  return false;
                }
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => handleSearch()}
            >
              <GridSearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid width={"15%"} display={"flex"} justifyContent={"center"}>
          <Button
            sx={{
              ...queries.buttonContinuar,
              height: "75%",
            }}
            onClick={() => {
              setAccion("Agregar");
              setOpenAgregarMandato(!openAgregarMandato);
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          ...queries.tablaAgregarFuentesPago,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ width: "100%", height: "100%" }}>
          <TableContainer
            sx={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: "1vh",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell key={index} align="center">
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {mandatosFiltrados.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.NumeroMandato}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.FechaMandato}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.Mandatario}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {row.MunicipioMandante}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              setAccion("Editar");

                              changeNumeroMandato(row.NumeroMandato);

                              changeIdMandato(row?.Id);

                              setMandatoSelect(row);

                              editarMandato(
                                JSON.parse(row.TipoMovimiento),
                                JSON.parse(row.SoporteDocumental)
                              );

                              setOpenAgregarMandato(!openAgregarMandato);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              // changeIdFideicomiso(row?.Id || "");
                              // setOpenDialogEliminar(!openDialogEliminar);
                              // getFideicomisos(setDatos);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <AgregarMandatos
        handler={setOpenAgregarMandato}
        openState={openAgregarMandato}
        accion={accion}
      />
    </Grid>
  );
}
