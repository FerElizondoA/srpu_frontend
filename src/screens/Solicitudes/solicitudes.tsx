import { useEffect, useState } from "react";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";
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
import { getDetailSolicitudUsuario, getPreviewSolicitud } from "./APIGetSolicitudes";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { queriesSolicitud } from "./queriesSolicitudes";
import { IDetailSolicitudUsuario, ISolicitudes } from "./ISoliciudes";
import { isTemplateExpression } from "typescript";
import { log } from "console";

export function Solicitudes() {
  //Declaraciones
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };
  // Llamada a la base de datos
  const [filtro, setFiltro] = useState<number>(4);
  const [solicitudes, setSolicitudes] = useState<Array<ISolicitudes>>([]);
  const [solicitudesFiltered, setSolicitudesFiltered] = useState<Array<ISolicitudes>>([]);
  const [detailSolicitud, setDetailSolicitud] = useState<IDetailSolicitudUsuario>();

  const getEstatus=(estatus:number)=>{
    switch(estatus){
      case 0:return   'PENDIENTE';
      case 1:return   'ACEPTADO';
      case 2:return   'RECHAZADO';
      case 3:return   'MODIFICACION';
      default:return  'DESCONOCIDO';
    }
  }

  const  filtros=[
    {id:4,label:'TODAS LAS SOLICITUDES'},
    {id:1,label:'ACEPTADAS'},
    {id:2,label:'RECHAZADAS'},
    {id:0,label:'PENDIENTES'},
    {id:3,label:'MODIFICACION'},
  ]

  const FiltraSolicitudes=(id:number)=>{
    if(id===4)
    {setSolicitudesFiltered(solicitudes);}
    else{
      // eslint-disable-next-line array-callback-return
    let aux=solicitudes.filter((item)=>item.Estatus===id)
    setSolicitudesFiltered(aux)
    }
    ;
  }

  //const elmento Seleccionado
  const[indexSelect,setIndexSelect]=useState(-1);

  const prevSolicitud = ()=>{
    if(indexSelect!==0)
    setIndexSelect(indexSelect-1);
  }
  const nextSolicitud = ()=>{
    if(indexSelect<solicitudesFiltered.length-1)
    setIndexSelect(indexSelect+1);
  }

  useEffect(() => {
    if(indexSelect>=0)
    getDetailSolicitudUsuario(solicitudesFiltered[indexSelect].Id,setDetailSolicitud)
  }, [indexSelect])
  

  useEffect(() => {
    getPreviewSolicitud(setSolicitudes);
  }, []);

  useEffect(() => {
    setSolicitudesFiltered(solicitudes);
  }, [solicitudes]);

  

  // Llamada a la base de datos
  return (
    <Grid container direction="column" >
      {/* grid  columna del encabezado */}
      <Grid>{query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}</Grid>


      {/* grid  columna del cuerpo */}
      <Grid display={"flex"} flexDirection={"row"} >
        

        {/* grid  columna del previsualizacion y filtro*/}
        <Grid sm={4} xl={3.5} xs={12} md={4} lg={4} mt={3} ml={2}>
          <Grid mb={4} sm={12}>
            <FormControl fullWidth>
              <InputLabel>Filtrado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filtro}
                label="Filtrado"
                onChange={(v)=>{
                 
                  setIndexSelect(-4)
                  setFiltro(parseInt(v.target.value.toString()))
                  FiltraSolicitudes(parseInt(v.target.value.toString()));
                }}
              >
              
              {filtros.map((item)=>{
                return(
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                )
              })}
                
              </Select>
            </FormControl>
          </Grid>

          <Grid  md={12} sm={12} xl={12} lg={12} >
            <List sx={queriesSolicitud.buscador}>
              {solicitudesFiltered?.map((dato,index) => {
                return (
                  <>
                    <ListItem disablePadding key={index}>
                      <ListItemButton 
                      sx={{border:index===indexSelect?'2px solid' :null, ":hover":{backgroundColor:'none'}}}
                      onClick={()=>{
                        getDetailSolicitudUsuario(dato.Id,setDetailSolicitud);
                        setIndexSelect(index);
                        
                        }}>
                        <Box  sx={{width:'100%',height:'12vh',flexDirection:'column',justifyContent:'space-evenly',display:'flex'}}>

                          <Box sx={{display:'flex',justifyContent:'space-between'}}>
                            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                              <Typography padding={"1px 4px 1px 0"} fontSize={"14px"} fontWeight={"bold"} color={index===indexSelect?'#af8c55 ':'black'}>USUARIO: </Typography>
                              <Typography fontSize={"14px"} color={index===indexSelect?'#af8c55 ':'black'}>{dato.NombreUsuario.toUpperCase()}</Typography>
                            
                            </Box >
                            <Box   sx={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                            <Typography padding={"1px 4px 1px 0"} fontSize={"14px"} fontWeight={"bold"} color={index===indexSelect?'#af8c55 ':'black'}>FECHA: </Typography>
                              <Typography fontSize={"14px"}  color={index===indexSelect?'#af8c55 ':'black'}>{dato.FechaDeCreacion.toUpperCase()}</Typography>
                             
                            </Box>
                          </Box>

                          <Box sx={{display:'flex',justifyContent:'space-between'}}>
                            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                            <Typography padding={"1px 4px 1px 0"} fontSize={"14px"} fontWeight={"bold"} color={index===indexSelect?'#af8c55 ':'black'}>TIPO : </Typography>
                              <Typography fontSize={"14px"}  color={index===indexSelect?'#af8c55 ':'black'}>{dato.tipoSoli.toUpperCase()}</Typography>
                             
                            </Box>
                            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
                            <Typography padding={"1px 4px 1px 0"} fontSize={"14px"} fontWeight={"bold"} color={index===indexSelect?'#af8c55 ':'black'}>ESTATUS: </Typography>
                              <Typography fontSize={"14px"}  color={index===indexSelect?'#af8c55 ':'black'}>{getEstatus(dato.Estatus)}</Typography>
                              
                            </Box>
                          </Box>

                           

                          <Box sx={{display:'flex',flexDirection:'row',alignItems:"center"}}>
                              <Typography padding={"1px 5px 1px 0"} fontSize={"14px"} fontWeight={"bold"} color={index===indexSelect?'#af8c55 ':'black'}>SOLICITANTE: </Typography>
                              <Typography fontSize={"14px"}  color={index===indexSelect?'#af8c55 ':'black'}>{dato.NombreSolicitante.toUpperCase()}</Typography>
                            
                          </Box>
                      
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


        {/* grid Formulario*/}
        <Grid sx={{display:"flex" ,flexDirection:"column"}}  xl={9} mt={2} >
        <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
          <Grid
            container
            item
            mt={3}
            sm={11}
            xl={11}
            xs={11}
            md={11}
            lg={11}
            justifyContent={"space-between"}
          >
            {/* grid contenido*/}
           
            
            <Grid item  sm={2} xl={3.3} xs={6} md={3} lg={3}>
              <TextField
              
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Solicitado Por"
                variant="standard"
                value={detailSolicitud?.NombreSolicitante|| ''}
             />
            </Grid>

            <Grid item  sm={3} xl={3} xs={7} md={4} lg={4}>
            <TextField
                
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Fecha de Creacion"
                variant="standard"
                value={detailSolicitud?.FechaDeCreacion.split('T')[0] || ''}
             />
            </Grid>
          </Grid>

        </Box>
         
          <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
            <Grid
            item
            container
            mt={10}
            sm={12}
            xl={11}
            xs={12}
            md={12}
            lg={12}
            justifyContent={"space-between"}
          >
            <Grid item  xs={8} sm={3} md={3} lg={3} xl={3} >
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Nombre(s)"
                variant="standard"
                value={detailSolicitud?.Nombre|| ''}
                
             />
            </Grid>

            <Grid item sm={2} xl={3} xs={8} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Apellido Paterno"
                variant="standard"
                value={detailSolicitud?.ApellidoPaterno|| ''}
               
             />
            </Grid>

            <Grid item  sm={2} xl={3} xs={8} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Apellido Materno"
                variant="standard"
                value={detailSolicitud?.ApellidoMaterno|| ''}
                
             />
            </Grid>
          </Grid>


          </Box>

          <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
            <Grid
            container
            item
            mt={10}
            justifyContent={"space-between"}
            sm={12}
            xl={11}
            xs={12}
            md={12}
            lg={12}
          >
            {/* grid contenido*/}
            <Grid item xl={2} md={2} sm={1.5}>
              <TextField
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Usuario"
                variant="standard"
                value={detailSolicitud?.NombreUsuario|| ''}
             />
            </Grid>

            <Grid item  sm={3} xl={2} md={3} lg={3}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Correo Electronico"
                variant="standard"
                value={detailSolicitud?.CorreoElectronico|| ''}
             />
            </Grid>

            <Grid item  xl={2} md={2} sm={2}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Celular"
                variant="standard"
                value={detailSolicitud?.Celular|| ''}
             />
            </Grid>

            <Grid item xs={12} sm={2} md={2} lg={2} xl={1.5}>
              <TextField
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Puesto"
                variant="standard"
                value={detailSolicitud?.Puesto || ''}
             />
            </Grid>
          </Grid>
          </Box>

          <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
             <Grid
            container
            item
            mt={10}
            justifyContent={"space-around"}
            sm={12}
            xl={12}
            xs={12}
            md={12}
            lg={12}
          >
            {/* grid contenido*/}
            <Grid item  sm={2.5} xl={2} xs={8} md={3} lg={2}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="CURP"
                variant="standard"
                value={detailSolicitud?.Curp|| ''}
             />
            </Grid>

            <Grid item sm={2} xl={2} xs={8} md={2} lg={2}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="RFC"
                variant="standard"
                value={detailSolicitud?.Rfc|| ''}
             />
            </Grid>

            <Grid item  xl={2} sm={1.5} xs={8}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Telefono"
                variant="standard"
                value={detailSolicitud?.Telefono|| ''}
             />
              
            </Grid>

            <Grid item  xl={2} md={1} sm={1} xs={8}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Extension"
                variant="standard"
                value={detailSolicitud?.Ext|| ''}
             />
            </Grid>
          </Grid>
          </Box>


         

      
          <Grid   
           container
           item
           mt={5}
           justifyContent={"space-evenly"}
           sm={12}
           xl={12}
           xs={12}
           md={12}
           lg={12}
          >
            {/* <Grid item justifyContent={"space-between"} sm={8} xl={10} xs={8} md={10} lg={10}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                id="outlined-basic"
                label="Comentario"
                variant="standard"
                multiline
                rows={2}
                maxRows={3}
             />
            </Grid> */}
          </Grid>
          

          <Grid item display={"flex"} justifyContent={"space-evenly"} mt={3} >
            <Button
              color="primary"
              variant="contained"
              onClick={() => { prevSolicitud()}}
              endIcon={<ArrowBackIosNewOutlinedIcon />}
              
            >
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {nextSolicitud()}}
              endIcon={<ArrowForwardIosOutlinedIcon />}
            >
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
}
