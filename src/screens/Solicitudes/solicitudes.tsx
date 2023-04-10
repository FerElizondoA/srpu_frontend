import { useEffect, useState } from "react";
import { Grid, Box, Radio, TextField } from "@mui/material";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { queries } from "../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import shadows from "@mui/material/styles/shadows";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { getPreviewSolicitud } from "./APIGetSolicitudes";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export function Solicitudes() {
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };
  // Llamada a la base de datos
  const [age, setAge] = useState("");
  const [solicitudes, setSolicitudes] = useState<Array<number>>([
    1, 2, 3, 4, 5, 6,
  ]);
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
    <Grid container direction="column">
      {/* grid  columna del encabezado */}

      <Grid>{query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}</Grid>

      {/* grid  columna del cuerpo */}
      <Grid  display={"flex"} flexDirection={"row"}
      >
        {/* grid  columna del previsualizacion y filtro*/}
        <Grid 
        sm={12}
        xl={3}
        xs={12}
        md={3}
        lg={3}

        display={"flex"} 
        flexDirection={"column"}>
          <Grid >
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

          <Grid flexDirection={"column"}>
            <List sx={{ overflow: "scroll" }}>
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
        <Grid
          flexDirection={"row"}
          item
          display={"flex"}
          justifyContent={"space-evenly"}
          mt={5}

          sm={12}
          xl={12}
          xs={12}
          md={12}
          lg={12}
        >
          {/* grid contenido*/}
          <Grid  item
           gridColumn={"span 4"}
            sm={12}
            xl={3}
            xs={12}
            md={3}
            lg={3}>
            <TextField fullWidth
              InputProps={{readOnly:true}}
              id="outlined-basic"
              label="Solicitado Por"
              variant="standard"
            ></TextField>
          </Grid>

          <Grid item
            gridColumn={"span 4"}
            sm={12}
            xl={3}
            xs={12}
            md={3}
            lg={3}
          >
            <TextField fullWidth
              InputProps={{readOnly:true}}
              id="outlined-basic"
              label="Solicitado Por"
              variant="standard"
            ></TextField>
          </Grid>

          <Grid item
           gridColumn={"span 5"}
            sm={12}
            xl={3}
            xs={12}
            md={3}
            lg={3}
          >
            <TextField fullWidth
              InputProps={{readOnly:true}}
              id="outlined-basic"
              label="Solicitado Por"
              variant="standard"
            ></TextField>
          </Grid>

          
          
        </Grid>

        
      </Grid>
    </Grid>
  );
}
