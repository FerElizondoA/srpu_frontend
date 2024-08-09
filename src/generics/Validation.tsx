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

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        // Divide la URL base64 en partes y devuelve solo la cadena base64
        const base64String = reader.result.toString().split(',')[1];
        console.log('Se convirtio en base64',base64String);
        resolve(base64String);
      } else {
        console.log('No se convirtio en base64');
        
        reject('No se pudo leer el archivo');
      }
    };
    reader.onerror = error => reject(error);
  });
};