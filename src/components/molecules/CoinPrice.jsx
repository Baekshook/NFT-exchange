import { useState, useEffect } from "react";
import axios from "axios";

export default function CoinPrice() {
  const [coinPrice, setCoinPrice] = useState();

  const getCoinPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.upbit.com/v1/ticker?markets=KRW-BTC,%20KRW-ETH,%20KRW-MATIC"
      );
      setCoinPrice([
        { symbol: "BTC", price: response.data[0].trade_price },
        { symbol: "ETH", price: response.data[1].trade_price },
        { symbol: "MATIC", price: response.data[2].trade_price },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCoinPrice();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCoinPrice();
    }, 4000);
    return () => clearInterval(interval);
  }, []); // useEffect로 실시간 시세 불러오기 (4초마다 갱신)

  return (
    <>
      {coinPrice && (
        <ul className="flex text-gray-400 text-sm">
          {coinPrice.map((v, i) => {
            return (
              <li key={i} className="ml-2">
                {v.symbol}: {v.price.toLocaleString()}K₩
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
