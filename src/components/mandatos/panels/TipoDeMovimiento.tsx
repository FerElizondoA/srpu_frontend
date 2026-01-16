import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {
  IBeneficiarioMandato,
  IDatosGeneralesMandato,
  IDeudorMandatoNew,
} from "../../../store/Mandatos/mandato";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import es from "date-fns/locale/es";
import { buttonTheme } from "../dialog/AgregarMandatos";
import { IPorcentajeAcumulados } from "../../../store/Fideicomiso/fideicomiso";
import { set } from "date-fns";
import { ValidacionAgregarTipoMov } from "../../fideicomisos/dialog/ValidacionAgregarTipoMov";

interface HeadLabels {
  label: string;
}

const heads: HeadLabels[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Mandante",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Fuente de Pago",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente a los Municipios",
  },
  {
    label: "% de Asignación del Fondo o Ingreso Correspondiente al Municipio",
  },
  {
    label: "% del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Afectado al Mandato del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% de Afectación del Gobierno del Estado /100 del Fondo o Ingreso",
  },
  {
    label:
      "% Acumulado de Afectación del Gobierno del Estado a los Mecanismos de Pago /100",
  },
  {
    label:
      "% Afectado al Mandato del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label: "% Afectado al Mandato del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
  {
    label: "",
  },
];


const headsNews: HeadLabels[] = [
  // {
  //   label: "Id",
  // },
  {
    label: "No. Mandato",
  },
  {
    label: "Tipo de Fuente",
  },
  {
    label: "Fondo o Ingreso",
  },
  {
    label: "Mandatario",
  },
  {
    label: "Porcentaje Afectado Sobre el Total de Ingreso",
  },
  {
    label: "Equivalencia Sobre Sin incluir el monto que corresponde a los municipios  ([*])",
  },
  {
    label: "Beneficiario",
  },
  {
    label: "Eliminar",
  },
];

export function TipoDeMovimientoMandato() {

  const arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.arregloPorcetajesAcumuladosRegistros
  );

  const tipoMovimiento: IDeudorMandatoNew = useMandatoStore(
    (state) => state.tipoMovimiento
  );

  const beneficiario: IBeneficiarioMandato = useMandatoStore(
    (state) => state.beneficiario
  );

  const tablaTipoMovimiento: IDeudorMandatoNew[] = useMandatoStore(
    (state) => state.tablaTipoMovimientoMandato
  );

  const setTipoMovimiento: Function = useMandatoStore(
    (state) => state.setTipoMovimiento
  );

  const setBeneficiario: Function = useMandatoStore(
    (state) => state.setBeneficiario
  );

  const idTipoMovimientoSelect: string = useMandatoStore(
    (state) => state.idTipoMovimientoSelect
  );

  const setIdTipoMovimientoSelect: Function = useMandatoStore(
    (state) => state.setIdTipoMovimientoSelect
  );

  //catalogo
  const catalogoOrganismos: any = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoTiposDeFuente: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<IFondoOIngreso> = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const addTipoMovimiento: Function = useMandatoStore(
    (state) => state.addTipoMovimiento
  );

  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const getFondosOIngresosInstrucciones: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );

  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );

  const removeTipoMovimiento: Function = useMandatoStore(
    (state) => state.removeTipoMovimiento
  );

  const cleanTipoMovimiento: Function = useMandatoStore(
    (state) => state.cleanTipoMovimiento
  );



  // const tipoMovimientoMandatoNew: IDeudorMandatoNew = useMandatoStore(
  //   (state) => state.tipoMovimientoMandatoNew
  // );

  // const tablaTipoMovimientoMandatoNew: IDeudorMandatoNew[] = useMandatoStore(
  //   (state) => state.tablaTipoMovimientoMandatoNew
  // );


  // const removeTipoMovimientoNew: Function = useMandatoStore(
  //   (state) => state.removeTipoMovimientoNew
  // );

  // const cleanTipoMovimientoNew: Function = useMandatoStore(
  //   (state) => state.cleanTipoMovimientoNew
  // );

  // const addTipoMovimientoNew: Function = useMandatoStore(
  //   (state) => state.addTipoMovimientoNew
  // );

  // const setTipoMovimientoNew: Function = useMandatoStore(
  //   (state) => state.setTipoMovimientoNew
  // );

  const updateTipoMovimientoField: Function = useMandatoStore(
    (state) => state.updateTipoMovimientoField
  );


  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getFondosOIngresosInstrucciones();
    getInstituciones()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [movimiento, setMovimiento] = useState("DEUDOR");

  const addPorcentaje: Function = useMandatoStore(
    (state) => state.addPorcentaje
  );

  const ids: string[] = tablaTipoMovimiento.map((row) => {
    return row.id;
  });

  const datosGenerales: IDatosGeneralesMandato = useMandatoStore(
    (state) => state.datosGenerales
  );


  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const cleanFullDeudorBeneficiario = () => { //Vacia los campos de Deudor y Beneficiario al cambiar de movimiento
    setIdTipoMovimientoSelect("");
    setBeneficiario({
      tipoBeneficiario: { Id: "", Descripcion: "" },
      beneficiario: { Id: "", Descripcion: "" },
      fechaAlta: new Date(),
    });
    setTipoMovimiento(
      {
        id: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0
      },
    )
  }
  const [openValidacionAgregarTipoMov, setOpenValidacionAgregarTipoMov] = useState(false)


  const buttonAgregar = () => {
    return (
      <ThemeProvider theme={buttonTheme}>
        <Button
          disabled={
            tipoMovimiento.tipoEntePublicoObligado.Id === "" ||
            tipoMovimiento.mandatario.Id === "" ||
            tipoMovimiento.tipoFuente.Id === "" ||
            tipoMovimiento.fondoIngreso.Id === ""
          }
          sx={{
            ...queries.buttonContinuar,
            width: "15vh",
          }}
          onClick={() => {

            if (datosGenerales.numeroMandato === "") {
              setOpenValidacionAgregarTipoMov(true)

            } else {
              addTipoMovimiento({
                // id: tipoMovimiento.id,
                id: datosGenerales.numeroMandato,
                tipoEntePublicoObligado: tipoMovimiento.tipoEntePublicoObligado,
                mandatario: tipoMovimiento.mandatario,
                tipoFuente: tipoMovimiento.tipoFuente,
                fondoIngreso: tipoMovimiento.fondoIngreso,
                AfectadoTotalIngreso: tipoMovimiento.AfectadoTotalIngreso,
                EquivalenciaCorrespondienteMunicipios: tipoMovimiento.EquivalenciaCorrespondienteMunicipios,
                Beneficiario: tipoMovimiento.mandatario.Id === beneficiario.beneficiario.Id ?
                  { Id: "", Descripcion: "" } :
                  beneficiario.beneficiario
              })
            }
            cleanTipoMovimiento();
          }}
        >
          Agregar
        </Button>
      </ThemeProvider>
    );
  };

  // useEffect(() => {
  //   console.log("GUARDO EL REGISTRO DEL % ACUMULADO EN EL ARRAY QUE VIENE DE LA BASE DE DATOS",);
  //   console.log("arregloPorcetajesAcumuladosRegistros", arregloPorcetajesAcumuladosRegistros);
  // }, [arregloPorcetajesAcumuladosRegistros])



  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"flex-start"}
      width={"100%"}
      sx={{
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
      {/* <Grid
        item
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RadioGroup
          value={movimiento}
          onChange={(v) => {
            setMovimiento(v.target.value);

            if (v.target.value === "DEUDOR") {
              cleanFullDeudorBeneficiario();
            }
          }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControlLabel
            sx={{ ...queries.medium_text }}
            value="DEUDOR"
            control={<Radio />}
            label="Alta de Deudor"
          />

          {tablaTipoMovimiento.length > 0 ?
            (
              <>
                <FormControlLabel
                  sx={{ ...queries.medium_text }}
                  value="BENEFICIARIO"
                  control={<Radio />}
                  label="Alta de Beneficiario"
                />
              </>
            )
            : null}

        </RadioGroup>
      </Grid> */}

      {/* <Divider>
        <Typography
          sx={{
            ...queries.bold_text,
            color: "#af8c55 ",
          }}
        >
          Mandante
        </Typography>
      </Divider> */}

      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        //height={ movimiento === "BENEFICIARIO" ? "28vh" :"20vh"}
        height={
          { xs: "78vh", sm: "45vh", md: "45vh", lg: "27vh", xl: "27vh" }}

      >
        {/* {movimiento === "BENEFICIARIO" ? ( */}
        {/* <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          mb={
           
               { xs: 4, sm: 0, md: 0, lg: 0 }
              
          }
        >
          <InputLabel sx={queries.medium_text}>Número del Mandato</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={ids }
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option}>
                  <Typography>{option}</Typography>
                </li>
              );
            }}
            value={idTipoMovimientoSelect}
            onChange={(event, text) => {
              let row = tablaTipoMovimiento.filter((_) => _.id === text)[0];

              setIdTipoMovimientoSelect(text);
              setTipoMovimiento(row);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ""
            }
          />
        </Grid> */}
        {/* ) : null} */}

        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          mb={
            { xs: 1, sm: 0, md: 0 }

          }
        >
          <InputLabel sx={queries.medium_text}>
            Tipo de Ente Público Obligado
          </InputLabel>

          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoTipoEntePublicoObligado}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography sx={{ ...queries.medium_text }}>
                    {option.Descripcion}
                  </Typography>
                </li>
              );
            }}
            value={tipoMovimiento.tipoEntePublicoObligado}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
                tipoEntePublicoObligado: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={{ ...queries.medium_text }}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          // mb={
          //   movimiento === "BENEFICIARIO" ? { xs: 0, sm: 0, md: 0 } : { sm: 0 }
          // }
          mt={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}
        >
          <InputLabel sx={queries.medium_text}>Mandatario</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              tipoMovimiento.tipoEntePublicoObligado.Descripcion ===
              "No Aplica" ||
              /^[\s]*$/.test(tipoMovimiento.tipoEntePublicoObligado.Descripcion)
            }
            fullWidth
            options={catalogoOrganismos.filter(
              (td: any) =>
                td.IdTipoEntePublico ===
                tipoMovimiento.tipoEntePublicoObligado.Id
            )}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
                mandatario: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
              });
            }}
            value={tipoMovimiento.mandatario}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id || value.Descripcion === ""
            }
          />
        </Grid>

        {/* {movimiento === "BENEFICIARIO" ? ( */}

        <Grid item xs={10} sm={5} md={5} lg={5} xl={5}
          mt={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}
        >
          <InputLabel sx={queries.medium_text}>Beneficiario</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            // disabled={
            //   beneficiario.tipoBeneficiario.Descripcion === "No Aplica" ||
            //   /^[\s]*$/.test(beneficiario.tipoBeneficiario.Descripcion)
            // }
            fullWidth
            options={catalogoInstituciones}
            // options={catalogoOrganismos.filter(
            //   (td: any) =>
            //     td.IdTipoEntePublico === beneficiario.tipoBeneficiario.Id
            // )}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setBeneficiario({
                ...beneficiario,
                beneficiario: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
              });
            }}
            value={beneficiario.beneficiario}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id || value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          mt={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}

        // mt={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fecha de Alta
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={es}
          >
            <DesktopDatePicker
              sx={{
                width: "100%",
              }}
              value={beneficiario.fechaAlta}
              onChange={(v) => {
                setBeneficiario({
                  ...beneficiario,
                  fechaAlta: v,
                });
              }}
            />
          </LocalizationProvider>
        </Grid>

        {/* ) : null} */}



        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          mt={
            5
          }
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Tipo de Fuente
          </InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFuente}
            value={tipoMovimiento.tipoFuente}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
                tipoFuente: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>

        <Grid
          item
          xs={10}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          mt={5}
        >
          <InputLabel sx={{ ...queries.medium_text }}>
            Fondo o Ingreso
          </InputLabel>
          <Autocomplete
            disabled={tipoMovimiento.tipoFuente?.Id === ""}
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoFondosOIngresos?.filter(
              (td) => td.TipoDeFuente === tipoMovimiento.tipoFuente?.Id
            )}
            value={tipoMovimiento.fondoIngreso}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) => {
              setTipoMovimiento({
                ...tipoMovimiento,
                id: `${tipoMovimiento.tipoFuente?.Descripcion
                  }/${text.Descripcion.split(" ")
                    .map((word) =>
                      word.charAt(0) === word.charAt(0).toUpperCase()
                        ? word.charAt(0)
                        : ""
                    )
                    .join("")}/${tablaTipoMovimiento?.length + 1}`,
                fondoIngreso: {
                  Id: text.Id,
                  Descripcion: text.Descripcion,
                  TipoDeFuente: text.TipoDeFuente,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>
      </Grid>
      {/*  */}

      {/* <Grid
        container
        display={{ xs: "flex", sm: "flex", md: "flex" }}
        justifyContent={{
          xs: "center",
          sm: "space-evenly",
          md: "space-evenly",
        }}
        alignItems={"center"}
        mb={2}
        mt={{ xs: 11, sm: 0 }}
      >

      </Grid> */}


      <Grid container
        mt={4}
        width={"100%"}
        height={"4rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {buttonAgregar()}
      </Grid>
      {/* 
      {movimiento === "BENEFICIARIO" && (
        <Divider>
          <Typography
            sx={{
              ...queries.bold_text,
              color: "#af8c55 ",
            }}
          >
            Beneficiario
          </Typography>
        </Divider>
      )} */}



      <Grid container
        mt={3} mb={2}
        display={"flex"}
        justifyContent={"center"}
        height={movimiento === "DEUDOR" ? "30rem" : "24rem"}
      >
        <Paper sx={{ width: "95%", height: "100%" }}>

          <TableContainer
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
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
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {headsNews.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaTipoMovimiento.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      {/* ID */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      {/* TIPO MANDANTE  */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.tipoFuente.Descripcion}
                          {/* {row?.tipoFideicomitente.Descripcion} */}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.fondoIngreso.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/* fideicomitente  */}
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.mandatario.Descripcion}
                        </Typography>
                      </StyledTableCell>


                      {/* Porcentaje Afectado Sobre el Total de Ingreso */}
                      <StyledTableCell align="center">
                        <TextField
                          type="number"
                          value={row.AfectadoTotalIngreso || ''}
                          onChange={(e) => {
                            const newValue = Number(e.target.value);
                            if (newValue < 100) {
                              updateTipoMovimientoField(index, 'AfectadoTotalIngreso', isNaN(newValue) ? 0 : newValue);
                            }
                          }}
                          inputProps={{ min: 0 }}
                        />
                      </StyledTableCell>

                      {/* Equivalencia Sin incluir el monto de municipios */}
                      <StyledTableCell align="center">
                        <TextField
                          type="number"
                          disabled={row.tipoEntePublicoObligado.Descripcion.toLowerCase() !== "gobierno estatal"}
                          value={row.tipoEntePublicoObligado.Descripcion.toLowerCase() === "gobierno estatal" ?
                            row.EquivalenciaCorrespondienteMunicipios || '' : 0}
                          onChange={(e) => {
                            const newValue = Number(e.target.value);
                            if (newValue < 100) {
                              updateTipoMovimientoField(index, 'EquivalenciaCorrespondienteMunicipios', isNaN(newValue)
                                ? 0 : newValue);
                            }
                          }}
                          inputProps={{ min: 0 }}
                        />
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.8rem" }}>
                          {row?.Beneficiario?.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      {/*  FALTA AGREGAR VALDIACION AL BOTON DE AGREGAR  Y VERIFICAR EL NUMERO DE FIDEICOMISO Y MANDATOS QUE NO SE REPITA++96*/}

                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              //let auxArray = [...tablaTipoMovimientoFideicomisoNew];

                              //addPorcentaje(auxArray);
                              removeTipoMovimiento(index);
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



          {/* <TableContainer
            sx={{
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
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography sx={{ fontSize: "0.7rem" }}>
                        {head.label}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaTipoMovimiento.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                       ID
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.id}
                        </Typography>
                      </StyledTableCell>

                      TIPO MANDANTE 
                      <StyledTableCell align="center"> 
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.tipoFideicomitente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                       fideicomitente 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fideicomitente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                      FUENTE DE PAGO 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.tipoFuente.Descripcion}
                        </Typography>
                      </StyledTableCell>

                       FONDO INGRESO GOBIERNO ESTATAL 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fondoIngresoGobiernoEstatal}
                        </Typography>
                      </StyledTableCell>

                    FONDO INGRESO MUNICIPIOS
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fondoIngresoMunicipios}
                        </Typography>
                      </StyledTableCell>

                      FONDO INGRESO MUNICIPIO 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.fondoIngresoAsignadoMunicipio}
                        </Typography>
                      </StyledTableCell>

                      INGRESO ORGANISMO 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.ingresoOrganismo}
                        </Typography>
                      </StyledTableCell>

                      AFECTADO POR GOBIERNO ESTATAL
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                          "gobierno estatal" && (
                            <TextField
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXGobiernoEstatal}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                  ) +
                                  val <=
                                  Number(
                                    tablaTipoMovimiento[index]
                                      .fondoIngresoGobiernoEstatal
                                  )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.fondoIngresoAfectadoXGobiernoEstatal
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionGobiernoEstatalEntre100 =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                        )
                                      ).toString());
                                  });

                                  auxArray[
                                    index
                                  ].fondoIngresoAfectadoXGobiernoEstatal =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                      </StyledTableCell>

                    AFECTACION GOBIERNO ESTATAL / 100 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.afectacionGobiernoEstatalEntre100}
                        </Typography>
                      </StyledTableCell>

                     ACUMULADO AFECTACION GOBIERNO ESTATAL / 100 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                        </Typography>
                      </StyledTableCell>

                       AFECTADO POR MUNICIPIO 
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                          "municipio" && (
                            <TextField
                              type="number"
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXMunicipio}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                  ) +
                                  val <=
                                  Number(
                                    tablaTipoMovimiento[index]
                                      .fondoIngresoAsignadoMunicipio
                                  )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.fondoIngresoAfectadoXMunicipio
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                        )
                                      ).toString());
                                  });

                                  auxArray[index].fondoIngresoAfectadoXMunicipio =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                      </StyledTableCell>

                      ACUMULADO AFECTACION MUNICIPIOS / ASIGNADO AL MUNICIPIO
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() ===
                          "municipio" && (
                            <Typography sx={{ fontSize: "0.7rem" }}>
                              {
                                row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                              }
                            </Typography>
                          )}
                      </StyledTableCell>

                      AFECTADO POR ORGANISMO 
                      <StyledTableCell align="center">
                        {row?.tipoFideicomitente.Descripcion.toLowerCase() !==
                          "gobierno estatal" &&
                          row?.tipoFideicomitente.Descripcion.toLowerCase() !==
                          "municipio" && (
                            <TextField
                              type="number"
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.ingresoAfectadoXOrganismo}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimiento];
                                let val = Number(v.target.value);

                                if (
                                  val <= 100 &&
                                  Number(
                                    sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                  ) +
                                  val <=
                                  Number(
                                    tablaTipoMovimiento[index]
                                      .ingresoOrganismo
                                  )
                                ) {
                                  let suma = 0;

                                  tablaTipoMovimiento.map((column) => {
                                    return (suma += Number(
                                      column.ingresoAfectadoXOrganismo
                                    ));
                                  });

                                  auxArray.map((column) => {
                                    return (column.acumuladoAfectacionOrganismoEntre100 =
                                      (
                                        suma +
                                        val +
                                        Number(
                                          sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                        )
                                      ).toString());
                                  });

                                  auxArray[index].ingresoAfectadoXOrganismo =
                                    val.toString();

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                          )}
                      </StyledTableCell>

                      ACUMULADO AFECTACION ORGANISMO / 100 
                      <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.acumuladoAfectacionOrganismoEntre100}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => {
                              let auxArray = [...tablaTipoMovimiento];

                              auxArray.forEach((item) => {
                                item.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                  tablaTipoMovimiento
                                    .reduce((accumulator, object) => {
                                      return (
                                        accumulator +
                                        Number(
                                          object.fondoIngresoAfectadoXMunicipio
                                        )
                                      );
                                    }, 0)
                                    .toString();
                              });
                              auxArray.forEach((item) => {
                                item.acumuladoAfectacionOrganismoEntre100 =
                                  tablaTipoMovimiento
                                    .reduce((accumulator, object) => {
                                      return (
                                        accumulator +
                                        Number(object.ingresoAfectadoXOrganismo)
                                      );
                                    }, 0)
                                    .toString();
                              });

                              addPorcentaje(auxArray);
                              removeTipoMovimiento(index);
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
          </TableContainer> */}
        </Paper>


      </Grid>
      <ValidacionAgregarTipoMov
        openValidacionAgregarTipoMov={openValidacionAgregarTipoMov}
        setOpenValidacionAgregarTipoMov={setOpenValidacionAgregarTipoMov}
        TipoFuentePago={"Mandato"}
      />
    </Grid>
  );
}
