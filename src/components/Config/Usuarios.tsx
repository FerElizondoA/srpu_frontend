import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { LateralMenu } from "../LateralMenu/LateralMenu";

export const Usuarios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Rol") === "Capturador") {
      navigate("../home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openModalUsuarios, setOpenModalUsuarios] = useState(false);
  const [openModalVincularUsuario, setOpenModalVincularUsuario] =
    useState(false);

  const [actualizarDatos, setActualizarDatos] = useState(0);

  const handleCloseModalUsuarios = () => {
    setOpenModalUsuarios(false);
    setActualizarDatos(actualizarDatos + 1);
  };

  const handleCloseModalVincularUsuario = () => {
    setOpenModalVincularUsuario(false);
  };

  const [usersFiltered, setUsersFiltered] = useState("");

  const dataFilter = (text: string) => {
    setUsersFiltered(text);
  };

  //variables y funciones Solicitudes Pendeintes
  const [openDialogSolicitudesP, setOpenDialogSolicitudesP] = useState(false);
  const handleClickOpenDialogSolicitudesP = () => {
    setOpenDialogSolicitudesP(true);
  };

  const handleCloseSolicitudesP = () => {
    setOpenDialogSolicitudesP(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        backgroundColor: "#F2F2F2",
        alignItems: "start",
      }}
    >
      <LateralMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          width: "100%",
          height: "92vh",
          alignItems: "center"
        }}
      >
        {/* <ModalCrearUsuario
          title="Crear Solicitud Nuevo Usuario"
          open={openModalUsuarios}
          handleClose={handleCloseModalUsuarios}
        />

        <ModalVincularUsuario
          title="Vincular Usuario"
          open={openModalVincularUsuario}
          handleClose={handleCloseModalVincularUsuario}
        />
        <DialogSolicitudes
          open={openDialogSolicitudesP}
          handleClose={handleCloseSolicitudesP}
        /> */}

        <Box
          sx={{
            width: "70vw",
            height: "10vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:20
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: 1,
              borderRadius: 2,
              ml: "1vw",
              color: "#ccc",
            }}
          >
            <Input
              sx={{ pl: 1 }}
              disableUnderline
              onChange={(v) => dataFilter(v.target.value)}
            />
            <SearchIcon sx={{ color: "action.active", mr: 1 }} />
          </Box>

          <Box>
            <Button
              variant="contained"
              disabled={
                localStorage.getItem("Rol") !== "Administrador" ? true : false
              }
              sx={{
                mr: 3,
                backgroundColor: "#15212F",
                ":hover": {
                  backgroundColor: "#ccc",
                },
              }}
              onClick={() => handleClickOpenDialogSolicitudesP()}
            >
              <ScheduleSendIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
              >
                HISTORIAL DE SOLICITUDES
              </Typography>
            </Button>

            <Button
              variant="contained"
              disabled={
                localStorage.getItem("Rol") !== "Administrador" ? true : false
              }
              sx={{
                mr: 3,
                backgroundColor: "#15212F",
                ":hover": {
                  backgroundColor: "#ccc",
                },
              }}
              onClick={() => setOpenModalVincularUsuario(true)}
            >
              <AddLinkIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
              >
                VINCULAR USUARIO
              </Typography>
            </Button>
            <Button
              variant="contained"
              disabled={
                localStorage.getItem("Rol") === "Capturador" ? true : false
              }
              sx={{
                mr: 3,
                backgroundColor: "#c4a55a",
                ":hover": {
                  backgroundColor: "#ccc",
                },
              }}
              onClick={() => setOpenModalUsuarios(true)}
            >
              <SendIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
              >
                CREAR SOLICITUD DE ALTA
              </Typography>
            </Button>
          </Box>
        </Box>

        {/* ----- */}
        <Box
          sx={{
            width: "70vw",
            height: "65vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            boxShadow:20
          }}
        >
          {/* <DataTable
            textFind={usersFiltered}
            actualizar={actualizarDatos}
          ></DataTable> */}
        </Box>
      </Box>
    </Box>
  );
};
