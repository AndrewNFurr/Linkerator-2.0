async function fetchAPI(url, method="GET", sendData=null) {
    const fetchOptions = {
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
  
  export default fetchAPI;