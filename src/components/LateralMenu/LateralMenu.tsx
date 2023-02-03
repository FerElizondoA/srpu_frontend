import logo from '../../assets/images/logo.svg';
import {
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export const text = {
  regular:{
    fontFamily: "MontserratRegular",
    fontSize: "1.0vw",
    color: "#000"
  },
  bold: {
    fontFamily: "MontserratBold",
    fontSize: "1.0vw",
  },
  italic: {
    fontFamily: "MontserratMedium",
    fontSize: "1.0vw",
    fontStyle: "oblique"
  },
  medium: {
    fontFamily: "MontserratMedium",
    fontSize: "1.0vw"
  },
  icon: {
    fontSize: "25px",
    color: "#000"
  }
};

export function LateralMenu(){
    return (
      <Grid container sx={{ boxShadow: 5, height: "100vh" }}>
        <Grid item container direction="column" spacing={1}>
          <Grid item sx={{ alignSelf: "center" }}>
            <img src={logo} style={{ height: "8vh" }}></img>
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
          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HomeOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PostAddOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Inscripción" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <PivotTableChartOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Reestructuración" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HighlightOffOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Cancelación" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item container>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoneyOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Mecanismos de pago" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <CampaignOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Tablero electrónico" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Configuración" />
              </ListItemButton>
            </ListItem>
          </Grid>

          <Grid item>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LockOutlinedIcon sx={text.icon}/>
                </ListItemIcon>
                <ListItemText primary="Cambiar Contraseña" />
              </ListItemButton>
            </ListItem>
          </Grid>
        </Grid>
      </Grid>
    );
};


/*

        <Grid item container xs={9} lg={10} direction='column'>
          <Grid item lg={1}>
            <header>Inicio</header>
          </Grid>
          <Grid item container lg={11} justifyContent="center">
            <img
              src={escudo}
              style={{ height: "50vh", backgroundColor: "#ff0" }}
            ></img>
          </Grid>
        </Grid>
*/

/*

            <Typography sx={{}}>
              Sistema del Presupuesto Basado en Resultados
            </Typography>

            <Avatar>M</Avatar>

            <Typography
              sx={{ backgroundColor: "#0ff", justifyContent: "center" }}
            >
              Marlon Israel
            </Typography>

            <Typography>Administrador</Typography>

            <Typography>Organismo</Typography>

            <Typography>Municipio Monterrey</Typography>
            <Divider />
*/
