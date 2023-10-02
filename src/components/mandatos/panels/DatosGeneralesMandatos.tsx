import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { queries } from "../../../queries";
import { useState } from "react";
interface HeadSelect {
  label: string;
}

const CatalogoMecanismo: HeadSelect[] = [
  {
    label: "Fideicomiso",
  },
  {
    label: "Instrucciones irrevocable",
  },
  {
    label: "Mandato",
  },
];

export function DatosGeneralesMandatos() {
  const numeroMandato: string = useMandatoStore(
    (state) => state.numeroMandato
  );

  const changeNumeroMandato: Function = useMandatoStore(
    (state) => state.changeNumeroMandato
  );


  const [mecanismo, setMecanismo] = useState<any>("");
  const [municipioMandante, setMunicipioMandante] = useState<any>("");
  const [oranismoMandate, setOrganismoMandante] = useState<any>("");

  return (
    <Grid container
      width={"100%"}
      height={{ xs: "20rem", sm: "30rem" }}
      flexDirection={"column"}
      justifyContent={{ xs: "center", sm: "space-around" }}
    >
      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >
        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
           <InputLabel sx={queries.medium_text}>
            Numero de mandato
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            // label={"Numero de mandato"}
            // title={"Numero de mandato"}
            onChange={(v) => {
              changeNumeroMandato(v.target.value);
            }}
            value={numeroMandato}
          />
        </Grid>

        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Mecanismo o vehículo de pago
          </InputLabel>

          <FormControl fullWidth>
            <Select
              value={mecanismo}
              fullWidth
              variant="standard"
              onChange={(e) => {
                setMecanismo(e.target.value);
              }}
            >
              {CatalogoMecanismo.map((item, index) => (
                <MenuItem value={item.label} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Grid>
      </Grid >

      <Grid
        container
        display={"flex"}
        justifyContent={"space-evenly"}
        width={"100%"}
      >

        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Municipio Mandante
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            // label={"Municipio mandante"}
            // title={"Municipio mandante"}
            onChange={(v) => {
              setMunicipioMandante(v.target.value)
            }}
            value={municipioMandante}
          />
        </Grid>

        <Grid xs={10} sm={4} md={4} lg={4} xl={4}
          height={{ xs: "4rem", sm: "0rem" }}
        >
          <InputLabel sx={queries.medium_text}>
            Organismo Mandante
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            // label={"Organismo mandante"}
            // title={"Organismo mandante"}
            onChange={(v) => {
              setOrganismoMandante(v.target.value)
            }}
            value={oranismoMandate}
          />
        </Grid>
      </Grid>

    </Grid>
  );
}
