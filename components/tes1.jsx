import React from "react";
import { useState, useEffect } from "react";

const Tes1 = () => {
  const [tes, setTes] = useState(false);
  useEffect(() => {
    console.log("didmount");
    //console.log(tes)
    return () => {
      //console.log('didupdate')
      console.log(tes);
    };
  }, [tes]);
  return (
    <div>
      <div onClick={() => setTes(!tes)}>Tes</div>;
    </div>
  );
};

export default Tes1;
