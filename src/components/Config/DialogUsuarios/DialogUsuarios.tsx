import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { IUsuarios } from "../Interfaces/IUsuarios";
import { getCatalogo } from "../APIS/APISCatalogos";
import { ICatalogo } from "../Catalogos";
import { createSolicitud } from "../APIS/Solicitudes-Usuarios";
import Swal from "sweetalert2";
import DialogContentText from "@mui/material/DialogContentText";
import { log } from "console";



export const DialogUsuarios = ({
  open,
  title,
  handleClose,
  UserObject,
  ActionButton,
}: {
  open: boolean;
  title: string;
  handleClose: Function;
  UserObject?: IUsuarios;
  ActionButton: string;
}) => {
  const [registroDatos, setRegistroDatos] = useState<IUsuarios>({
    id: UserObject?.id||'',
    IdCentral:UserObject?.IdCentral|| '',
    Nombre: UserObject?.Nombre||'',
    ApellidoPaterno:UserObject?.ApellidoPaterno|| '',
    ApellidoMaterno: UserObject?.ApellidoMaterno||'',
    NombreUsuario: UserObject?.NombreUsuario||'',
    CorreoElectronico: UserObject?.CorreoElectronico||'',
    Curp: UserObject?.Curp||'',
    Rfc: UserObject?.Rfc||'',
    Telefono: UserObject?.Telefono||'',
    Ext: UserObject?.Ext||'',
    Celular: UserObject?.Celular||'',
    Cargo: UserObject?.Cargo||'',
    CorreoDeRecuperacion: UserObject?.CorreoDeRecuperacion||'',
    Rol: UserObject?.Rol||'',
    IdRol:UserObject?.IdRol||'',
    MunicipioUOrganizacion: UserObject?.MunicipioUOrganizacion||'',
  });

  /*DIALOGF */

  const [] = useState("");

  const [tipoUsuario, setTipoUsuario] = useState<Array<ICatalogo>>([]);

  const [entesPublicos, setEntesPublicos] = useState<Array<ICatalogo>>([]);

  useEffect(() => {
    if (UserObject !== undefined) {
      setRegistroDatos(UserObject);
    }
  }, [UserObject]);

  useEffect(() => {
    getCatalogo(setTipoUsuario, "roles");
    getCatalogo(setEntesPublicos, "entePublicoObligado");
  }, []);


  

  /*const mostrarAlerta=() => {
    Swal.fire({
      icon: 'success',
      title: "Confirmacion",
      text: "El usuario se ha agregado correctamente"
    })
  }*/

  /* Variables Dialog confirmacion*/
  const [openDialogConfirm,setOpenDialogConfirm]=useState(false);

  /*///// ***********  VALIDACIONES  **********/ /////

  const [comentario, setComentario] = useState("");

  const validaUsuario = (dato: string) => {
    var format = /[¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length < 21 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, NombreUsuario: dato });
    }
  };

  const validaEmail = (dato: string) => {
    const format =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    if (dato.length < 101 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, CorreoElectronico: dato });
    }
  };

  const validaNombre = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length < 20 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Nombre: dato });
      console.log(registroDatos);
      
    }
  };

  const validaApellidoP = (dato: string) => {
    const format = /[¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length < 20 && !format.test(dato)) {

      setRegistroDatos((registroDatos)=>({...registroDatos,...{ApellidoPaterno: dato}}));
    }
  };

  const validaApellidoM = (dato: string) => {
    const format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length < 20 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, ApellidoMaterno: dato });
    }
  };

  const validaMunicipio = (dato: string) => {
    setRegistroDatos({ ...registroDatos, MunicipioUOrganizacion: dato });
  };

  const validaTipoUsuario = (dato: string) => {
    setRegistroDatos({ ...registroDatos, Rol: dato });
  };

  const validaCargo = (dato: string) => {
    const format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length < 255 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Cargo: dato });
    }
  };

  const validaTelefono = (dato: number) => {
    if (dato < 9999999999) {
      setRegistroDatos({ ...registroDatos, Telefono: dato.toString() });
    } else if (dato.toString() === "NaN") {
      setRegistroDatos({ ...registroDatos, Telefono: "0" });
    }
    if (registroDatos.Telefono.length < 9) {
      setErroresTelefono(true);
      setLeyendaErrorTelefono("Numero de Telefono no valido");
    } else {
      setErroresTelefono(false);
      setLeyendaErrorTelefono("");
    }
  };

  const validaExtension = (dato: number) => {
    if (dato <= 9999) {
      setRegistroDatos({ ...registroDatos, Ext: dato.toString() });
    } else if (dato.toString() === "NaN") {
      setRegistroDatos({ ...registroDatos, Ext: "0" });
    }
  };

  const validaCelular = (dato: number) => {
    if (dato < 9999999999) {
      setRegistroDatos({ ...registroDatos, Celular: dato.toString() });
    } else if (dato.toString() === "NaN") {
      setRegistroDatos({ ...registroDatos, Celular: "0" });
    }
    if (registroDatos.Celular.length < 9) {
      setErroresCelular(true);
      setLeyendaErrorCelular("Numero de Celular no valido");
    } else {
      setErroresCelular(false);
      setLeyendaErrorCelular("");
    }
  };

  const validaCURP = (dato: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length !== 19 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Curp: dato.toUpperCase() });
    }
    if (registroDatos.Curp.length < 18) {
      setErroresCurp(true);
      setLeyendaErrorCurp("El CURP esta incompleto");
    } else {
      setErroresCurp(false);
      setLeyendaErrorCurp("");
    }
  };

  const validaRFC = (dato: string) => {
    var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (dato.length < 14 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, Rfc: dato.toUpperCase() });
    }
    if (registroDatos.Rfc.length < 12 || registroDatos.Rfc.length > 13) {
      setErroresRfc(true);
      setLeyendaErrorRfc("El RFC esta incompleto");
    } else {
      setErroresRfc(false);
      setLeyendaErrorRfc("");
    }
  };

  const validaComentario = (dato: string) => {
    const format =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    if (dato.length < 2000 && !format.test(dato)) {
      setComentario(dato);
    }
  };

  const validaEmailRecuperacion = (dato: string) => {
    const format =
      /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    if (dato.length < 101 && !format.test(dato)) {
      setRegistroDatos({ ...registroDatos, CorreoDeRecuperacion: dato });
    }
  };

  ////////////////////////////////////////////////////////

  /* *********** ERRORES ***************/

  const [ErroresCurp, setErroresCurp] = useState(false);
  const [ErroresRfc, setErroresRfc] = useState(false);

  const [LeyendaErrorCurp, setLeyendaErrorCurp] = useState("");
  const [LeyendaErrorRfc, setLeyendaErrorRfc] = useState("");

  const [ErroresCelular, setErroresCelular] = useState(false);
  const [ErroresTelefono, setErroresTelefono] = useState(false);

  const [LeyendaErrorCelular, setLeyendaErrorCelular] = useState("");
  const [LeyendaErrorTelefono, setLeyendaErrorTelefono] = useState("");

  ////////////////////////////////////////////////////////
 
  return (<>
  <Dialog
      fullWidth
      maxWidth="md"
      onClose={() => handleClose()}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{height:'100vh'}}
    >
      <DialogTitle  > {title}</DialogTitle>
      <DialogContent >
        <Grid container spacing={1}>
          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              fullWidth
              required
              label="Usuario"
              margin="dense"
              variant="outlined"
              onChange={(e) => {
                validaUsuario(e.target.value);
              }}
              value={registroDatos.NombreUsuario}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={8} lg={8} sm={12}>
            <TextField
              type="email"
              margin="dense"
              variant="outlined"
              fullWidth
              label="Correo Electronico"
              required
              value={registroDatos.CorreoElectronico}
              onChange={(e) => {
                validaEmail(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              label="Nombre(s)"
              required
              value={registroDatos.Nombre}
              onChange={(e) => {
                validaNombre(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              label="Apellido Paterno"
              required
              value={registroDatos.ApellidoPaterno}
              onChange={(e) => {
                validaApellidoP(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              label="Apellido Materno"
              required
              value={registroDatos.ApellidoMaterno}
              onChange={(e) => {
                validaApellidoM(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              select
              variant="outlined"
              fullWidth
              label="Tipo de Usuario"
              margin="dense"
              required
              value={registroDatos.Rol}
              onChange={(e) => {
                validaTipoUsuario(e.target.value);
              }}
            >
              {tipoUsuario?.map((option) => (
                <MenuItem key={option.Id} value={option.Descripcion}>
                  {option.Descripcion}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              label="Cargo"
              required
              value={registroDatos.Cargo}
              onChange={(e) => {
                validaCargo(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={4} lg={4} sm={12}>
            <TextField
              required
              margin="dense"
              variant="outlined"
              fullWidth
              select
              label="Municipio o Delegacion"
              value={registroDatos.MunicipioUOrganizacion}
              onChange={(e) => {
                validaMunicipio(e.target.value);
              }}
            >
              {entesPublicos?.map((option) => (
                <MenuItem key={option.Id} value={option.Descripcion}>
                  {option.Descripcion}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={6} lg={6} sm={12}>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              label="CURP"
              required
              value={registroDatos.Curp}
              helperText={LeyendaErrorCurp}
              error={ErroresCurp}
              onChange={(e) => {
                validaCURP(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={6} lg={6} sm={12}>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              label="RFC"
              required
              value={registroDatos.Rfc}
              helperText={LeyendaErrorRfc}
              error={ErroresRfc}
              onChange={(e) => {
                validaRFC(e.target.value);
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={5} lg={5} sm={12}>
            <TextField
              fullWidth
              required
              margin="dense"
              variant="outlined"
              label="Telefono"
              value={
                registroDatos.Telefono == "0" ? "" : registroDatos.Telefono
              }
              helperText={LeyendaErrorTelefono}
              error={ErroresTelefono}
              onChange={(e) => {
                validaTelefono(parseInt(e.target.value));
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={5} lg={5} sm={12}>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "/[0-9]{10}/" }}
              margin="dense"
              variant="outlined"
              label="Celular"
              fullWidth
              required
              value={registroDatos.Celular == "0" ? "" : registroDatos.Celular}
              helperText={LeyendaErrorCelular}
              error={ErroresCelular}
              onChange={(e) => {
                validaCelular(parseInt(e.target.value));
              }}
            />
          </Grid>

          <Grid item textTransform={"uppercase"} xs={12} md={2} lg={2} sm={12}>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "/[0-9]{10}/" }}
              margin="dense"
              variant="outlined"
              label="Extension"
              fullWidth
              required
              value={registroDatos.Ext == "0" ? "" : registroDatos.Ext}
              onChange={(e) => {
                validaExtension(parseInt(e.target.value));
              }}
            />
          </Grid>

          <Grid
            item
            textTransform={"uppercase"}
            xs={12}
            md={12}
            lg={12}
            sm={12}
          >
            <TextField
              type="email"
              margin="dense"
              variant="outlined"
              fullWidth
              label="Correo Alternativo"
              required
              value={registroDatos.CorreoDeRecuperacion}
              onChange={(e) => {
                validaEmailRecuperacion(e.target.value);
              }}
            />
          </Grid>

          <Grid
            item
            sx={{ width: { xs: 232, sm: 200 } }}
            textTransform={"uppercase"}
            xs={12}
            md={12}
            lg={12}
            sm={12}
          >
            <TextField
              fullWidth
              label="Comentario"
              margin="none"
              multiline
              rows={1}
              variant="outlined"
              value={comentario}
              onChange={(e) => {
                validaComentario(e.target.value);
              }}
            />
          </Grid>

          
        </Grid>
      </DialogContent>
      <DialogActions sx={{display:'flex', alignItems:"flex-end"}}>
            {ActionButton === "Agregar" ? (
              <Button
                sx={{ mb: 1.5, mr: 1.5 }}
                type="submit"
                variant="contained"
                onClick={() => {
                  setOpenDialogConfirm(!openDialogConfirm)
                }}
                endIcon={<SendIcon />}
              >
                Crear Usuario
              </Button>
            ) : ActionButton === "Editar" ? (
              <Button
                sx={{ mb: 1.5, mr: 1.5 }}
                type="submit"
                variant="contained"
                onClick={() => {setOpenDialogConfirm(!openDialogConfirm)}}
                endIcon={<SendIcon />}
              >
               Editar Usuario
               
              </Button>
              
            ) : null}

            <Button
              sx={{ mb: 1.5 }}
              color="error"
              variant="contained"
              onClick={() => {
                
                handleClose();
              }}
            >
              Cancelar
            </Button>
            
          </DialogActions>
    </Dialog>

    <Dialog
        open={openDialogConfirm}
        onClose={() =>{setOpenDialogConfirm(!openDialogConfirm)}}
      >
        <DialogTitle >
          {"Confirmacion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            {'¿Estas seguro de que quieres "'+ActionButton+'" el usuario: '+ registroDatos?.Nombre+' '+registroDatos?.ApellidoPaterno+'?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpenDialogConfirm(!openDialogConfirm)}}>Cancelar</Button>
          <Button onClick={()=>{ 
            createSolicitud(registroDatos,ActionButton==='Agregar'?'ALTA':'MODIFICACION',comentario);
            
            setOpenDialogConfirm(!openDialogConfirm);
            handleClose();
        
        }}autoFocus>Aceptar</Button>
        </DialogActions>
      </Dialog>
  </>
    
    
  );
};
