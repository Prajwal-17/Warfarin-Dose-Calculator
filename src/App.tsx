import { useState } from "react"

const App = () => {

  const [inr, setInr] = useState<number>();
  const [dose, setDose] = useState<number>();
  const [result, setResult] = useState<string>("")

  const calculateWarfarinDose = (inr: number, currentDose: number) => {
    if (inr < 1.5) {
      let newDose = currentDose * 1.2;
      setResult(`INR < 1.5: Increase dose by 20%. New dose: ${newDose.toFixed(2)} mg daily.`);
    } else if (inr >= 1.5 && inr <= 1.9) {
      let newDose = currentDose * 1.1;
      setResult(`INR 1.5-1.9: Increase dose by 10%. New dose: ${newDose.toFixed(2)} mg daily.`);
    } else if (inr >= 2.0 && inr <= 3.0) {
      setResult(`INR 2.0-3.0: INR is within the target range. No dose adjustment needed.`);
    } else if (inr >= 3.1 && inr <= 3.4) {
      let newDose = currentDose * 0.9;
      setResult(`INR 3.1-3.4: Decrease dose by 10%. New dose: ${newDose.toFixed(2)} mg daily.`);
    } else if (inr >= 3.5 && inr <= 3.9) {
      let newDose = currentDose * 0.8;
      setResult(`INR 3.5-3.9: Decrease dose by 20%. New dose: ${newDose.toFixed(2)} mg daily. Consider holding one dose.`);
    } else if (inr >= 4.0 && inr <= 4.9) {
      setResult(`INR 4.0-4.9: Hold dose until INR returns to range, then decrease dose by 20-30%.`);
    } else if (inr >= 5.0) {
      setResult(`INR ≥ 5.0: Urgent evaluation needed. Consider holding 1-2 doses and decreasing weekly dose by 10-20%.`);
    } else {
      setResult('Invalid INR value. Please provide a valid number.')
    }
  }


  return (<>

    <h1>Warfarin Dose</h1>
    <div>
      <label htmlFor="inr">Current Inr Value</label>
      <input
        id="inr"
        type="number"
        value={inr}
        onChange={(e) => { setInr(Number(e.target.value)) }}
      /> <br />
      <label htmlFor="dose">Daily dose in mg</label>
      <input
        id="dose"
        type="number"
        value={dose}
        onChange={(e) => { setDose(Number(e.target.value)) }}
      /> <br />

      {/* @ts-ignore */}
      <button onClick={() => { calculateWarfarinDose(inr, dose) }}>
        Calculate
      </button>

      <div >
        <span>Result :- </span>{result}
      </div>

    </div>

  </>
  )
}

export default App


