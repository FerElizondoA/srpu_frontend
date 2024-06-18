import axios from "axios"


export const servicesAvisosPAUA={
    getAvisos: async ()=>{
        try {
            const response = await axios.get(process.env.REACT_APP_APPLICATION_LOGIN + '/api/AdminAvisosVigentes', 
            {params:{'IdApp':localStorage.getItem("IdApp")}});//process.env.REACT_APP_APPLICATION_LOGIN 
            return response.data;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
    }
}