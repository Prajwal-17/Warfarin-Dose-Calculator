import {
  Activity,
  AlertCircle,
  Calculator,
  Calendar
} from "lucide-react";
import { Label } from "./ui/label";
import {
  RadioGroup,
  RadioGroupItem
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { calculateInitiationDose, calculateWarfarinDose, DosingTable } from "../lib/calculateWarfarin";

const WarfarinComponent = () => {

  const [inr, setInr] = useState('');
  const [dose, setDose] = useState('');
  const [day, setDay] = useState('');
  const [calculationType, setCalculationType] = useState<string>("maintenance");
  const [sensitive, setSensitive] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const numericDay = Number(day);

  const calculateDose = () => {
    setResult("");
    setError("");

    if (calculationType === "maintenance") {
      if (inr && dose) {
        const newDose = calculateWarfarinDose(Number(inr), Number(dose));
        setResult(newDose);
      } else {
        setError("All fields are required");
      }
    } else if (calculationType === "initiation") {
      if (inr && numericDay != null && sensitive != null) {
        const newDose = calculateInitiationDose(
          Number(inr),
          numericDay as keyof DosingTable,
          sensitive
        );
        setResult(newDose);
      } else {
        setError("All fields are required");
      }
    }
  }

  return (<>
    <div className="space-y-2">
      <Label htmlFor="Inr" className="text-blue-800">INR Value</Label>
      <div className="relative">
        <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="number"
          placeholder="Enter INR value"
          className="pl-10"
          value={inr}
          onChange={(e) => setInr(e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label className="text-blue-700">Calculation Type</Label>
      <RadioGroup
        value={calculationType}
        onValueChange={(value) => setCalculationType(value)}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="maintenance" id="maintenance" />
          <Label htmlFor="maintenance">Maintenance</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="initiation" id="initiation" />
          <Label htmlFor="initiation">Initiation</Label>
        </div>
      </RadioGroup>
    </div>

    {calculationType === "initiation" && (
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="day" className="text-blue-800">Day (1-6)</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="number"
              placeholder="Enter the day"
              className="pl-10"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-blue-700">Sensitive to Warfarin?</Label>
          <RadioGroup
            value={sensitive ? "yes" : "no"}
            onValueChange={(value) => setSensitive(value === "yes")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    )}

    {calculationType === "maintenance" && (
      <div className="space-y-2">
        <Label htmlFor="dose" className="text-blue-800">Current Dose (mg)</Label>
        <div className="relative">
          <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="number"
            placeholder="Enter the current dose"
            className="pl-10"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
          />
        </div>
      </div>
    )}

    <Button onClick={calculateDose} className="w-full bg-blue-600 text-white font-semibold text-center hover:bg-blue-700">
      Calculate Dose
    </Button>

    {error && (
      <div className="flex items-center space-x-2 text-red-500 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}

    {result && (
      <div className="border border-green-200 bg-green-50 rounded-lg space-y-2 px-3 py-2">
        <h2 className="text-xl text-green-800 font-bold">Recommended Dosage:</h2>
        <div className="text-green-700 leading-relaxed">{result}</div>
      </div>
    )}
  </>)
}

export default WarfarinComponent