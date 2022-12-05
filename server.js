import express from "express";

const app = express();

const server = app.listen(3000, () => console.log("listening on port 3000"));

app.get("/", (req, res) => {});
