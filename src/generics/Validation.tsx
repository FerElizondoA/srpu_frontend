import React from "react";
import { format, isValid } from "date-fns";
import { es } from "date-fns/locale";

export const formatDateToMexican = (dateString: string) => {
  const date = new Date(dateString);

  if (isValid(date)) {
    let valor = format(date, "dd/MM/yyyy", { locale: es });

    return valor;
  }

  return dateString; // Return the original string if it's not a valid date
};
