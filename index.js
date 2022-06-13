const express = require("express");
const app = express();

app.use(express.json());

const applicants = [
  {
    id: 1,
    name: "nahuel",
    surname: "ramirez",
    role: "applicant",
    online: false,
  },
  {
    id: 2,
    name: "martin",
    surname: "rodolfo",
    role: "applicant",
    online: false,
  },
  {
    id: 3,
    name: "mariano",
    surname: "ernesto",
    role: "applicant",
    online: false,
  },
];

app.get("/", (req, res) => {
  res.send("Node JS api");
});

app.get("/api/users/applicants", (req, res) => {
  res.send(applicants);
});

app.get("/api/users/applicants/:id", (req, res) => {
  const applicant = applicants.find((c) => c.id === parseInt(req.params.id));
  if (!applicant) return res.status(404).send("Usuario no encontrado");
  else res.send(applicant);
});

app.post("/api/users/applicants", (req, res) => {
  const applicant = {
    id: applicants.length + 1,
    name: req.body.name,
    surname: req.body.surname,
    role: req.body.role,
    online: req.body.online === "false",
  };

  applicants.push(applicant);
  res.send(applicant);
});

app.delete("api/users/applicants/:id", (req, res) => {
  const applicant = applicants.find((c) => c.id === parseInt(req.params.id));
  if (!applicant) return res.status(404).send("Usuario no encontrado");

  const index = applicants.indexOf(applicant);
  applicants.splice(index, 1);
  res.send(applicant);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));
