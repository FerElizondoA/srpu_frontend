import { 
    Grid,
    Tabs,
    Tab,
    Divider
 } from "@mui/material"

import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useEffect, useState } from "react";

import { CondicionesFinancieras } from "./Panels/CondicionesFinancieras";
import { Encabezado } from "./Panels/Encabezado";
import { InformacionGeneral } from "./Panels/InformacionGeneral";
import { SolicitudInscripcion } from "./Panels/SolicitudInscripcion";
import { Documentacion } from "./Panels/Documentacion";
import { queries } from "../../queries";
import { IEncabezado, IInformacionGeneral, ISolCortoPlazo } from "./Interfaces/CortoPlazo/IEncabezado";
import { getDestinos, getObligadoSolidarioAval } from "./APIS/APISInformacionGeneral";

export function ObligacionesCortoPlazoPage() {

  useEffect(() => {
   getDestinos();
   getObligadoSolidarioAval();
  }, [])
  

  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query ={
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)")
  } 



  const [encabezado,setEncabezado]=useState<IEncabezado>(
     { tipoDocumento: "",
      municipioOrganismo: "",
      tipoEntePublico: "",
      fechaSolicitud: "",
      solicitanteAutorizado: "",
      cargoSolicitante:"",
    }
  );

  const [informacionGeneral,setInformacionGeneral] = useState <IInformacionGeneral>(
    {
      fechaContratacion: "",
      fechaVencimiento: "",
      plazo: "",
      destino: "",
      montoOriginalContratado: "",
      Denominacion:"",
      InstitucionFinanciera:"",
    }
  );
  
  

  return (
    <Grid container direction="column">
      <Grid item>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Encabezado" sx={queries.text}/>
          <Divider orientation="vertical" flexItem />
          <Tab label="Información General" sx={queries.text}/>
          <Divider orientation="vertical" flexItem />
          <Tab label="Condiciones Financieras" sx={queries.text}/>
          <Divider orientation="vertical" flexItem />
          <Tab label="Documentación" sx={queries.text}></Tab>
          <Divider orientation="vertical" flexItem />
          <Tab label="Solicitud de Inscripción" sx={queries.text}/>
        </Tabs>
      </Grid>
      
      {tabIndex === 0 ?<Encabezado encabezado={encabezado} setEncabezado={setEncabezado}/>:null}
       {tabIndex === 2 && <InformacionGeneral />}   {/*informacionGeneral={informacionGeneral} setInformacionGeneral={asetInformacionGeneral}  */}
      {tabIndex === 4 && <CondicionesFinancieras />}
      {tabIndex === 6 && <Documentacion/>}
      {tabIndex === 8 && <SolicitudInscripcion />}
    </Grid>
  );
}