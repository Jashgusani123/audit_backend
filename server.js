import express from "express";
import { saveVersion, getVersions, deleteHistory } from "./controller.js";

const app = express();
app.use(express.json());

app.post("/save-version", saveVersion);
app.get("/versions", getVersions);
app.delete("/clear-history", deleteHistory);

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});
