import  { useEffect, useState } from 'react';
import axios from 'axios';

const CollectData = (url) => {
    const [dataState, setDataState] = useState({ data: [] });
    const apiUrl = url; // No need to use useState for the API URL
     useEffect(() => {
        console.log("Mounting or Re-rendering...");
        const fetchDataFromApi = async () => {
            try {

                const response = await axios.get(apiUrl);

                setDataState({ data: response.data }); // Update dataState with the response data
                
            } catch (e) {
                console.log(e);
            }
        };

        fetchDataFromApi();
     }, []); // Include apiUrl in the dependency array to re-fetch when it changes

    return [dataState]; // Return isFetching state as well for better control
};

export default CollectData;
