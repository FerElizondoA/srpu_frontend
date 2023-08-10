import { Grid, Typography } from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// export const modulos = [
//   { id: 0, label: "Claves de inscripción" },
//   { id: 1, label: "Destinos" },
//   { id: 2, label: "Días del ejercicio" },
//   { id: 3, label: "Entes público obligados" },
//   // { id: 4, label: "Estatus" },
//   { id: 5, label: "Fuentes de pago" },
//   { id: 6, label: "Fuentes alternas de Pago" },
//   { id: 7, label: "Instituciones financieras" },
//   { id: 8, label: "Obligados solidarios / avales" },
//   { id: 9, label: "Periodicidad del pago" },
//   { id: 10, label: "Reglas de financiamiento" },
//   { id: 11, label: "Tasas de referencia" },
//   { id: 12, label: "Tipos de comisión" },
//   { id: 13, label: "Tipos de Documento" },
//   { id: 14, label: "Tipos de Ente Público" },
//   // { id: 15, label: "Usuarios" },
// ];

export const modulos = [
  {
    label: "Claves de Inscripción",
    fnc: "claveDeInscripcion",
  },
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
    label: "Entes Público Obligados",//SI
    fnc: "entePublicoObligado",
  },
  // {
  //   label: "Estatus",
  //   fnc: "estatus",
  // },
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
  {
    label: "Obligados Solidarios / Avales",
    fnc: "obligadoSolidarioAval",
  },
  {
    label: "Periodicidad del Pago",
    fnc: "periodicidadDePago",
  },
  {
    label: "Reglas de Financiamiento",//SI
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
    label: "Tipos de Documento",//SI
    fnc: "tiposDocumento",
  },
  {
    label: "Tipos de Ente Público",
    fnc: "tiposEntePublico",
  },
  //Fideicomisos -- Datos generales
  {
    label: "Tipo de Fideicomiso",
    fnc: "tiposDeFideicomiso",
  },
  {
    label: "Fiduciario",
    fnc: "fiudiciarios",
  },
  {
    label: "Fideicomisario",
    fnc: "fideicomisarios",
  },
  {
    label: "Orden Fideicomisario",
    fnc: "ordenesFideicomisario",
  },

  //Fideicomisos --Tipo de movimiento

  {
    label: "Tipo de Fideicomitente",
    fnc: "tiposDeFideicomitente",
  },
  {
    label: "Tipo de Fuente",
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
    label : "Usuarios",
    fnc: "Usuarios",
  }

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
      container
      direction="column"
      alignItems={"center"}
      sx={{ height: "100vh" }}
    >
      <Grid item width={"100%"}>
        <LateralMenu />
      </Grid>

      <Grid>
        <Typography sx={{
          height: "4rem",
          display:"flex",
          alignItems:"center",
          fontSize: "2.5ch",
          fontFamily: "MontserratBold",
          color: "#AF8C55",
          "@media (max-width: 600px)": {
            // XS (extra small) screen
            fontSize: "1rem",
          },
          "@media (min-width: 601px) and (max-width: 900px)": {
            // SM (small) screen
            fontSize: "1.5ch",
          },
        }}>
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
          sx={{
            width: "70%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
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
                  width: "80%",
                  height: "65%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  boxShadow: 1,
                }}
                onClick={() => {
                  navegar(index, item.label);
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
