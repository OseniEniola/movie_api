var   axios= require("axios");

 const HttpService = {
  get:async function get (url){
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return []
  }
}
}

module.exports = HttpService
