const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const repository = repositories.find(repository => repository.id == id);
  if (!repository) response.status(400);
  repository.url = url;
  repository.title = title;
  repository.techs = techs;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id == id);
  if (!repository) response.status(400);
  else {
    index = repositories.findIndex(repository => repository.id == id);
    repositories[index] = {};
    response.status(204);
    return response.json({});
  }
  return response.json(repository);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id == id);
  if (!repository) response.status(400);
  repository.likes++;
  return response.json(repository);
});

module.exports = app;
