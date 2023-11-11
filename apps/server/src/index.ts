import cors from "cors";
import "dotenv/config";
import express from "express";
import { FingerPrint } from "fpscanner";
import { analyze } from "./analyze";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const port = 3030;

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});
app.post("/analyze", async (req, res): Promise<void> => {
  const body: FingerPrint = req.body;
  if (
    typeof body !== "object" ||
    Array.isArray(body) ||
    !Object.keys(body).length
  ) {
    res.status(400).send({ error: "Bad request" });
    return;
  }
  const result = analyze(body);
  console.log("Request ID: ", result.id, ", Result: ", result.result);
  res.send(result);
});

app.listen(port, () => {
  console.log(`🚀 Application listening at http://localhost:${port}`);
});
