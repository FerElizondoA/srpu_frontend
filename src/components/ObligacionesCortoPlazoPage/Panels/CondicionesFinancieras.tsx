import { useState } from "react"
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


import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
  hashFunctionCYRB53,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";

import { format } from "date-fns";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";

import { TasaInteres } from "../../../store/pagos_capital";
import { TasaEfectiva } from "../../../store/tasa_efectiva";
import { AgregarCondicionFinanciera } from "../dialogs/AgregarCondicionFinanciera";

interface CFinancieras {
  id: number,
  sobreTasa: string,
  tasaDiasEjercicio: string,
  tasaFija: string,
  disposicionFechaContratacion: string,
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
  // {
  //   label: "Selección"
  // },
  {
    label: "Acciones"
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
 
]

export function CondicionesFinancieras() {

  const [openAgregarCondicion, changeAgregarCondicion] = useState(false);
  const [selected, setSelected] = useState<readonly number[]>([]);

  const condicionFinancieraTable: CondicionFinanciera[] = useCortoPlazoStore(state => state.condicionFinancieraTable);
  const loadCondicionFinanciera: Function = useCortoPlazoStore(state => state.loadCondicionFinanciera);
  const removeCondicionFinanciera: Function = useCortoPlazoStore(state => state.removeCondicionFinanciera);

  const [accion, setAccion] = useState("Agregar");
  const [indexA, setIndexA] = useState(0);

  const changeOpenAgregarState = (open: boolean,) => {
    changeAgregarCondicion(open);
  }


  const disposicionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.disposicionFechaContratacion
  );
  const disposicionImporte: number = useCortoPlazoStore(
    (state) => state.disposicionImporte
  );

  const capitalFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.capitalFechaPrimerPago
  );

  const capitalPeriocidadPago: string = useCortoPlazoStore(
    (state) => state.capitalPeriocidadPago
  );
  const tasaFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.tasaFechaPrimerPago
  );
  const tipoComision: string = useCortoPlazoStore(
    (state) => state.tipoComision
  );
  const tasaReferencia: string = useCortoPlazoStore(
    (state) => state.tasaReferencia
  );
  const capitalNumeroPago: number = useCortoPlazoStore(
    (state) => state.capitalNumeroPago
  );
  const tasaInteresTable: TasaInteres[] = useCortoPlazoStore(
    (state) => state.tasaInteresTable
  );
  const tasaEfectivaTable: TasaEfectiva[] = useCortoPlazoStore(
    (state) => state.tasaEfectivaTable
  );
  // const upDataCondicionFinanciera: Function = useCortoPlazoStore(
  //   (state) => state.upDataCondicionFinanciera
  // )
  const addCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.addCondicionFinanciera
  );


  const updatecondicionFinancieraTable: Function = useCortoPlazoStore(state => state.updatecondicionFinancieraTable);


  const addRow = () => {
    const CF: CondicionFinanciera = {


      id: hashFunctionCYRB53(new Date().getTime().toString()),
      fechaDisposicion: disposicionFechaContratacion,
      importeDisposicion: disposicionImporte.toString(),
      fechaPrimerPagoCapital: capitalFechaPrimerPago,
      periocidadPagoCapital: capitalPeriocidadPago,
      fechaPrimerPagoInteres: tasaFechaPrimerPago,
      tasaInteres: tasaReferencia,
      comisiones: tipoComision,
      numeroPagoCapital: capitalNumeroPago,
      tasasInteres: tasaInteresTable,
      tasasEfectivas: tasaEfectivaTable,
    };
    addCondicionFinanciera(CF);
    //}
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <TableContainer sx={{ minHeight: "100%" }} >
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

                return (



                  <StyledTableRow key={row.id}  >
                    {/* <StyledTableCell padding="checkbox">
                      <Checkbox
                        // onClick={(event) => handleClick(event, index)}
                        // checked={isItemSelected}
                      />
                    </StyledTableCell> */}

                    <StyledTableCell align="left">
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
                      <Tooltip title="Eliminar">
                        <IconButton type="button" onClick={() => {
                          updatecondicionFinancieraTable(condicionFinancieraTable.filter(
                            item => item.id !== row.id))
                          //editCondicionesFinancieras(row)
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" >
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



                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item container position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <Grid item md={12} lg={12}>
          <ConfirmButton
            variant="outlined"
            onClick={() => {
            
              changeOpenAgregarState(!openAgregarCondicion)
              setAccion("Agregar")
            

            }
            }
          >
            AGREGAR
          </ConfirmButton>
          {changeOpenAgregarState ? <AgregarCondicionFinanciera
            handler={changeOpenAgregarState}
            openState={openAgregarCondicion}
            accion={accion}
            indexA={indexA}

          /> : null}
        </Grid>

      

      </Grid>
    </Grid>
  );
}