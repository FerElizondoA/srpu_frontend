import * as React from "react"

import {
  Grid,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  InputAdornment
} from "@mui/material";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateInput } from "../../CustomComponents";

import { queries } from "../../../queries";

import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

interface Data {
  isSelected: boolean,
  comissionType: string,
  firstPaymentDate: Date,
  paymentRange: string,
  percentage: number,
  amount: number,
  IVA: number
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
        id: 'comissionType',
        isNumeric: false,
        label: "Tipo de Comisión"
    },
    {
        id: 'firstPaymentDate',
        isNumeric: false,
        label: "Fecha de Primer Pago"
    },
    {
        id: 'paymentRange',
        isNumeric: false,
        label: "Periocidad de Pago"
    },
    {
        id: 'percentage',
        isNumeric: true,
        label: "Porcentaje"
    },
    {
        id: 'amount',
        isNumeric: true,
        label: "Monto"
    },
    {
        id: 'IVA',
        isNumeric: true,
        label: "IVA"
    },
]

function createDummyData(
  comissionType: string,
  firstPaymentDate: Date,
  paymentRange: string,
  percentage: number,
  amount: number,
  IVA: number
) {
  return {
    comissionType,
    firstPaymentDate,
    paymentRange,
    percentage,
    amount,
    IVA
  };
}

const rows = [
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
  createDummyData("test", new Date(2023, 3, 14), "3 meses", 14.12, 30000, 16.2),
];

export function ComisionesTasaEfectiva(){

    const [radioValue, setRadioValue] = React.useState("fixedPercentage");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRadioValue((event.target as HTMLInputElement).value);
    };

    return (
      <Grid container direction="column">
        <Grid item container mt={2} spacing={5}>
          <Grid item ml={window.innerWidth / 50 + 20}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Contratación
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                value={new Date()}
                onChange={(date) => {}}
                slots={{
                  textField: DateInput,
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Tipo de Comisión</InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Periocidad de Pago</InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <FormControl>
              <RadioGroup
                defaultValue="fixedPercentage"
                value={radioValue}
                onChange={handleChange}
              >
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      value="fixedPercentage"
                      control={<Radio />}
                      label="Porcentaje Fijo"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="fixedAmount"
                      control={<Radio />}
                      label="Monto Fijo"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item container mt={5} spacing={5}>
          <Grid item ml={window.innerWidth / 50 + 20}>
            {radioValue === "fixedPercentage" ? (
              <InputLabel sx={queries.medium_text}>Porcentaje</InputLabel>
            ) : (
              <InputLabel sx={queries.medium_text}>Monto</InputLabel>
            )}
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
                  <>
                    {radioValue === "fixedPercentage" ? (
                      <></>
                    ) : (
                      <InputAdornment position="start">$</InputAdornment>
                    )}
                  </>
                ),
                endAdornment: (
                  <>
                    {radioValue === "fixedPercentage" ? (
                      <InputAdornment position="end">%</InputAdornment>
                    ) : (
                      <></>
                    )}
                  </>
                ),
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Días del Ejercicio</InputLabel>
            <Select fullWidth variant="standard" label="test">
              <MenuItem sx={queries.text}>Item 1</MenuItem>
              <MenuItem sx={queries.text}>Item 2</MenuItem>
              <MenuItem sx={queries.text}>Item 3</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Tasa Efectiva</InputLabel>
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
            <FormControlLabel
              label="Causa IVA"
              control={<Checkbox defaultChecked />}
            ></FormControlLabel>
          </Grid>

          <Grid item ml={window.innerWidth / 50 + 10}>
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
                      <StyledTableCell align="center">
                        {row.comissionType}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.firstPaymentDate.toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.paymentRange.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.percentage.toString() + "%"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {"$" + row.amount.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.IVA.toString() + "%"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    );
}