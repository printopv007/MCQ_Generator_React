import axios from "axios";

export async function fetchData(endpoint) {
    try { 
      const response = await axios.get(`http://127.0.0.1:8000/${endpoint}`);
      console.log(response.data);
      return response.data;
      
    } catch (error) {
        console.log(error);
    }
  }