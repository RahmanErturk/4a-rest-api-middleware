import { log } from "console";
import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/courses", (req, res, next) => {
  console.log("Middleware für courses");
  next();
});

app.get("*", (req, res, next) => {
  console.log("Middleware für GET");
  next();
});

app.get("/courses", (req, res, next) => {
  console.log("Middleware für GET /courses");
  next();
});

const server = app.listen(3000, () => console.log("listening on port 3000"));

const courseInfos = {
  courses: [{ id: 1, name: "DCI Webentwicklung" }],
  participants: [
    {
      id: 1,
      name: "Benjamin Meyer",
      age: 22,
      course: "DCI Online Marketing",
    },
    {
      id: 2,
      name: "Rahman Ertürk",
      age: 26,
      course: "DCI Webentwicklung",
    },
    {
      id: 3,
      name: "Vural Colak",
      age: 31,
      course: "DCI Webentwicklung",
    },
    {
      id: 4,
      name: "Hüseyin Günaydabcin",
      age: 35,
      course: "DCI Test-Automation",
    },
  ],
  modules: [
    { id: 1, name: "User interface" },
    { id: 2, name: "Programming Basics" },
    { id: 3, name: "Single Page Applications" },
    { id: 4, name: "Backend" },
  ],
};

// ==================================================

app.get("/courses", (req, res) => {
  res.send(courseInfos.courses);
});

app.post("/courses", (req, res) => {
  courseInfos.courses.push({
    id: courseInfos.courses.length + 1,
    ...req.body,
  });
  res.status(201).send();
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  courseInfos.courses = courseInfos.courses.map((course) => {
    return course.id === +id ? { ...course, ...req.body } : course;
  });
  res.status(204).end();
});

app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  courseInfos.courses = courseInfos.courses.filter(
    (course) => course.id !== +id
  );
  res.status(204).end();
});

// ===================================================

app.get("/participants", (req, res) => {
  res.send(courseInfos.participants);
});

app.post("/participants", (req, res) => {
  courseInfos.participants.push({
    id: courseInfos.participants.length + 1,
    ...req.body,
  });
  res.status(201).send();
});

app.put("/participants/:id", (req, res) => {
  const { id } = req.params;
  courseInfos.participants = courseInfos.participants.map((participant) => {
    return participant.id === +id
      ? { ...participant, ...req.body }
      : participant;
  });
  res.status(204).end();
});

app.delete("/participants/:id", (req, res) => {
  const { id } = req.params;
  courseInfos.participants = courseInfos.participants.filter(
    (participant) => participant.id !== +id
  );
  res.status(204).end();
});

// ==================================================

app.get("/modules", (req, res) => {
  res.send(courseInfos.modules);
});

app.post("/modules", (req, res) => {
  courseInfos.modules.push({
    id: courseInfos.modules.length + 1,
    ...req.body,
  });
  res.status(201).send();
});

app.put("/modules/:id", (req, res) => {
  const { id } = req.params;
  courseInfos.modules = courseInfos.modules.map((elem) => {
    return elem.id === +id ? { ...elem, ...req.body } : elem;
  });
  res.status(204).end();
});

app.delete("/modules/:id", (req, res) => {
  const { id } = req.params;
  courseInfos.modules = courseInfos.modules.filter((elem) => elem.id !== +id);
  res.status(204).end();
});

// ==================================================

// =============== Aufgabe 2 ==================

/**
 * Produkte
 * /Products = GET/Status = 200
 * /Products?category=... = GET/Status = 200
 * /Products/:id = GET/Status = 200
 *
 * //   /Kategorien
 * //   /Kategorien/   GET/Status = 200
 * //   /Kategorien/:Kategorie/Produkte = GET/Status = 200
 *
 * /Benutzerkonten
 * /Benutzerkonten/:id GET/Status = 200
 * /Benutzerkonten     POST/Status = 201
 * /Benutzerkonten/:id PUT/Status = 204
 * /Benutzerkonten/:id DELETE/Status = 204
 *
 * /Benutzerkonten/:id/Bestellungen GET/Status = 200
 * /Benutzerkonten/:id/Bestellungen/:id GET/Status = 200
 * /Benutzerkonten/:id/Bestellungen POST/Status = 201
 * /Benutzerkonten/:id/Bestellungen/:id PUT/Status = 204
 * /Benutzerkonten/:id/Bestellungen/:id DELETE/Status = 204
 */
