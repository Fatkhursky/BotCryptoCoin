//@ts-nocheck
import axios  from 'axios';


export default async function getData() {
    try {
      const { data } = await axios.get(
        "https://www.binance.me/api/v3/ticker/price"
      );
      let binance = {
        LINAUSDT: "",
        COSUSDT: "",
        BTCUSDT: ""
      };
  
      data.forEach((e) => {
        if (e.symbol === "LINAUSDT") return (binance.LINAUSDT = e.price);
        if (e.symbol === "COSUSDT") return (binance.COSUSDT = e.price);
        if (e.symbol === "BTCUSDT") return (binance.BTCUSDT = e.price);
      });
      return binance
    } catch (error) {
      console.log(88, error);
      console.error(error);
      return error;
    }
  }
  