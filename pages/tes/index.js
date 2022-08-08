import React, { useState, useEffect } from "react";

const App = () => {
const [waterLevel, setWaterLevel] = useState(0);
const [actionType, setActionType] = useState();

useEffect(() => {
  const interval = setInterval(() => {
    if (actionType == "increase" && waterLevel < 5)
      setWaterLevel(waterLevel + 1);
    if (actionType == "decrease" && waterLevel > 0)
      setWaterLevel(waterLevel - 1);
  }, 1000);
  return () => clearInterval(interval);
}, [actionType, waterLevel]);

return (
   <div>
   <div>Bathtub</div>
   <button onClick={() => setActionType("increase")}>
     increaseWaterLevel
   </button>
   <button onClick={() => setActionType("decrease")}>
     decreaseWaterLevel
   </button>
   <h1>{waterLevel}</h1>
 </div>
 );
};

export default App;