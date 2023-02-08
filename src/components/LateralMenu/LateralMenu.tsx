import * as React from "react"
import logo from '../../assets/images/logo.svg';
import {
  Grid,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";

// icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import PivotTableChartOutlinedIcon from '@mui/icons-material/PivotTableChartOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const text = {
  regular:{
    fontFamily: "MontserratRegular",
    fontSize: "1.2vw",
    color: "#000"
  },
  bold: {
    fontFamily: "MontserratBold",
    fontSize: "1.2vw",
  },
  italic: {
    fontFamily: "MontserratMedium",
    fontSize: "1.2vw",
    fontStyle: "oblique"
  },
  medium: {
    fontFamily: "MontserratMedium",
    fontSize: "1.2vw"
  },
  icon: {
    fontSize: "25px",
    color: "#000"
  },
  button: {
    fontFamily: "MontserratRegular",
    fontSize: "1.2vw"
  },
};

export function LateralMenu(){
  const [openInscripcion, setOpenInscripcion] = React.useState(true);
  const [openFinanciamiento, setOpenFinanciamiento] = React.useState(true);

  const handleInscripcionClick = () => {
    setOpenInscripcion(!openInscripcion);
  };

  const handleFinanciamientoClick = () => {
    setOpenFinanciamiento(!openFinanciamiento);
  };

  return (
    <Grid container sx={{ boxShadow: 5, height: "100vh", overflow: "auto"}}>
      <Grid item container direction="column" spacing={1.5}>
        <Grid item sx={{ alignSelf: "center" }} mt={2}>
          <img src={logo} style={{ height: "50px" }}></img>
        </Grid>
        <Grid item sx={{ alignSelf: "center" }}>
          <Avatar sx={{ height: "10vh", width: "10vh" }}>M</Avatar>
        </Grid>
        <Grid item sx={{ alignSelf: "center" }}>
          <Typography sx={text.bold}>Marlon Israel</Typography>
        </Grid>
        <Grid item sx={{ alignSelf: "center" }}>
          <Typography sx={text.italic}>Administrador</Typography>
        </Grid>
        <Grid item sx={{ alignSelf: "center" }}>
          <Typography sx={text.medium}>Organismo</Typography>
        </Grid>
        <Grid item sx={{ alignSelf: "center" }}>
          <Typography sx={text.regular}>Municipio Monterrey</Typography>
        </Grid>
      </Grid>

      <Grid item container direction="column">
        <List>
          <ListItemButton>
            <ListItemIcon>
              <HomeOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Inicio</Typography>
          </ListItemButton>

          <ListItemButton onClick={handleInscripcionClick}>
            <ListItemIcon>
              <PostAddOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Inscripción</Typography>
            {openInscripcion ? <ExpandMore /> : <ExpandLess />}
          </ListItemButton>

          <Collapse in={openInscripcion} timeout="auto" unmountOnExit>
            <List>
              <ListItemButton
                sx={{ marginLeft: 2 }}
                onClick={handleFinanciamientoClick}
              >
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon sx={text.icon} />
                </ListItemIcon>
                <Typography sx={text.button}>
                  Financiamiento y Obligaciones
                </Typography>
                {openFinanciamiento ? <ExpandMore /> : <ExpandLess />}
              </ListItemButton>
              <Collapse in={openFinanciamiento} timeout="auto" unmountOnExit>
                <List>
                  <ListItemButton sx={{ marginLeft: 4 }}>
                    <ListItemIcon>
                      <KeyboardArrowRightIcon sx={text.icon} />
                    </ListItemIcon>
                    <Typography sx={text.button}>
                      Obligaciones a Corto Plazo
                    </Typography>
                  </ListItemButton>

                  <ListItemButton sx={{ marginLeft: 4 }}>
                    <ListItemIcon>
                      <KeyboardArrowRightIcon sx={text.icon} />
                    </ListItemIcon>
                    <Typography sx={text.button}>Credito Simple</Typography>
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton sx={{ marginLeft: 2 }}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon sx={text.icon} />
                </ListItemIcon>
                <Typography sx={text.button}>
                  Consulta de solicitudes
                </Typography>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon>
              <PivotTableChartOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Reestructuración</Typography>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HighlightOffOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Cancelación</Typography>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AttachMoneyOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Mecanismos de pago</Typography>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CampaignOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Tablero electrónico</Typography>
          </ListItemButton>
        </List>
      </Grid>

      <Grid item container direction="column">
        <List>
          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Configuración</Typography>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <LockOutlinedIcon sx={text.icon} />
            </ListItemIcon>
            <Typography sx={text.button}>Cambiar Contraseña</Typography>
          </ListItemButton>
        </List>
      </Grid>
    </Grid>
  );
};
