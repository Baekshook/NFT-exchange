import { GiChaingun } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { FaApple } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header({ account, setAccount }) {
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

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCoinPrice();
    }, 4000);
    return () => clearInterval(interval);
  }, []); // useEffect로 실시간 시세 불러오기 (4초마다 갱신)

  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between items-center font-bold">
      <Link to="/">
        <div className="flex items-center text-main">
          <GiChaingun size={28} />
          <div className="ml-1 text-xl text-cyan-200 ">LIKE</div>
          <div className="ml-1 text-xl text-yellow-200 ">LION</div>
          <div className="ml-1 text-xl">BCS3</div>
        </div>
      </Link>
      <div className="flex items-center">
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
        {account ? (
          <div className="flex items-center p-2 bg-gray-800 rounded-full ml-4">
            <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
              <FaApple />
            </div>
            <div className="ml-1">
              {account.substring(0, 4)}...
              {account.substring(account.length - 4)}
            </div>
          </div>
        ) : (
          <button
            className="flex items-center p-2 bg-gray-800 rounded-full ml-4"
            onClick={onClickAccount}
          >
            <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
              <BiWallet />
            </div>
            <div className="ml-1">Connect</div>
          </button>
        )}
      </div>
    </header>
  );
}
