const calculateBmi = (height: number, weight: number): string => {
  const result = weight / Math.pow((height / 100), 2);
  if (result < 16) {
    return "Underweight (severe thinness)";
  } else if (result >= 16 && result < 17) {
    return "Underweight (Moderate thinness)";
  } else if (result >= 17 && result < 18.5) {
    return "underweight (Mild thinnes)";
  } else if (result >= 18.5 && result < 25) {
    return "Normal (healthy weight)";
  } else if (result >= 25 && result < 30) {
    return "Overweight (Pre-obese)";
  } else if (result >= 30 && result < 35) {
    return "Obese (Class I)";
  } else if (result >= 35 && result < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

console.log(calculateBmi(180, 74));
