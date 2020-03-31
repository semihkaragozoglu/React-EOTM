function handleResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.ok) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          response.json().then(json => resolve(json));
        } else {
          resolve();
        }
      } else {
        response.json().then((text) => {
          debugger;
          console.log("hata oluştu");
          return reject(text.errorMessage || "Hata Oluştu");
      }); 
    }
    });
  }
  
  function handleError(error) {
    return Promise.reject(error && error.message);
  }
  
  export const fetchHelper = {
    handleResponse,
    handleError
  };
  