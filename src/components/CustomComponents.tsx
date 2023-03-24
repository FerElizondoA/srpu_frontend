import { styled } from '@mui/material/styles'
import { tableCellClasses } from "@mui/material/TableCell"

import {
    TableCell,
    TableRow,
    Box,
    Button,
    TextFieldProps
} from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: theme.palette.common.black,
    fontFamily: "MontserratMedium",
    fontSize: "1.6ch",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "MontserratRegular",
    fontSize: "1.6ch",
    
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  fontFamily: "MontserratMedium",
  fontSize: "1.5ch",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ConfirmButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "60px",
  fontFamily: "MontserratMedium",
  fontSize: "1.8ch",
  color: "green",
  borderColor: "green",
  borderRadius: "0",
  ":hover": {
    backgroundColor: "green",
    color: "white",
    borderColor: "green"
  }
}))

export const DeleteButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "60px",
  fontFamily: "MontserratMedium",
  fontSize: "1.8ch",
  color: "#e57373",
  borderColor: "#e57373",
  borderRadius: "0",
  ":hover": {
    backgroundColor: "#e57373",
    color: "white",
    borderColor: "#e57373"
  }
}))

type DateInputProps = TextFieldProps & {
  ownerState?: any;
};

export const DateInput = function DateInput(props: DateInputProps) {
  const { inputProps, InputProps, ownerState, inputRef, error, ...other } = props;

  return (

    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      "&.MuiBox-root > input": {
        color: "black",
        fontSize: "1.5ch",
        width: "100%", 
        fontFamily: "MontserratRegular", 
        margin: "8px auto"
      }
      }} ref={InputProps?.ref}>
      <input ref={inputRef} {...inputProps} {...(other as any)} size="small" sx={{
        marginTop: "4px",
      }} disabled/>
      {InputProps?.endAdornment}
    </Box>
  );
};

export const hashFunctionCYRB53 = (str: string, seed: number = 0) => {
  let h1 = 0xdeadbeef ^ seed,
  h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
};


export {} // DO NOT DELETE THIS