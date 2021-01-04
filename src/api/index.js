import axios from 'axios';

async function fetchAPI(url, method="GET", sendData=null) {
    const fetchOptions = {
      mode: "no-cors",
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    if (sendData) {
      fetchOptions.body = JSON.stringify(sendData);
    }
    
    const response = await fetch(url, fetchOptions);
    console.log("this is what we are sending in the fetch", fetchOptions);
    console.log("this is the initial response:", response);
    const data = await response.json();
    
    console.log("result from fetch in api index file:", data);
    return data;
  }

  export const increaseCountClicker = async (_id, currentCount) => {
    const response = await axios.patch(`http://localhost:3001/api/links/${_id}`, {
      clickCount: currentCount + 1,
    });
  
    return response.status === 204;
  };
  
  export default fetchAPI;