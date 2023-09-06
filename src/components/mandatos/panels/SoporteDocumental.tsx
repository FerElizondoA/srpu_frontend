import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, InputLabel, Paper, Radio, RadioGroup, Table, TableBody, TableContainer, TableHead, TableRow, ThemeProvider, Tooltip, Typography } from "@mui/material";
import { queries } from "../../../queries";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DateInput, StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { format } from "date-fns";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { GridCloseIcon } from "@mui/x-data-grid";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { useState } from "react";
import { HeadLabels } from "../../fideicomisos/panels/TipoDeMovimiento";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { SoporteDocumentalMandato, TipoMovimientoMandato } from "../../../store/Mandatos/mandato";

const heads: HeadLabels[] = [
  {
    label: " ",
  },
  {
    label: "Tipo de documento",
  },
  {
    label: "Fecha del documento",
  },
  {
    label: "Archivo",
  },
  {
    label: " ",
  },
];

export function SoporteDocumental() {

  const [fileSelected, setFileSelected] = useState<any>("");
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
     setSoporteDocumentalMandato({
       tipo: (event.target as HTMLInputElement).value,
       fechaArchivo: fechaArchivo,
       archivo: archivo,
       nombreArchivo: nombreArchivo,
     });
  };

  const tipo: string = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.tipo
  )

  const archivo: File = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.archivo
  )

  const nombreArchivo: string = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.nombreArchivo
  )

  const fechaArchivo: string = useLargoPlazoStore(
    (state) => state.soporteDocumentalMandato.fechaArchivo
  )


  const setSoporteDocumentalMandato : Function = useLargoPlazoStore(
    (state) => state.setSoporteDocumentalMandato
  )

  const addSoporteDocumentalMandato :Function = useLargoPlazoStore(
    (state) => state.addSoporteDocumentalMandato
  )

  const removeSoporteDocumentalMandato : Function = useLargoPlazoStore(
    (state) => state.removeSoporteDocumentalMandato
  )


  const tablaSoporteDocumentalMandato : SoporteDocumentalMandato[] = useLargoPlazoStore(
    (state) => state.tablaSoporteDocumentalMandato
  )

  function cargarArchivo(event: any) {
    let file = event.target.files[0];

    if (file !== undefined) {
      setSoporteDocumentalMandato({
        tipo: tipo,
        fechaArchivo: fechaArchivo,
        archivo: file,
        nombreArchivo: file.name,
      });
    }
  }


  const [radioValue, setRadioValue] = useState("");
  return (
    <Grid
    container
    display={"grid"}
    gridTemplateColumns={"repeat(3,1fr)"}
    justifyItems={"center"}
    mt={4}
  >
    <FormControl sx={{width:"100%", justifyContent:"center", alignItems:"center"}}>
      <RadioGroup sx={{marginLeft:5}} value={radioValue} onChange={handleChange}>
        <FormControlLabel
          value="Mandato"
          control={<Radio />}
          label="Mandato"
        />
        <FormControlLabel
          value="Convenio modificatorio"
          control={<Radio />}
          label="Convenio modificatorio"
        />
      </RadioGroup>
    </FormControl>

    <Grid
      container
      direction={"column"}
      justifyContent={"space-between"}
      height={"10rem"}
    >
      <Grid  >
        <InputLabel sx={queries.medium_text}>Fecha del documento</InputLabel>
         <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={enGB}
        >
          <DatePicker
            value={new Date(fechaArchivo)}
            onChange={(date) =>
              setSoporteDocumentalMandato({
                tipo: tipo,
                fechaArchivo: date?.toString(),
                archivo: archivo,
                nombreArchivo: nombreArchivo,
              })
            }
            slots={{
              textField: DateInput,
            }}
          />
        </LocalizationProvider> 
      </Grid>

      <Grid>
        <InputLabel>Archivo</InputLabel>
        <Typography
          position={"absolute"}
          sx={{
           ...queries.tamañoLetraArcivoFideicomiso,
            fontFamily:
              nombreArchivo !== ""
                ? "MontserratBold"
                : "MontserratMedium",
            
            border:
             nombreArchivo !== ""
                ? "2px dotted #af8c55"
                : "2px dotted black",
          }}
        >
          {nombreArchivo ||
            "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
        </Typography>
        <input
          type="file"
          accept="application/pdf"
          onChange={(v) => {
            cargarArchivo(v);
          }}
          style={{
            opacity: 0,
            width: "100%",
            height: "5vh",
            cursor: "pointer",
          }}
        />
      </Grid>
    </Grid>

    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <ThemeProvider theme={ButtonTheme}>
        <Button
          sx={{
            ...queries.buttonContinuarSolicitudInscripcion,
            width: "15vh",
          }}
          disabled={
             tipo === "" ||
             fechaArchivo === "" ||
             nombreArchivo === ""
          }
          onClick={() => {
            addSoporteDocumentalMandato({
              tipo: tipo,
              fechaArchivo: fechaArchivo,
              archivo: archivo,
              nombreArchivo: nombreArchivo,
            });
          }}
        >
          Agregar
        </Button>
      </ThemeProvider>
    </Grid>

    <Grid
      container
      flexDirection={"column"}
      alignItems={"center"}
      height={"60%"}
      gridColumn={"1/4"}
      mt={4}
     
    >
      <Paper sx={{ width: "88%" }}>
        <TableContainer
          sx={{
            maxHeight: "50vh",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".5vw",
              height: "1vh",
              mt: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {heads.map((head, index) => (
                  <StyledTableCell align="center" key={index}>
                    <Typography>{head.label}</Typography>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
               {tablaSoporteDocumentalMandato.map((row: any, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <Tooltip title="Eliminar">
                        <IconButton
                          type="button"
                          onClick={() => removeSoporteDocumentalMandato(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.tipo}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                    {format(new Date(row.fechaArchivo), "dd/MM/yyyy")}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {row.nombreArchivo}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip title={"Mostrar vista previa del documento"}>
                        <IconButton
                          onClick={() => {
                            toBase64(row.archivo).then((data) => {
                              setFileSelected(data);
                            });
                            setShowModalPrevia(true);
                          }}
                        >
                          <FileOpenIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })} 
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
    <Dialog
      open={false}
      onClose={() => {
        setShowModalPrevia(false);
      }}
      fullWidth
      maxWidth={"lg"}
    >
      <DialogTitle sx={{ mb: 2 }}>
        <IconButton
          onClick={() => {
            setShowModalPrevia(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <GridCloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ height: "100vh" }}>
        <iframe
          style={{
            width: "100%",
            height: "85vh",
          }}
          src={`${fileSelected}`}
          title="description"
        ></iframe>
      </DialogContent>
    </Dialog>
  </Grid>
  )
}
