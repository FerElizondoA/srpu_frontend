import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    const parentElement = toast.parentElement;

    if (parentElement) {
      parentElement.style.zIndex = '1000';  // Aplica zIndex si el parentElement no es null
    }
    toast.style.position = 'relative';  // Agrega esta línea
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ToastErrores = Swal.mixin({
  toast: false,
  position: "center",
  showConfirmButton: true,
  heightAuto: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ToastConfirm = Swal.mixin({
  toast: false,
  position: "center",
  showConfirmButton: true,
  heightAuto: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function alertaErroresDocumento(errores: string[] = []) {
  return ToastErrores.fire({
    icon: "error",
    //iconColor: "#af8c55",
    confirmButtonColor: "#15212f",
    html: `
    <div style="height:50%;">
    <h3>SE HAN ENCONTRADO LOS SIGUEINTES ERRORES:</h3> 
    <div style="text-align: left; margin-left: 10px; color: red; height: 300px; overflow: auto;">
  <small>
  <strong>
  *</strong>${errores.join("<br><strong>*</strong>")}
  </small>
  </div>
  </div>`,
  });
}

export function alertaExito(fnc: Function, titulo = "Movimiento exitoso") {
  fnc(false);
  return Toast.fire({
    icon: "success",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}

export function alertaError(titulo = "Movimiento fallido") {
  Toast.fire({
    icon: "error",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}

export function alertaInfo(titulo: string) {

  return Toast.fire({
    icon: "info",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });

}

export function alertaExitoConfirm(titulo: string) {
  return ToastConfirm.fire({
    icon: "success",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
    confirmButtonColor: "#af8c55",
  });
}

export function alertaErrorConfirm(titulo: string) {
  return ToastConfirm.fire({
    icon: "error",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
    confirmButtonColor: "#af8c55",
  });
}

// export function alertaEliminar(fnc:Function){
//   fnc();
// }
export const alertaEliminar = (  confirmedfunction: Function, cancelfunction: Function, title= "¿Desea eliminar elemento?") => {
 return Swal.fire({
    title: title,
    icon: "question",
    showCancelButton: true,
   
    cancelButtonColor: "#af8c55",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#15212f",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmedfunction();
    }else{
      cancelfunction();
    }

  });
};

