import cors from "cors";
import "dotenv/config";
import express from "express";
import { FingerPrint } from "fpscanner";
import { analyze } from "./analyze";
import { CORS_ORIGIN, PORT } from "./config";
import { getResult } from "./results-local-storage";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

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
  const response = await analyze(body);
  console.log("Request ID: ", response.id, ", Result: ", response.bot.result);
  res.send(response);
});

app.get("/verify/:id", async (req, res): Promise<void> => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ error: "Bad request" });
    return;
  }
  console.log("Verifying request ID: ", id);
  const result = await getResult(id);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Application listening at http://localhost:${PORT}`);
});
