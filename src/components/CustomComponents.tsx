import { styled } from '@mui/material/styles'
import { tableCellClasses } from "@mui/material/TableCell"

import {
    TableCell,
    TableRow,
    Button,
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
    fontSize: "1.6ch"
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

export {} // DO NOT DELETE THIS