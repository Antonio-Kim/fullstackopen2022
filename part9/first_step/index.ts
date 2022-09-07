import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  res.header("Content-Type", "application/json");
  if (
    typeof req.query.weight === "string" &&
    typeof req.query.height === "string"
  ) {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height)) {
      res.status(400).send({ error: "malformatted parameters" });
    }
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
