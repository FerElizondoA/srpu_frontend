import * as React from "react"

import {
    Grid,
    Table,
    TableBody,
    TableSortLabel,
    TableContainer,
    TableHead,
    Checkbox
} from "@mui/material";

import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { CondicionFinanciera } from "../../../store/condicion_financiera";
import { format } from "date-fns";


interface Data {
    isSelected: boolean;
    dispositionDate: Date;
    dispositionAmount: number;
    capitalPaymentDate: Date;
    capitalPaymentRange: string;
    iFirstPaymentDate: Date;
    iRate: number;
    comission: number;
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
        id: 'dispositionDate',
        isNumeric: false,
        label: "Fecha de Disposición"
    },
    {
        id: 'dispositionAmount',
        isNumeric: true,
        label: "Importe de Disposición"
    },
    {
        id: 'capitalPaymentDate',
        isNumeric: false,
        label: "Fecha de Primer Pago Capital"
    },
    {
        id: 'capitalPaymentRange',
        isNumeric: false,
        label: "Periocidad de Pago Capital"
    },
    {
        id: 'iFirstPaymentDate',
        isNumeric: false,
        label: "Fecha de Primer Pago de Interés"
    },
    {
        id: 'iRate',
        isNumeric: true,
        label: "Tasa de Interés"
    },
    {
        id: 'comission',
        isNumeric: true,
        label: "Comisiones"
    },
]

////////////////////////////////////////////////////////

function createDummyData(
    dispositionDate: Date,
    dispositionAmount: number,
    capitalPaymentDate: Date,
    capitalPaymentRange: string,
    iFirstPaymentDate: Date,
    iRate: number,
    comission: number
){
    return {
        dispositionDate,
        dispositionAmount,
        capitalPaymentDate,
        capitalPaymentRange,
        iFirstPaymentDate,
        iRate,
        comission
    }
}

const rows = [
    createDummyData(
        new Date(2023, 2, 14), // AÑO - MES - DÍA
        10000,
        new Date(2023, 3, 14),
        "1 año",
        new Date(2023, 4, 14),
        30,
        350.05
        ),
    createDummyData(
        new Date(2022, 1, 18),
        2000,
        new Date(2022, 2, 18),
        "5 meses",
        new Date(2022, 3, 18),
        25.23,
        370.05
        ),
    createDummyData(
        new Date(2021, 5, 23),
        4300,
        new Date(2021, 6, 23),
        "8 meses",
        new Date(2021, 7, 23),
        34.93,
        632.65
        )
]

export function CondicionesFinancieras(){

  const [openAgregarCondicion, changeAgregarCondicion] = React.useState(false);
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const condicionFinancieraTable: CondicionFinanciera[] = useCortoPlazoStore(state => state.condicionFinancieraTable);
  const removeCondicionFinanciera: Function = useCortoPlazoStore(state => state.removeCondicionFinanciera);

  const changeOpenAgregarState = (open: boolean) => {
    changeAgregarCondicion(open);
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      console.log("selectedIndex === 0 !")
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      console.log("selectedIndex === selected.length -1 !")
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      console.log("selectedIndex === selected.length > 0 !")
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    console.log(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const deleteRows = () => {
    console.log("selected: ", selected)
    selected.forEach((it) => {
      removeCondicionFinanciera(it);
    })
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <TableContainer sx={{ minHeight: "100%" }}>
          <Table>
            <TableHead>
              {heads.map((head) => (
                <StyledTableCell key={head.id}>
                  <TableSortLabel>{head.label}</TableSortLabel>
                </StyledTableCell>
              ))}
            </TableHead>
            <TableBody>
              {condicionFinancieraTable.map((row, index) => {
                const isItemSelected: boolean = isSelected(index);
                return (
                  <StyledTableRow>
                    <StyledTableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, index)}
                          checked={isItemSelected}
                        />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {format(new Date(row.fechaDisposicion), "dd/MM/yyyy")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {"$" + row.importeDisposicion}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(new Date(row.fechaPrimerPagoCapital), "dd/MM/yyyy")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.periocidadPagoCapital}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(new Date(row.fechaPrimerPagoInteres), "dd/MM/yyyy")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tasaInteres}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.comisiones}
                    </StyledTableCell>
                  </StyledTableRow>
                );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item container position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <Grid item md={6}lg={6}>
          <ConfirmButton
            variant="outlined"
            onClick={() =>
              changeOpenAgregarState(!openAgregarCondicion)
            }
          >
            AGREGAR
          </ConfirmButton>
          <AgregarCondicionFinanciera
            handler={changeOpenAgregarState}
            openState={openAgregarCondicion}
          />
        </Grid>
        <Grid item md={6} lg={6}>
          <DeleteButton variant="outlined" onClick={() => deleteRows()}>ELIMINAR</DeleteButton>
        </Grid>
      </Grid>
    </Grid>
  );
}