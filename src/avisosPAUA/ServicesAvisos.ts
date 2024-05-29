import axios from "axios"

export const servicesAvisosPAUA={
    getAvisos: async ()=>{
        try {
            const response = await axios.get('http://10.200.4.199:5000'+ '/api/AdminAvisosVigentes', 
            {params:{'IdApp':localStorage.getItem('IdApp')||''}});//process.env.REACT_APP_APPLICATION_LOGIN 
            return response.data;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
    }
}