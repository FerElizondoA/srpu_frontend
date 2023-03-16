import {
  Grid,
  Checkbox,
  Divider,
  TextField,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import { queries } from "../../../queries";

import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { ConfirmButton, DeleteButton, StyledTableCell, StyledTableRow } from "../../CustomComponents";

interface Data {
  isSelected: boolean,
  firstPaymentDate: Date,
  fixedRate: number,
  paymentRange: string,
  referenceRate: number,
  overRate: number,
  amountOfDays: number
}

interface Head {
    id: keyof Data;
    isNumeric: boolean;
    label: string;
}

const heads: readonly Head[] = [
    {
        id: 'isSelected',
        isNumeric: false,
        label: "Selección"
    },
    {
        id: 'firstPaymentDate',
        isNumeric: false,
        label: "Fecha de Primer Pago"
    },
    {
        id: 'fixedRate',
        isNumeric: true,
        label: "Tasa Fija"
    },
    {
        id: 'paymentRange',
        isNumeric: false,
        label: "Periocidad de Pago"
    },
    {
        id: 'referenceRate',
        isNumeric: true,
        label: "Tasa de Referencia"
    },
    {
        id: 'overRate',
        isNumeric: true,
        label: "Sobre Tasa"
    },
    {
        id: 'amountOfDays',
        isNumeric: true,
        label: "Dias del Ejercicio"
    },
]

function createDummyData(
  firstPaymentDate: Date,
  fixedRate: number,
  paymentRange: string,
  referenceRate: number,
  overRate: number,
  amountOfDays: number
) {
  return {
    firstPaymentDate,
    fixedRate,
    paymentRange,
    referenceRate,
    overRate,
    amountOfDays,
  };
}

const rows = [
  createDummyData(new Date(2023, 6, 28), 12.22, "6 meses", 12.22, 30.88, 14),
  createDummyData(new Date(2023, 3, 14), 29.32, "3 meses", 22.22, 33.33, 19),
  createDummyData(new Date(2023, 6, 28), 12.22, "6 meses", 12.22, 30.88, 14),
  createDummyData(new Date(2023, 3, 14), 29.32, "3 meses", 22.22, 33.33, 19),
  createDummyData(new Date(2023, 3, 14), 29.32, "3 meses", 22.22, 33.33, 19),
  createDummyData(new Date(2023, 6, 28), 12.22, "6 meses", 12.22, 30.88, 14),
  createDummyData(new Date(2023, 3, 14), 29.32, "3 meses", 22.22, 33.33, 19),

  createDummyData(new Date(2023, 6, 28), 12.22, "6 meses", 12.22, 30.88, 14),
  createDummyData(new Date(2023, 3, 14), 29.32, "3 meses", 22.22, 33.33, 19),
];

export function DisposicionPagosCapital(){

    return (
      <Grid container direction="column">
        <Grid item container>
          <Grid item container direction="column" lg={6} padding={2}>
            <Grid item>
              <Divider sx={queries.medium_text}>DISPOSICIÓN</Divider>
            </Grid>
            <Grid item container mt={5}>
              <Grid item ml={15} lg={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Contratación
                  </InputLabel>
                  <DateField
                    fullWidth
                    format="DD-MM-YYYY"
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                        fontSize: "2ch",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item ml={10} lg={4}>
                <InputLabel sx={queries.medium_text}>Importe</InputLabel>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container direction="column" lg={6} padding={2}>
            <Grid item>
              <Divider sx={queries.medium_text}>PAGOS DE CAPITAL</Divider>
            </Grid>
            <Grid item container mt={5}>
              <Grid item lg={3} ml={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <DateField
                    fullWidth
                    format="DD-MM-YYYY"
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                        fontSize: "2ch",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item ml={10} lg={3}>
                <InputLabel sx={queries.medium_text}>
                  Periocidad de Pago
                </InputLabel>
                <Select fullWidth variant="standard" label="test">
                  <MenuItem sx={queries.text}>Item 1</MenuItem>
                  <MenuItem sx={queries.text}>Item 2</MenuItem>
                  <MenuItem sx={queries.text}>Item 3</MenuItem>
                </Select>
              </Grid>

              <Grid item ml={10} lg={3}>
                <InputLabel sx={queries.medium_text}>Número de Pago</InputLabel>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item container direction="column">
            <Grid item mt={5} padding={2}>
              <Divider sx={queries.medium_text}>TASA DE INTERÉS</Divider>
            </Grid>
            <Grid item container mt={2} spacing={5}>
              <Grid item ml={window.innerWidth / 50 + 12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <DateField
                    fullWidth
                    format="DD-MM-YYYY"
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                        fontSize: "2ch",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item>
                <InputLabel sx={queries.medium_text}>
                  Periocidad de Pago
                </InputLabel>
                <Select fullWidth variant="standard" label="test">
                  <MenuItem sx={queries.text}>Item 1</MenuItem>
                  <MenuItem sx={queries.text}>Item 2</MenuItem>
                  <MenuItem sx={queries.text}>Item 3</MenuItem>
                </Select>
              </Grid>

              <Grid item>
                <InputLabel sx={queries.medium_text}>
                  Tasa de Referencia
                </InputLabel>
                <Select fullWidth variant="standard" label="test">
                  <MenuItem sx={queries.text}>Item 1</MenuItem>
                  <MenuItem sx={queries.text}>Item 2</MenuItem>
                  <MenuItem sx={queries.text}>Item 3</MenuItem>
                </Select>
              </Grid>

              <Grid item>
                <InputLabel sx={queries.medium_text}>Sobre tasa</InputLabel>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  variant="standard"
                />
              </Grid>

              <Grid item>
                <InputLabel sx={queries.medium_text}>
                  Días del Ejercicio
                </InputLabel>
                <Select fullWidth variant="standard" label="test">
                  <MenuItem sx={queries.text}>Item 1</MenuItem>
                  <MenuItem sx={queries.text}>Item 2</MenuItem>
                  <MenuItem sx={queries.text}>Item 3</MenuItem>
                </Select>
              </Grid>

              <Grid item ml={window.innerWidth / 50 + 6}>
                <TableContainer sx={{ maxHeight: "400px" }}>
                  <Table>
                    <TableHead>
                      {heads.map((head) => (
                        <StyledTableCell key={head.id}>
                          <TableSortLabel>{head.label}</TableSortLabel>
                        </StyledTableCell>
                      ))}
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow>
                          <StyledTableCell padding="checkbox">
                            <Checkbox />
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.firstPaymentDate.toLocaleDateString()}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.fixedRate.toString() + "%"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.paymentRange.toString()}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.referenceRate.toString() + "%"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.overRate.toString() + "%"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.amountOfDays.toString() + " dias"}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
                <Grid item>
                  <Grid item>
                    <ConfirmButton>AGREGAR</ConfirmButton>
                  </Grid>

                  <Grid item>
                    <DeleteButton>ELIMINAR</DeleteButton>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}