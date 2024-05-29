import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Dialog,
  DialogContent,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import TabInformacionGeneral from "./TabInformacionObligaciones";

//import { Box } from "@mui/system";

export default function ModalReestructura({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: Function;
}) {
  const [TabSelect, setTablSelect] = useState(10);

  const [value, setValue] = React.useState("female");

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
        <Grid container>
          <Grid
            container
            direction="row"
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 2 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
            sm={5}
            md={10.5}
            lg={11.3}
            xl={11}
          >
            <Divider
              sx={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#AF8C55",
                alignItems: "center",
              }}
            >
              <Chip label="Obligacion inscrita" />
            </Divider>

            <Grid
              item
              mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
              ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
              sm={5}
              md={2.5}
              lg={2}
              xl={1.8}
            >
              <TextField
                sx={{ width: "100%" }}
                label={"Clave de inscripción"}
              />
            </Grid>

            <Grid
              item
              mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
              ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
              sm={5}
              md={2.5}
              lg={2}
              xl={1.8}
            >
              <TextField sx={{ width: "100%" }} label={"Tipo de documento"} />
            </Grid>

            <Grid
              item
              mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
              ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
              sm={5}
              md={2.5}
              lg={5.5}
              xl={1.8}
            >
              <TextField sx={{ width: "100%" }} label={"Entidad federativa"} />
            </Grid>

            <Grid
              item
              mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
              ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
              sm={5}
              md={2.5}
              lg={2}
              xl={1.8}
            >
              <TextField
                sx={{ width: "100%" }}
                label={"Tipo de Ente Público Obligado"}
              />
            </Grid>
            <Grid
              item
              mt={{ sm: 2, md: 2, lg: 4, xl: 3 }}
              ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
              sm={5}
              md={2.5}
              lg={2}
              xl={1.8}
              sx={{ height: "10%" }}
            >
              <TextField
                sx={{ width: "100%" }}
                label={"fecha de inscripción"}
              />
            </Grid>
          </Grid>
          ///////////////////////////////////////
          <Grid
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 2 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
            sm={5}
            md={10.5}
            lg={11}
            xl={11}
            sx={{ height: "10%" }}
          >
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
          </Grid>
          <Grid
            direction="column"
            item
            mt={{ sm: 2, md: 2, lg: 4, xl: 0 }}
            ml={{ sm: 4, md: 9, lg: 10, xl: 8 }}
            sm={5}
            md={4}
            lg={11.3}
            xl={11}
            sx={{ height: "10%" }}
          >
            <Tabs
              value={value}
              onChange={handleChangeTabs}
              textColor="inherit"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "0 0 10px 10px",
                //boxShadow: 20,
                alignItems: "center",
                justifyItems: "center",
                width: "100%",
                display: "grid",
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
                  height: "8vh",
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
                  height: "8vh",
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
                  height: "8vh",
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
                  height: "8vh",
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
                  height: "8vh",
                }}
              />
            </Tabs>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              height: "66%",
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#",
              alignItems: "center",
            }}
          >
            {valueTabs === 10 ? (
              <TabInformacionGeneral></TabInformacionGeneral>
            ) : null}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
