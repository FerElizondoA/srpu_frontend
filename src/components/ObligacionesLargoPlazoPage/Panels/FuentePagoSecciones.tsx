import { Button, Grid, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { queries } from "../../../queries";
import { VehiculoDePago } from "./VehiculoDePago";
import { AsignarFuente } from "./AsignarFuente";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";

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

  const [openAgregarMandato, setOpenAgregarMandato] = useState(false);
  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);


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
          mandatario: catalogoOrganismos.filter(
            (v, index) => v.Descripcion === mecanismoVehiculoPago.Mandatario
          )[0],
          mandante: catalogoOrganismos.filter(
            (v, index) => v.Descripcion === mecanismoVehiculoPago.Mandante
          )[0],
        },
        auxArray,
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );

      setOpenAgregarMandato(!openAgregarMandato);
    } else {
      editarInstruccion(
        mecanismoVehiculoPago.Id,
        {
          numeroCuenta: mecanismoVehiculoPago.NumeroRegistro,
          cuentaCLABE: mecanismoVehiculoPago.CLABE,
          banco: mecanismoVehiculoPago.Banco,
          fechaInstruccion: new Date(mecanismoVehiculoPago.FechaRegistro),
        },
        auxArray,
        JSON.parse(mecanismoVehiculoPago.SoporteDocumental)
      );

      setOpenAgregarInstruccion(!openAgregarInstruccion);
    }
  };

  return (
    <Grid container direction="column">
      <Grid item width={"100%"} display={"flex"}>

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}
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

      {tabIndex === 0 && <VehiculoDePago />}
      {tabIndex === 1 && <AsignarFuente />}




    </Grid>
  );
}
