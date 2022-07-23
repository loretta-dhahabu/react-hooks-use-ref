import React, { useEffect, useRef, useState } from "react";
import { makeRandomNumber } from "../utils";
// import { addPoint } from "../utils/chart";

function Ticker() {
  const [price, setPrice] = useState({ value: 0, ticks: 0 });
  const [color, setColor] = useState("black");
  // create the ref and set its initial value
  const prevPrice = useRef(price);
  const canvasRef = useRef();
  const prevPriceRef = useRef(price);
  // set the new value of the ref (note: this doesn't trigger a re-render)
  

  // useEffect( () =>
  // {
  //   // use the current value of the ref
  //   addPoint(canvasRef.current, prevPrice.current, price);
  // }, [price]);

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((price) => ({
        ticks: price.ticks + 1,
        value: makeRandomNumber(),
      }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;
    if (price > prevPrice) {
      setColor("green");
    } else if (price < prevPrice) {
      setColor("red");
    } else {
      setColor("black");
    }
    // set the new value of the ref (note: this doesn't trigger a re-render)
    prevPriceRef.current = price;
  }, [price]);

  return (
    <div>
      <h1>TickerChart</h1>
      <canvas ref={canvasRef} width={600} height={400} />
      <h2 style={{ color: color }}>Price: ${price.value}</h2>
    </div>
  );
}

export default Ticker;
