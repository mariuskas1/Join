const BASE_URL = "https://marius-kasparek.developerakademie.org/join_server/api/";




export const getCurrentUserData = () => {
    const currentUserLocalStorage = localStorage.getItem("currentUser");
    return currentUserLocalStorage ? JSON.parse(currentUserLocalStorage) : null;
}


export async function getAllContacts(token) {
    try {
      const response = await fetch(`${BASE_URL}/contacts/`, {
        method: "GET",
        headers: { Authorization: `Token ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch contacts");
      return await response.json(); 
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error; 
    }
  }


export async function postData(url, data = {}, token) {
    try {
      const response = await fetch(BASE_URL + url, {
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
  
  