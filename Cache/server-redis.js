import express from "express";
import axios from "axios";
import redis from "redis";
import responseTime from "response-time";

const app = express();

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

async function fetchApiData(species) {
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  console.log("Request sent to the api");
  return apiResponse.data;
}

async function getSpeciesData(req, res) {
  const species = req.params.species;
  let results;
  let isCached = false;

  try {
    const cacheResults = await redisClient.get(species);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      results = await fetchApiData(species);
      if (results.length === 0) {
        throw "API empty";
      }
      await redisClient.set(species, JSON.stringify(results));
    }
    res.send({
      fromCache: isCached,
      data: results,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Data unavailable");
  }
}

app.use(responseTime());
app.get("/fish/:species", getSpeciesData);

const port = 3000;

app.listen(port, () => {
  console.log(`Server listenin on http://localhost:${port}`);
});
