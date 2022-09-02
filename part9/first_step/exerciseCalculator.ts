interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  let total: number = 0;
  let trainingDays: number = 0;
  let success: boolean;
  let rating: number;
  let ratingDescription: string;

  for (const day of hours) {
    if (day === 0) {
      continue;
    } else {
      total += day;
      trainingDays++;
    }
  }

  const average: number = total / periodLength;
  average > target ? (success = true) : (success = false);

  if (average < target) {
    rating = 1;
    ratingDescription = "not too bad but could be better";
  } else if (average >= target && average < 3) {
    rating = 2;
    ratingDescription = "good, you hit your target";
  } else {
    rating = 3;
    ratingDescription = "you excelled your target";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
