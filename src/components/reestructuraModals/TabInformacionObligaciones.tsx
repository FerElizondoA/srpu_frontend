import React, { useEffect, useState } from "react";
import {
  Box,
  Alert,
  Grid,
  List,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Button,
  AlertColor,
  DialogActions,
  Typography,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  FormControlLabel,
  Radio,
  Checkbox,
  ListItem,
} from "@mui/material";

export default function TabInformacionGeneral() {
  return (
    <Grid
      xs={10}
      lg={10}
      md={10}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <List>
        <ListItem
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "15%" }}
            id="outlined-basic"
            label="Fecha de contratacion"
            variant="outlined"
          />
          <TextField
            sx={{ width: "15%" }}
            id="outlined-basic"
            label="Plazo (días)"
            variant="outlined"
          />
          <TextField
            sx={{ width: "15%" }}
            id="outlined-basic"
            label="Plazo (meses)"
            variant="outlined"
          />
          <TextField
            sx={{ width: "15%" }}
            id="outlined-basic"
            label="Monto Original Contratado"
            variant="outlined"
          />
          <TextField
            sx={{ width: "15%" }}
            id="outlined-basic"
            label="Periodo de Administracion (Meses)"
            variant="outlined"
          />
        </ListItem>

        <ListItem
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "20%" }}
            id="outlined-basic"
            label="Fecha de Vencimineto"
            variant="outlined"
          />
          <TextField
            sx={{ width: "20%" }}
            id="outlined-basic"
            label="Destino"
            variant="outlined"
          />
          <TextField
            sx={{ width: "20%" }}
            id="outlined-basic"
            label="Denominación"
            variant="outlined"
          />
          <TextField
            sx={{ width: "20%" }}
            id="outlined-basic"
            label="Periodo de Financiamiento (Meses)"
            variant="outlined"
          />
        </ListItem>
      </List>
    </Grid>
  );
}
