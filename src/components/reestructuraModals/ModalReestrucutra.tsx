import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  List,
  TextField,
  ListItem,
  Tab,
  Tabs,
} from "@mui/material";
import TabInformacionGeneral from "../reestructuraModals/TabInformacionObligaciones"
//import { Box } from "@mui/system";

export default function ModalReestructura({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: Function;
}) {

  const [TabSelect, setTablSelect] = useState(10);

  const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [valueTabs, setValueTabs] = useState(10);
  const handleChangeTabs = (event: any, newValue: number) => {
    setValueTabs(newValue);
  };

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={() => handleClose()}>

      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <Grid

          xs={12}
          lg={12}
          md={12}
          sx={{
            display: "flex",
            width: "100%",
            height: "90vh",
            boxShadow: 10,
            borderRadius: 5,
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          <List>
            
              <Typography
                sx={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#a4ac9d",
                  alignItems: "center",
                  borderRadius: "7px 7px 0 0",
                }}
              >
                Obligacion inscrita
              </Typography>

              <ListItem
                sx={{
                  width: "100%",
                  height: "66%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ width: "17%" }}
                  label={"Clave de inscripción"}
                />
                <TextField sx={{ width: "17%" }} label={"Tipo de documento"} />
                <TextField sx={{ width: "17%" }} label={"Entidad federativa"} />
                <TextField
                  sx={{ width: "17%" }}
                  label={"Tipo de ente público obligado"}
                />
                <TextField
                  sx={{ width: "17%" }}
                  label={"fecha de inscripción"}
                />
              </ListItem>

              <Typography
                sx={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#a4ac9d",
                  alignItems: "center",
             
                }}
              >
                Crédito simple
              </Typography>

                <ListItem  sx={{
                  width: "100%",
                  height: "66%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#",
                  alignItems: "center",
                }}>
                <Tabs
                    value={value}
                    onChange={handleChangeTabs}
                    textColor="inherit"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "0 0 10px 10px",
                      //boxShadow: 20,
                      alignItems: 'center',
                      justifyItems: 'center'
                    }}
                  >
                    <Tab
                      label="Información General"
                      value={10}
                      sx={{
                        borderRight: "5px solid #b3afaf",
                        color: "black",
                        fontFamily: "MontserratBold",
                        backgroundColor: "#ccc",
                      }}
                    />
                    <Tab
                      label="Autorización de la legislatura local"
                      value={20}
                      sx={{
                        borderRight: "5px solid #b3afaf",
                        color: "black",
                        fontFamily: "MontserratBold",
                        backgroundColor: "#ccc",
                      }}
                    />
                    <Tab
                      label="Fuente de Pago"
                      value={30}
                      sx={{
                        borderRight: "5px solid #b3afaf",
                        color: "black",
                        fontFamily: "MontserratBold",
                        backgroundColor: "#ccc",
                      }}
                    />
                    <Tab
                      label="Condiciones Financieras"
                      value={40}
                      sx={{
                        borderRight: "5px solid #b3afaf",
                        color: "black",
                        fontFamily: "MontserratBold",
                        backgroundColor: "#ccc",
                      }}
                    />
                    <Tab
                      label="Tabla de pagos"
                      value={50}
                      sx={{
                        //borderRight: "5px solid #b3afaf",
                        color: "black",
                        fontFamily: "MontserratBold",
                        backgroundColor: "#ccc",
                      }}
                    />
                  </Tabs>
                 
                  
                </ListItem>
                <Grid sx={{
                  width: "100%",
                  height: "66%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: "#",
                  alignItems: "center",
                }} >
                {valueTabs===10?<TabInformacionGeneral></TabInformacionGeneral>:null}
                </Grid>
                
                
              
              


         
          </List>
        </Grid>
      </DialogContent>

    </Dialog>
  );
}
