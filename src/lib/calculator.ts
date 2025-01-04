type INRRange = { [key: string]: string };

export type DosingTable = {
  1: string;
  2: INRRange;
  3: INRRange;
  4: INRRange;
  5: INRRange;
  6: INRRange;
};



export const calculateInitiationDose = (
  inr: number,
  day: keyof DosingTable,
  isSensitive: boolean
) => {
  const dosingTable: Record<number, string | INRRange> = isSensitive
    ? {
      1: "2.5 mg",
      2: { "<1.5": "2.5 mg", "1.5-1.9": "1-1.5 mg", "2-2.5": "0.5-1.5 mg", ">2.5": "Hold" },
      3: { "<1.5": "2.5-5 mg", "1.5-1.9": "1-2.5 mg", "2-3": "0.5-1.5 mg", ">3": "Hold" },
      4: { "<1.5": "5 mg", "1.5-1.9": "2.5-3.75 mg", "2-3": "0.5-2.5 mg", ">3": "Hold" },
      5: { "<1.5": "5 mg", "1.5-1.9": "3.75-5 mg", "2-3": "0.5-2.5 mg", ">3": "Hold" },
      6: { "<1.5": "5-7.5 mg", "1.5-1.9": "3.75-5 mg", "2-3": "0.5-5 mg", ">3": "Hold" }
    }
    : {
      1: "5-7.5 mg",
      2: { "<1.5": "5-7.5 mg", "1.5-1.9": "2.5-3.75 mg", "2-2.5": "1-2.5 mg", ">2.5": "Hold" },
      3: { "<1.5": "5-10 mg", "1.5-1.9": "2.5-5 mg", "2-3": "0-2.5 mg", ">3": "Hold" },
      4: { "<1.5": "7.5-10 mg", "1.5-1.9": "5-7.5 mg", "2-3": "1.25-5 mg", ">3": "Hold" },
      5: { "<1.5": "10 mg", "1.5-1.9": "7.5-10 mg", "2-3": "1.25-5 mg", ">3": "Hold" },
      6: { "<1.5": "7.5-12.5 mg", "1.5-1.9": "3.75-5 mg", "2-3": "1.25-7.5 mg", ">3": "Hold" }
    };

  const dayDosing = dosingTable[day];
  if (!dayDosing) return "Invalid day or INR value for initiation dosing.";

  if (typeof dayDosing === "string") {
    return `Day ${day}: Recommended dose: ${dayDosing}.`;
  }

  for (const rangeKey in dayDosing) {
    const [low, high] = rangeKey.includes("-") ? rangeKey.split("-") : [rangeKey, null];
    if (high && inr >= parseFloat(low) && inr <= parseFloat(high)) {
      return `Day ${day}, INR ${rangeKey}: Recommended dose: ${dayDosing[rangeKey]}.`;
    }
    if (rangeKey.startsWith("<") && inr < parseFloat(rangeKey.slice(1))) {
      return `Day ${day}, INR ${rangeKey}: Recommended dose: ${dayDosing[rangeKey]}.`;
    }
    if (rangeKey.startsWith(">") && inr > parseFloat(rangeKey.slice(1))) {
      return `Day ${day}, INR ${rangeKey}: Recommended dose: ${dayDosing[rangeKey]}.`;
    }
  }

  return "No matching INR range found.";
};

export const calculateWarfarinDose = (inr: number, currentDose: number) => {
  if (inr < 1.5) {
    let newDose = currentDose * 1.2;
    return `INR < 1.5: Increase dose by 20%. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr >= 1.5 && inr <= 1.9) {
    let newDose = currentDose * 1.1;
    return `INR 1.5-1.9: Increase dose by 10%. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr >= 2.0 && inr <= 3.0) {
    return `INR 2.0-3.0: INR is within the target range. No dose adjustment needed.`;
  } else if (inr >= 3.1 && inr <= 3.4) {
    let newDose = currentDose * 0.9;
    return `INR 3.1-3.4: Decrease dose by 10%. New dose: ${newDose.toFixed(2)} mg daily.`;
  } else if (inr >= 3.5 && inr <= 3.9) {
    let newDose = currentDose * 0.8;
    return `INR 3.5-3.9: Decrease dose by 20%. New dose: ${newDose.toFixed(2)} mg daily. Consider holding one dose.`;
  } else if (inr >= 4.0 && inr <= 4.9) {
    return `INR 4.0-4.9: Hold dose until INR returns to range, then decrease dose by 20-30%.`;
  } else if (inr >= 5.0) {
    return `INR ≥ 5.0: Urgent evaluation needed. Consider holding 1-2 doses and decreasing weekly dose by 10-20%.`;
  } else {
    return 'Invalid INR value. Please provide a valid number.';
  }
}