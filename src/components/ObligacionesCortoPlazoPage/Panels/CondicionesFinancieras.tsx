import {useState} from "react"
import { CondicionFinanciera } from "../../../store/condicion_financiera";
import {
    Grid,
    Table,
    TableBody,
    TableSortLabel,
    TableContainer,
    TableHead,
    Checkbox,
    Tooltip,
    IconButton
} from "@mui/material";

import { AgregarCondicionFinanciera } from "../Dialogs/AgregarCondicionFinanciera";
import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";

import { format } from "date-fns";

import EditIcon from "@mui/icons-material/Edit";

interface CFinancieras {
  sobreTasa: string,
  tasaDiasEjercicio: string,
  tasaFija: string,
  disposicionFechaContratacion: string ,
  disposicionImporte: number,
  capitalFechaPrimerPago: string,
  capitalPeriocidadPago: string,
  capitalNumeroPago: number,
  tasaFechaPrimerPago: string,
  tasaPeriocidadPago: string,

}

interface Head {
    label: string;
}

const heads: readonly Head[] = [
    {
        label: "Selección"
    },
    {
        label: "Fecha de Disposición"
    },
    {
        label: "Importe de Disposición"
    },
    {
        label: "Fecha de Primer Pago Capital"
    },
    {
        label: "Periocidad de Pago Capital"
    },
    {
        label: "Fecha de Primer Pago de Interés"
    },
    {
        label: "Tasa de Interés"
    },
    {
        label: "Comisiones"
    },
    {
        label: "Acciones"
    }
]

export function CondicionesFinancieras(){

  const [openAgregarCondicion, changeAgregarCondicion] = useState(false);
  const [selected, setSelected] = useState<readonly number[]>([]);

  const condicionFinancieraTable: CondicionFinanciera[] = useCortoPlazoStore(state => state.condicionFinancieraTable);
  const loadCondicionFinanciera: Function = useCortoPlazoStore(state => state.loadCondicionFinanciera);
  const removeCondicionFinanciera: Function = useCortoPlazoStore(state => state.removeCondicionFinanciera);

  const [accion, setAccion] = useState("Agregar");
  const [indexA, setIndexA] = useState(0);

  const changeOpenAgregarState = (open: boolean, ) => {
    changeAgregarCondicion(open);
  }

  

  

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const deleteRows = () => {
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
                <StyledTableCell>
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
                      {format(
                        new Date(row.fechaPrimerPagoCapital),
                        "dd/MM/yyyy"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.periocidadPagoCapital}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(
                        new Date(row.fechaPrimerPagoInteres),
                        "dd/MM/yyyy"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tasaInteres}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.comisiones}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton type="button" onClick={() => {
                          changeOpenAgregarState(!openAgregarCondicion);
                          setAccion("Editar")
                          setIndexA(index)
                          loadCondicionFinanciera(row);
                          //editCondicionesFinancieras(row)
                        }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
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
             { changeOpenAgregarState(!openAgregarCondicion)
              setAccion("Agregar")
           
            }
            }
          >
            AGREGAR
          </ConfirmButton>
          {changeOpenAgregarState?<AgregarCondicionFinanciera
            handler={changeOpenAgregarState}
            openState={openAgregarCondicion}
            accion={accion}
            indexA={indexA}
            
          />: null}
        </Grid>
        <Grid item md={6} lg={6}>
          <DeleteButton variant="outlined" onClick={() => deleteRows()}>ELIMINAR</DeleteButton>
        </Grid>
      </Grid>
    </Grid>
  );
}