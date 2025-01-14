export function calculateAcitromDose(inr: number, currentDose: number): string {
  if (inr <= 1.3) {
    const newDose = currentDose + 1;
    return `Add 1 mg/day to the current dose. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr >= 1.4 && inr <= 2.0) {
    const newDose = currentDose + 0.5;
    return `Add 0.5 mg/day to the current dose. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr >= 2.1 && inr <= 3.0) {
    return "INR is within the target range. Maintain current dose.";
  } else if (inr >= 3.1 && inr <= 3.5) {
    const newDose = currentDose - 0.5;
    return `Decrease dose by 0.5 mg/day. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr >= 3.6 && inr <= 4.0) {
    const newDose = currentDose - 1;
    return `Decrease dose by 1 mg/day. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr > 4.0) {
    return "Stop the drug for 3 days and repeat INR. Consult your physician.";
  } else {
    return "Invalid INR value.";
  }
}