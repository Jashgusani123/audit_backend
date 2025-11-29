import express from "express";
import { saveVersion, getVersions, deleteHistory } from "./controller.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["https://audit-frontend-two.vercel.app","http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.post("/save-version", saveVersion);
app.get("/versions", getVersions);
app.delete("/clear-history", deleteHistory);

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});
