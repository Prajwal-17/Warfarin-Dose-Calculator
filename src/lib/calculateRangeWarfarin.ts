import { calculateInitiationDose, DosingTable } from "./calculateWarfarin";

type TargetRange = "2-3" | "2.5-3.5";

interface DoseCalculationParams {
  inr: number;
  currentDose: number;
  calculationType: string;
  day: keyof DosingTable;
  isSensitive: boolean;
  targetRange: TargetRange;
}

export const calculateRangeWarfarin = ({
  inr,
  currentDose,
  calculationType,
  day,
  isSensitive,
  targetRange,
}: DoseCalculationParams): string => {
  if (!currentDose || currentDose <= 0) {
    throw new Error("Invalid current dose.");
  }

  if (targetRange === "2-3") {
    if (calculationType === "maintenance") {
      if (inr < 1.5) {
        return "INR < 1.5: Increase weekly dose by 20%.";
      } else if (inr < 2) {
        return "INR 1.5-1.9: Increase weekly dose by 10%.";
      } else if (inr <= 3) {
        return "INR 2.0-3.0: INR is within target range. No dose adjustment needed.";
      } else if (inr <= 3.5) {
        return "INR 3.1-3.5: Decrease weekly dose by 10%.";
      } else if (inr <= 4.9) {
        return "INR 3.6-4.9: Hold 1 dose and decrease by 10-20%.";
      } else {
        return "INR ≥ 5.0: Hold 2 doses, decrease by 10-20%, and evaluate.";
      }
    } else if (calculationType === "initiation") {
      return calculateInitiationDose(inr, day, isSensitive);
    }
  } else if (targetRange === "2.5-3.5") {
    if (calculationType === "maintenance") {
      if (inr < 2) {
        return "INR < 2: Increase weekly dose by 20%.";
      } else if (inr < 2.5) {
        return "INR 2.0-2.4: Increase weekly dose by 10%.";
      } else if (inr <= 3.5) {
        return "INR 2.5-3.5: INR is within target range. No dose adjustment needed.";
      } else if (inr <= 4) {
        return "INR 3.6-4.0: Decrease weekly dose by 10%.";
      } else if (inr <= 4.9) {
        return "INR 4.1-4.9: Hold 1 dose and decrease by 10-20%.";
      } else {
        return "INR > 5.0: Urgent evaluation needed. Hold 2 doses and decrease by 10-20%.";
      }
    } else if (calculationType === "initiation") {
      return calculateInitiationDose(inr, day, isSensitive);
    }
  }

  throw new Error("Unsupported target range.");
}