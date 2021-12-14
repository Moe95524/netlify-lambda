// A smol example of how you can bring in external data
// Used on the home page: ![bird of the day]({{ birdpic }})

const axios = require("axios");

module.exports = async () => {
  const result = await axios.get("https://some-random-api.ml/animal/birb");

  return result.data.image;
  // Example return: https:\/\/i.some-random-api.ml/9SxfuZhSPH.png
};
