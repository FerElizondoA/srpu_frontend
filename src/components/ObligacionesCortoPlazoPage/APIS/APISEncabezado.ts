import axios from "axios";

export const getMunicipioUOrganismo=()=>{
    axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      });
}