import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (body.daily_exercises !instanceof Array<String> || body.target !instanceof Number) {
    return res.status(400).json({
      error: "malformatted parameters"
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(body.daily_exercises, body.target);
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
