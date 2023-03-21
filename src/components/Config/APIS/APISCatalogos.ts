import axios from "axios";
import Swal from "sweetalert2";

export function getClavesDeInscripcion(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-claveDeInscripcion',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getDestinos(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-destinos',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getEntePublico(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-entePublicoObligado',
    data: {},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getEstatus(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-estatus',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getFuentesDePago(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-fuenteDePago',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getFuentesAlternasDePago(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-fuenteAlternaDePago',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getInstitucionesFinancieras(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-institucionesFinancieras',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getObligadosSolidariosAvales(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-obligadoSolidarioAval',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getTiposDeDocumento(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-tiposDocumento',
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}

export function getTipoEntePublico(setState: Function) {
  axios({
    method: 'get',
    url: process.env.REACT_APP_APPLICATION_BACK + '/api/get-tiposEntePublico',
    data: {},
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken") || "",
    },
  })
    .then(({ data }) => {
      setState(data.data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Mensaje",
        text: "(" + error.response.status + ") " + error.response.data.msg,
      })
    });
}
