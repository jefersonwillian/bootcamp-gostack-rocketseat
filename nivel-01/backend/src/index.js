const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
app.use(express.json());
const projects = [];

function logRequests(resquest, response, next) {
  const { method, url } = resquest;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log("logLabel", logLabel);

  return next();
}

app.use(logRequests);

app.get("/projects", (resquest, response) => {
  const { title } = resquest.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post("/projects", (resquest, response) => {
  const { title, owner } = resquest.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(projects);
});

app.put("/projects/:id", (resquest, response) => {
  const { id } = resquest.params;
  const { title, owner } = resquest.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (resquest, response) => {
  const { id } = resquest.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("🚀 back-end starded!");
});
