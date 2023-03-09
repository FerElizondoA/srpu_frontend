import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Box,
  Input,
} from "@mui/material";
import { queries } from "../../../queries";
export function Documentacion() {
  const [text, setText] = useState<Array<string>>([
    // "Apartado : Arrastre o de click aqui para cargar un archivo",
  ]);

  const handleAddText = () => {
    let newtext = "Apartado : Arrastre o de click aqui para cargar un archivo";
    let vartemp = text;
    //vartemp.concat(newtext);
    setText(vartemp.concat(newtext));
  };
  //   useEffect(() =>{
  //     info()
  //   }
  //   )
  const handleQUITText = () => {
    let vartemp2 = text;
    //let vartemp2 =
    vartemp2.pop();
    let newvalue = [""];
    setText(newvalue.concat(vartemp2));
  };

  return (
    <Grid container>
      <Grid
        //container
        item
        mt={{ sm:1, md: 1, lg: 1, xl: 1 }}
        ml={{ sm:1, md: 0, lg: 0, xl: 0 }}
        sm={12}
        md={12}
        lg={12}
        xl={12}
     
      >
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography
            sx={{
              fontFamily: "MontserratLight",
              height: "100%",
              justifyItems: "center",
              display: "grid",
              //backgroundColor: "red",
              border: 1,
              borderRadius: 3,
              borderColor: "#af8c55",
            }}
          >
            Apartado : Arrastre o de click aqui para cargar un archivo
            <input
              type="file"
              style={{
                color: "#000",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Typography>
        </Grid>

        {/* {text.map((x, item) => {
          return (
            <Box
            
              sx={{
                cursor: "pointer",
                //height: "50%",
                //justifyItems: "center",
                //display:"grid",
                //  backgroundColor: "blue",
                 border: 1,
                 borderRadius: 3,
                 borderColor: "#af8c55",
                 flexDirection: "column",
                //borderStyle: "dashed",
              }}
            >
              <Typography sx={queries.text}>{x}</Typography>
              <input
                type="file"
                style={{
                  color: "#000",
                  opacity: 0,
                  //width: "50%",
                  //height: "50%",
                  cursor: "pointer",
                }}
              />
            </Box>

          );
        })} */}
      </Grid>

      <Grid
        item
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={{
          //height: "50%",
          justifyItems: "center",
          display: "grid",
          //backgroundColor: "blue",
          //border: 1,
          //borderRadius: 3,
          //borderColor: "#af8c55",
          //borderStyle: "dashed",
        }}
      >
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="text button group"
        >
          <Button
            //   onClick={() => handleAddText()}
            sx={queries.text}
          >
            Agregar documento
          </Button>

          <Button
            // onClick={() => handleQUITText()}
            sx={queries.text}
          >
            Quitar documento
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
