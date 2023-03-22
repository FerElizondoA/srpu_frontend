import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Init = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
