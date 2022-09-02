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

interface Exercise {
  days: Array<number>;
  target: number;
}

const parseArgument = (args: Array<string>): Exercise => {
  if (args.length < 2) throw new Error("No parameters were added");

  const [target, ...argv] = args.splice(2);
  const dayArray = argv.map(item =>{
    if (isNaN(Number(item))) {
      throw new Error("The input is not a number")
    } else {
      return Number(item);
    }
  });
  
  if (isNaN(Number(target))) {
    throw new Error("Target is not a number");
  } else {
    return {
      days: dayArray,
      target: Number(target)
    }
  }
}

try {
  const { days, target } = parseArgument(process.argv);
  console.log(calculateExercises(days, target))
} catch (error: unknown) {
  let errorMessage = "something went wrong...";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}