import{ Box} from '@mui/material';
import escudo from "../../assets/logo/escudo.png"


export const Home = () => {
  return (
  

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
        }}
      >
        <Box>
          <img src={escudo} alt="Escudo" style={{ width: "30vw" }} />
        </Box>
      </Box>

    
  );
};