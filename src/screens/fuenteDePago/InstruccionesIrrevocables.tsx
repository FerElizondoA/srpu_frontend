import { Button, Grid, IconButton, InputBase, Paper, Slide, Table, TableBody, TableContainer, TableHead, TableRow, Typography, createTheme, useMediaQuery } from "@mui/material";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { GridSearchIcon } from "@mui/x-data-grid";
import { queries } from "../../queries";
import { StyledTableCell, StyledTableRow } from "../../components/CustomComponents";
import { AgregarInstruccionesIrrevocables } from "../../components/instruccionesIrrevocables/dialog/AgregarInstruccionesIrrevocables.tsx";
import { useLargoPlazoStore } from "../../store/CreditoLargoPlazo/main";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { useCortoPlazoStore } from "../../store/CreditoCortoPlazo/main";

const Transition = forwardRef(function Transition(
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

const heads: Head[] = [
  {
    label: "Tipo de mecanismo de pago",
  },
  {
    label: "Numero de cuenta",
  },
  {
    label: "Cuenta CLABE",
  },
  {
    label: "Fecha",
  },
  {
    label: "Entidad Federativa",
  },
  {
    label: "Fondo o ingreso",
  },
  // {
  //   label: "Banco",
  // },
  {
    label: "Municipio",
  },
  {
    label: "Acciones",
  },
];

export function InstruccionesIrrevocables() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const [busqueda, setBusqueda] = useState("");
  const [accion, setAccion] = useState("Agregar");

  const [openAgregarInstruccion, setOpenAgregarInstruccion] = useState(false);

  const handleChange = (dato: string) => {
    setBusqueda(dato);
  };

  const handleSearch = () => {
    // filtrarDatos();
  };

 


  //CATALOGOS
  const catalogoTiposDeFuente: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos : Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const catalogoTipoEntePublicoObligado : Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoInstituciones : Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const catalogoMunicipiosUOrganismos : Array <ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoMunicipiosUOrganismos
  );





  return (
    <Grid direction={"column"} height={"75vh"}>

    <Grid item>
      {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
    </Grid>

    <Grid display={"flex"} justifyContent={"center"} width={"97%"} height={"4rem"} alignItems={"center"} >
      <Typography sx={{
        fontSize: "2.3ch",
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
        Instrucciones Irrevocables
      </Typography>
    </Grid>

    <Grid  display="center" justifyContent="space-between" height={"4rem"}>
      <Grid width={"80%"} height={"75%"} display={"flex"} justifyContent={"end"}>
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
              handleChange(e.target.value);
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
          sx={{ ...queries.buttonContinuar,
            height:"75%" }}
          onClick={() => {
            setAccion("Agregar");
            setOpenAgregarInstruccion(!openAgregarInstruccion);
          }}
        >
          Agregar
        </Button>
      </Grid>
    </Grid>

    <Paper sx={{width:"100%"}}>
      <Grid container sx={{...queries.tablaAgregarFuentesPago,
       width:"100%",
       display:"flex",
       justifyContent:"center"
      }} >
        <TableContainer sx={{
          width:"98%",
          
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

        }}>
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
           
              <StyledTableRow>
                
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Paper>

    <AgregarInstruccionesIrrevocables
       handler={setOpenAgregarInstruccion}
       openState={openAgregarInstruccion}
       accion={accion}
    />
  </Grid>
  );
}
