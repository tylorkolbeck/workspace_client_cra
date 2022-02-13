const API_URL = process.env.REACT_APP_API_URL;

function fetchApi(url, options) {
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }
  return fetch(API_URL + url, options)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, data: data.message };
      }
    })
    .catch((error) => {
      return { success: false, data: error.message };
    });
}

export default fetchApi;
