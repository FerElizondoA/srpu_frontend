import { useEffect, useState } from "react";
import { Grid, Box, TextField, Button } from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { getPreviewSolicitud } from "./APIGetSolicitudes";

import { queriesSolicitud } from "./queriesSolicitudes";

export function Solicitudes() {
  //Declaraciones
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };
  // Llamada a la base de datos
  const [age, setAge] = useState("");
  const [solicitudes, setSolicitudes] = useState<Array<number>>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  useEffect(() => {
    getPreviewSolicitud(setSolicitudes);
  }, []);
  useEffect(() => {
    if (solicitudes.length > 1) console.log(solicitudes);
  }, [solicitudes]);
  // Llamada a la base de datos

  return (
    <Grid container direction="column" >
      {/* grid  columna del encabezado */}
      <Grid>{query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}</Grid>


      {/* grid  columna del cuerpo */}
      <Grid display={"flex"} flexDirection={"row"} >
        

        {/* grid  columna del previsualizacion y filtro*/}
        <Grid sm={4} xl={4} xs={12} md={4} lg={4} mt={3} ml={2}>
          <Grid mb={4} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Filtrado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Filtrado"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid  md={12} sm={12} xl={12} lg={12} >
            <List sx={queriesSolicitud.buscador}>
              {solicitudes?.map(() => {
                return (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <Box>
                          <ListItemText primary="Nombre: " />
                          <ListItemText primary="Solicitante: " />
                          <ListItemText primary="Tipo de solicitud: " />
                          <ListItemText primary="Fecha: " />
                        </Box>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <Grid  xl={12} mt={2} height={"100%"}>
       
          <Grid
            container
            item
            mt={3}
            ml={5}
            sm={12}
            xl={12}
            xs={12}
            md={12}
            lg={12}
          >
            {/* grid contenido*/}
            <Grid item mr={5} sm={2} xl={3} xs={6} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Usuario"
                variant="standard"
                
              ></TextField>
            </Grid>

            <Grid item mr={5} sm={2} xl={3} xs={6} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Solicitado Por"
                
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item  sm={3} xl={4} xs={7} md={4} lg={4} sx={queriesSolicitud.calendaro}>
            <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Fecha de Creacion"
                variant="standard"
                
              ></TextField>
            </Grid>
          </Grid>
          <Grid
            item
            container
            mt={5}
            ml={5}
            sm={12}
            xl={12}
            xs={12}
            md={12}
            lg={12}
          >
            <Grid item mr={5} xs={8} sm={3} md={3} lg={3} xl={3} >
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Nombre(s)"
                variant="standard"
                
              ></TextField>
            </Grid>

            <Grid item mr={5} sm={2} xl={3} xs={8} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Apellido Paterno"
                variant="standard"
               
              ></TextField>
            </Grid>

            <Grid item mr={5} sm={2} xl={3} xs={8} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Apellido Materno"
                variant="standard"
                
              ></TextField>
            </Grid>
          </Grid>

          <Grid
            container
            item
            mt={5}
            ml={5}
            sm={12}
            xl={12}
            xs={12}
            md={12}
            lg={12}
          >
            {/* grid contenido*/}
            <Grid item mr={4} xl={2} md={2} sm={1.5}>
              <TextField
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Usuario"
                variant="standard"
                
              ></TextField>
            </Grid>

            <Grid item mr={4} sm={3} xl={2.5} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Correo Electronico"
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item mr={4} xl={2} md={2} sm={1.5}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Celular"
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={1.5} md={2} lg={2} xl={2.5}>
              <TextField
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Puesto"
                variant="standard"
              ></TextField>
            </Grid>
          </Grid>

          <Grid
            container
            item
            mt={5}
            ml={5}
            sm={12}
            xl={12}
            xs={12}
            md={12}
            lg={12}
          >
            {/* grid contenido*/}
            <Grid item mr={5} sm={2.5} xl={3} xs={8} md={3} lg={2.5}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="CURP"
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item mr={5} sm={2} xl={3} xs={8} md={2} lg={2.5}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="RFC"
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item mr={2} xl={1.5} sm={1.5} xs={8}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Telefono"
                variant="standard"
              ></TextField>
            </Grid>

            <Grid item  xl={1.5} md={1} sm={1} xs={8}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Extension"
                variant="standard"
                
              ></TextField>
            </Grid>
          </Grid>

      
          <Grid container item mt={5} ml={5}>
            <Grid item sm={8} xl={10} xs={8} md={10} lg={10}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Comentario"
                variant="filled"
                multiline
                rows={2}
                maxRows={3}
                
              ></TextField>
            </Grid>
          </Grid>
          

          <Grid item  mt={3} sx={queriesSolicitud.botones} >
            <Button
              sx={{  ml: 2, mr: 8 }}
              color="info"
              variant="contained"
              onClick={() => {}}
            >
              Aceptar
            </Button>
            <Button
              sx={{mr: 1.5 }}
              color="error"
              variant="contained"
              onClick={() => {}}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
