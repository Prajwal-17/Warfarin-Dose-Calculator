import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { Activity, Calculator, Calendar } from "lucide-react";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Logo from "./assets/Logo.png"


const App = () => {

  const [inr, setInr] = useState<number>();
  const [dose, setDose] = useState<number>();
  const [day, setDay] = useState<number>();
  const [sensitive, setSensitive] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [calculationType, setCalculationType] = useState<string>("")

  console.log(calculationType)
  return (<>

    <div className="min-h-screen bg-gray-100 px-12 py-12">
      <div className="space-y-8 mx-auto max-w-md">

        <div className="flex items-center gap-3">
          <div className="size-9">
            <img src={Logo} />
          </div>
          <div className="text-blue-800 font-bold text-xl">Narayana Hrudayalaya</div>
        </div>
        <div>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center font-bold text-2xl text-blue-800">Warfarin Dose Calculator</CardTitle>
              <CardDescription className="text-center text-gray-600">Calculate the appropriate Warfarin dose based on INR value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="Inr" className="text-blue-800">INR Value</Label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="Enter INR value"
                    className="pl-10"
                    value={inr}
                    onChange={(e) => setInr(Number(e.target.value))}
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

              {calculationType == "initiation" ? (
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
                        onChange={(e) => setDay(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-700">Sensitive to Warfarin?</Label>
                    <RadioGroup
                      value={sensitive}
                      onValueChange={(value) => setSensitive(value)}
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
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="dose" className="text-blue-800">Current Dose (mg)</Label>
                  <div className="relative">
                    <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Enter the current dose"
                      className="pl-10"
                      value={dose}
                      onChange={(e) => setDose(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <Button className="w-full bg-blue-600 text-white font-semibold text-center hover:bg-blue-700">
                Calculate Dose
              </Button>

            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  </>
  )
}

export default App


