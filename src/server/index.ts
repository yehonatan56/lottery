import express from "express";
import { api } from "./api.js";

const app = express();
app.use(express.json());
// This code is responsible for serving the frontend files.

const frontendFiles = process.cwd() + "/dist";
app.use(express.static(frontendFiles));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(frontendFiles + "/index.html");
  } else {
    next(); // תן ל־api או שאר ה־middleware לטפל בזה
  }
});

app.get("/api", (req, res) => {
  res.send("api");
});
app.use(api);

app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));
