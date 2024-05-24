import { alertaInfo } from "./Alertas";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';

// Configura el idioma en español
dayjs.locale('es');


export function filterByWord(objectsArray: any[], word: string) {
  // Convert the word to lowercase for case-insensitive comparison
  const lowerCaseWord = word.toLowerCase();

  // Filter the array
  let arrFilter = objectsArray.filter((obj) => {
    // Check if any property value contains the word
    return Object.values(obj).some(
      (value) =>
        // Ensure the value is a string and perform a case-insensitive search
        typeof value === "string" && value.toLowerCase().includes(lowerCaseWord)
    );
  });
  
  console.log("arrFilter", arrFilter);
  if (arrFilter.length === 0) {
    alertaInfo("No se encontraron coincidencias");
    return objectsArray;
  } else {
    return arrFilter;
  }
}

interface GenericObject {
  [key: string]: any;
}

export function filtrarPorFecha<T extends GenericObject>(
  objetos: T[],
  keys:string[],
  fechaInicio: Dayjs,
  fechaFin: Dayjs | null,
  word: string
): T[] {

  let objetosFiltrdos = objetos.filter((objeto) => {
  
    let keyvalid= keys.some((key)=>{
      
      let parseDate:Dayjs=dayjs(objeto[key], 'DD-MM-YYYY');

      if (fechaFin !== null) {
      
          return parseDate >= fechaInicio && parseDate <= fechaFin
      
      } else {
        
        return parseDate.isSame(fechaInicio, "day");
      }
      
    })
    return keyvalid
  });
  
  return filterByWord(objetosFiltrdos, word);
}


