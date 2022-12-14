import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);

  next();
});

// app.use("/courses", (req, res, next) => {
//   console.log("Middleware für courses");
//   next();
// });

// app.get("*", (req, res, next) => {
//   console.log("Middleware für GET");
//   next();
// });

// app.get("/courses", (req, res, next) => {
//   console.log("Middleware für GET /courses");
//   next();
// });

const server = app.listen(3000, () => console.log("listening on port 3000"));

const courseInfos = {
  courses: [{ id: 1, name: "DCI Webentwicklung" }],
  participants: [
    {
      id: 1,
      firstName: "Shannah",
      lastName: "Curton",
      email: "scurton0@weather.com",
      age: 46,
    },
    {
      id: 2,
      firstName: "Arvie",
      lastName: "Stading",
      email: "astading1@drupal.org",
      age: 39,
    },
    {
      id: 3,
      firstName: "Cassandry",
      lastName: "Parcells",
      email: "cparcells2@foxnews.com",
      age: 23,
    },
  ],
  modules: [
    { id: 1, name: "User interface" },
    { id: 2, name: "Programming Basics" },
    { id: 3, name: "Single Page Applications" },
    { id: 4, name: "Backend" },
  ],
};

let lastID = 3;
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

app.post("/participants", (req, res, next) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.age
  ) {
    return next(new Error("Some data is missing!"));
  }

  if (req.body.age < 18) return next(new Error("Invalid age!"));

  lastID++;

  courseInfos.participants.push({
    ...req.body,
    id: lastID,
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

app.use((req, res) => {
  console.error(`${req.url} not found`);
  res.status(404).end();
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(400).json(error.message);
});

// ==================================================

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
