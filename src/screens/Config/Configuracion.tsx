import { Grid, Typography } from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { queries } from "../../queries";

export const modulos = [
  {
    label: "Destinos",
    fnc: "destinos",
  },
  {
    label: "Detalle de la Inversión",
    fnc: "detalleInversion",
  },
  {
    label: "Días del Ejercicio",
    fnc: "diasDelEjercicio",
  },
  {
    label: "Fuentes de Pago",
    fnc: "fuenteDePago",
  },
  {
    label: "Fuentes Alternas de Pago",
    fnc: "fuenteAlternaDePago",
  },
  {
    label: "Instituciones Financieras",
    fnc: "institucionesFinancieras",
  },
  { label: "Mandatarios", fnc: "mandatario" },
  {
    label: "Obligados Solidarios / Avales",
    fnc: "obligadoSolidarioAval",
  },
  {
    label: "Periodicidad del Pago",
    fnc: "periodicidadDePago",
  },
  {
    label: "Reglas de Financiamiento", //SI
    fnc: "reglaDeFinanciamiento",
  },
  {
    label: "Tasas de Referencia",
    fnc: "tasaDeReferencia",
  },
  {
    label: "Tipos de Comisión",
    fnc: "tipoDeComision",
  },
  {
    label: "Tipos de Documento", //SI
    fnc: "tiposDocumento",
  },
  {
    label: "Tipos de Garantía de Pago",
    fnc: "tiposDeGarantiaDePago",
  },
  //Fideicomisos -- Datos generales
  {
    label: "Tipos de Fideicomiso",
    fnc: "tiposDeFideicomiso",
  },
  {
    label: "Fiduciarios",
    fnc: "fiduciarios",
  },
  {
    label: "Fideicomisarios",
    fnc: "fideicomisarios",
  },
  {
    label: "Orden Fideicomisarios",
    fnc: "ordenesFideicomisario",
  },
  //Fideicomisos --Tipo de movimiento
  {
    label: "Tipos de Fideicomitente",
    fnc: "tiposDeFideicomitente",
  },
  {
    label: "Tipos de Fuente",
    fnc: "tiposDeFuente",
  },
  {
    label: "Fondo o Ingreso",
    fnc: "fondosOIngresos",
  },
  //Autorizacion
  {
    label: "Medio de Publicación",
    fnc: "mediosDePublicacion",
  },
  {
    label: "Destino Autorizado",
    fnc: "destinosAutorizados",
  },
  {
    label: "Destalle del Destino Autorizado",
    fnc: "detalleDestinosAutorizados",
  },
  {
    label: "Clasificación",
    fnc: "clasificacionAsignarFuentePago",
  },
  {
    label: "Respecto a",
    fnc: "respecto",
  },
  {
    label: "Configuración de oficios",
    fnc: "configuracionOficios",
  },
  {
    label: "Tipos de Beneficiarios",
    fnc: "tipoBeneficiario",
  },
  {
    label: "Usuarios",
    fnc: "Usuarios",
  },
];

export function Configuracion() {
  const navigate = useNavigate();

  const navegar = (id: number, label: string) => {
    if (label === "Usuarios") {
      navigate("../users");
    } else {
      navigate(`../catalogos?id=${id}&label=${label}`);
    }
  };
  return (
    <Grid
      width={"100%"}
      container
      direction="column"
      alignItems={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid>
        <Typography
          sx={{
            height: "4rem",
            display: "flex",
            alignItems: "center",
            fontSize: "2.5ch",
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
          Configuración
        </Typography>
      </Grid>

      <Grid
        width={"100%"}
        height={"70vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid
          item
          gridTemplateColumns={{
            xs: "repeat(3,1fr)",
            sm: "repeat(5,1fr)",
            md: "repeat(5,1fr)",
            lg: "repeat(5,1fr)",
            xl: "repeat(5,1fr)",
          }}
          width={{
            xs: "100%",
            sm: "100%",
            md: "80%",
            lg: "70%",
            xl: "70%",
          }}
          sx={{
            height: "100%",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          {modulos.map((item, index) => {
            return (
              <Button
                key={index}
                sx={{
                  ...queries.modulosConfig,
                }}
                onClick={() => {
                  navegar(index, item.label);
                }}
              >
                <></>
                {item.label}
              </Button>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
