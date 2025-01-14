import {
  Activity,
  AlertCircle,
  Calculator,
} from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { calculateAcitromDose } from "../lib/calculateAcitrom";

const AcitromComponent = () => {

  const [inr, setInr] = useState('');
  const [dose, setDose] = useState('');
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calculateDose = () => {
    setResult("");
    setError("");

    if (inr && dose) {
      const newDose = calculateAcitromDose(Number(inr), Number(dose));
      setResult(newDose);
    } else {
      setError("All fields are required!")
    }
  }

  return (<>

    {/* <div>
      hello
    </div> */}
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

export default AcitromComponent