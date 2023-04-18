import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";
import responseTime from "response-time";

const myCache = new NodeCache({ stdTTL: 600 });

async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

const app = express();

// Adiciona response time no header do response
app.use(responseTime());

// Chamada sem utilização do cache
app.get("/posts", async (req, res) => {
  console.log("get/posts");

  try {
    const posts = await getPosts();
    res.status(200).send(posts);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/posts-cache", async (req, res) => {
  console.log("get/posts-cache");

  try {
    let posts = myCache.get("allPosts");
    if (posts == null) {
      posts = await getPosts();
      myCache.set("allPosts", posts, 300);
    } else {
      console.log("posts from cache");
    }

    res.status(200).send(posts);
  } catch (err) {
    res.sendStatus(500);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listenin on http://localhost:${port}`);
});
