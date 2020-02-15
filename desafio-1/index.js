const express = require("express");
const app = express();
const port = 3333;

app.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// req body = { name: "Jeferson", email: "jeferson.wc@outlook.com"}

const projects = [];

function projectExist(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ message: "Projeto não encontrado" });
  }

  return next();
}

function projectRegister(req, res, next) {
  const { id } = req.body;
  const project = projects.find(p => p.id == id);

  if (project) {
    return res
      .status(400)
      .json({ message: "Esse id já esta sendo usado por outro projeto" });
  }

  return next();
}

function countLog(req, res, next) {
  console.count("conta as requisições : ");
  return next();
}

app.use(countLog);

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", projectRegister, (req, res) => {
  const { title, id } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

app.put("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

app.delete("/projects/:id", projectExist, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

app.post("/projects/:id/tasks", projectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

app.listen(port, () => console.log(`Example app listening on port port!`));
