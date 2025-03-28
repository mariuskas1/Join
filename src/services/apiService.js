const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";



async function postData(url, data = {}, token) {
    try {
      const response = await fetch(BASE_URL1 + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }
  
  export { postData };