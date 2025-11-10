import { Button, Grid, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { VehiculoDePago } from "./VehiculoDePago";
import { AsignarFuente } from "./AsignarFuente";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { AgregarMandatos, buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { AgregarFideicomisos } from "../../fideicomisos/dialog/AgregarFideicomisos";
import { AgregarInstruccionesIrrevocables } from "../../instruccionesIrrevocables/dialog/AgregarInstruccionesIrrevocables.tsx";
import { IDeudorFideicomisoNew } from "../../../store/Fideicomiso/fideicomiso";
import { DetalleFideicomiso } from "../../fideicomisos/dialog/DetalleFideicomiso";
import { DetalleMandato } from "../../mandatos/dialog/DetalleMandato";
import { DetalleInstruccion } from "../../instruccionesIrrevocables/dialog/DetalleInstrucciones";

export function FuentePagoSecciones() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 499)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const mecanismoVehiculoPago: IRegistro = useLargoPlazoStore(
    (state) => state.mecanismoVehiculoPago
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  const tablaMecanismoVehiculoPago: IRegistro[] = useLargoPlazoStore(
    (state) => state.tablaMecanismoVehiculoPago
  );

  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
  );

  const catalogoOrganismos: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const editarInstruccion: Function = useInstruccionesStore(
    (state) => state.editarInstruccion
  );

  const editarFideicomisoNew: Function = useFideicomisoStore(
    (state) => state.editarFideicomisoNew
  );

  const catalogoTiposDeFideicomiso: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFideicomiso
  );

  const catalogoInstituciones: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );

  const getTiposFideicomiso: Function = useFideicomisoStore(
    (state) => state.getTiposFideicomiso
  );


  const [pruebaAbrirFuente, setPruebaAbrirFuente] = useState(false);

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const llenarFuentePago = (mecanismoPago: string) => {
    let auxArray = JSON.parse(mecanismoVehiculoPago.TipoMovimiento);
    auxArray.map((column: any) => {
      return (
        (column.acumuladoAfectacionGobiernoEstatalEntre100 = Number(
          sumaPorcentajeAcumulado.SumaAcumuladoEstado
        ).toString()),
        (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio = Number(
          sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
        ).toString()),
        (column.acumuladoAfectacionOrganismoEntre100 = Number(
          sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
        ).toString())
      );
    });

    if (mecanismoPago === "Mandato") {
      editarMandato(
        mecanismoVehiculoPago.Id,
        {
          numeroMandato: mecanismoVehiculoPago.NumeroRegistro,
          fechaMandato: new Date(mecanismoVehiculoPago.FechaRegistro),
          mandatario: { id: "", Descripcion: mecanismoVehiculoPago.Mandatario },
          mandante: { id: "", Descripcion: mecanismoVehiculoPago.Mandante },
        },
        auxArray,
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );

      setPruebaAbrirFuente(!pruebaAbrirFuente);
    } else if (mecanismoPago === "Instrucción Irrevocable") {
      editarInstruccion(
        mecanismoVehiculoPago.Id,
        {
          numeroCuenta: mecanismoVehiculoPago.NumeroRegistro,
          cuentaCLABE: mecanismoVehiculoPago.CLABE,
          banco: { id: "", Descripcion: mecanismoVehiculoPago.NombreBanco },
          fechaInstruccion: new Date(mecanismoVehiculoPago.FechaRegistro),
        },
        auxArray,
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );

      setPruebaAbrirFuente(!pruebaAbrirFuente);
    } else if (mecanismoPago === "Fideicomiso") {

      editarFideicomisoNew(
        mecanismoVehiculoPago.Id,
        {
          numeroFideicomiso: mecanismoVehiculoPago.NumeroRegistro,
          fechaFideicomiso: new Date(
            mecanismoVehiculoPago.FechaRegistro
          ),
          tipoFideicomiso:
            catalogoTiposDeFideicomiso.filter(
              (v, index) =>
                v.Descripcion === mecanismoVehiculoPago.TipoFideicomiso
            )[0],
          fiduciario: catalogoInstituciones.filter(
            (v, index) =>
              v.Descripcion === mecanismoVehiculoPago.Fiduciario
          )[0],
        },
        JSON.parse(mecanismoVehiculoPago.Fideicomisario),
        JSON.parse(mecanismoVehiculoPago.TipoMovimiento),
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );
      setPruebaAbrirFuente(!pruebaAbrirFuente);
    }
    setDeshabilidarCamposSCLP(true);
  };

  //Para el Filtro y agregado de la tabla
  const setTipoMovimientoFuentesPago: Function = useLargoPlazoStore(
    (state) => state.setTipoMovimientoFuentesPago
  );

  const tipoMovimientoFuentesPago: IDeudorFideicomisoNew[] = useLargoPlazoStore(
    (state) => state.tipoMovimientoFuentesPago
  );

  const cleanTipoMovimientoFuentesPago: Function = useLargoPlazoStore(
    (state) => state.cleanTipoMovimientoFuentesPago
  );


  const [deshabilidarCamposSCLP, setDeshabilidarCamposSCLP] = useState(false);

  const [openAgregarFideicomisos, setOpenAgregarFideicomiso] = useState(false);
  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);
  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);

  useEffect(() => {
    getTiposFideicomiso();
    getInstituciones();
  }, []);


  return (
    <Grid container direction="column">
      <Grid item width={"100%"} display={"flex"}>

        <Grid sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "12%",
        }}>
          <ThemeProvider theme={buttonTheme}>
            <Button sx={{ ...queries.buttonContinuar }}
              disabled={!mecanismoVehiculoPago.NumeroRegistro}
              onClick={() => {
                if (mecanismoVehiculoPago.NumeroRegistro) {
                  llenarFuentePago(tipoMecanismoVehiculoPago);
                } else {
                  console.log("Debe seleccionar un mecanismo de pago");
                }
              }}
            >
              Ver Fuente de Pago
            </Button>
          </ThemeProvider>
        </Grid>

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ width: "70%", display: "flex", justifyContent: "space-evenly" }}
        >
          <Tab
            label="mecanismo o vehiculo de pago"
            sx={{
              ...queries.bold_text_InfoGeneralGastoCosto,
            }}
          />
          {mecanismoVehiculoPago.NumeroRegistro && (
            <Tab
              label="asignar fuente"
              sx={{
                ...queries.bold_text_InfoGeneralGastoCosto,

              }} />
          )}
        </Tabs>
      </Grid>

      {tabIndex === 0 && <VehiculoDePago
        handler={setPruebaAbrirFuente}
        openState={pruebaAbrirFuente}
        filtroCampoTipoFuente={tipoMovimientoFuentesPago}
        setFiltroCampoTipoFuente={setTipoMovimientoFuentesPago}
      />}
      {tabIndex === 1 && <AsignarFuente
        filtroCampoTipoFuente={tipoMovimientoFuentesPago}
        setFiltroCampoTipoFuente={setTipoMovimientoFuentesPago} />}


      {tipoMecanismoVehiculoPago === "Instrucción Irrevocable" && pruebaAbrirFuente === true ?
        <DetalleInstruccion
          open={pruebaAbrirFuente}
          setOpen={setPruebaAbrirFuente}
          instruccion={mecanismoVehiculoPago}
        />

        : tipoMecanismoVehiculoPago === "Mandato" && pruebaAbrirFuente === true ?
          <DetalleMandato
            open={pruebaAbrirFuente}
            setOpen={setPruebaAbrirFuente}
            mandato={mecanismoVehiculoPago}
          />
          : tipoMecanismoVehiculoPago === "Fideicomiso" && pruebaAbrirFuente === true ?

            <DetalleFideicomiso
              open={pruebaAbrirFuente}
              setOpen={setPruebaAbrirFuente}
              fideicomiso={mecanismoVehiculoPago}
            />
            : null
      }
    </Grid>
  );
}
