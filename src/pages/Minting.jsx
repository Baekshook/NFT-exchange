import { useState } from "react";
import { contract, CONTRACT_ADDRESS } from "../web3.config";

export default function Minting({ account }) {
  const [counter, setCounter] = useState(0);

  const plusCounter = () => {
    if (counter >= 5) {
      alert("최대 민팅 개수는 5개까지 입니다.");
    } else {
      setCounter(counter + 1);
    }
  };

  const minusCounter = () => {
    if (counter < 1) {
      alert("민팅 개수는 음수가 될 수 없습니다.");
    } else {
      setCounter(counter - 1);
    }
  };

  const onClickMint = async () => {
    if (window.ethereum.networkVersion !== "80001") {
      alert("경고! 현재 네트워크가 Mumbai network가 아닙니다.");
      return;
    }

    try {
      await contract.methods.batchMint(counter).send({
        to: CONTRACT_ADDRESS,
        from: account,
        data: "0xa0712d680000000000000000000000000000000000000000000000000000000000000001",
      });
    } catch (error) {
      console.error(error);
      alert("민팅에 실패하였습니다.");
    } finally {
      alert("민팅 성공!");
    }
  };
  return (
    <>
      <div className="bg-purple-300 min-h-screen flex justify-center items-center flex-col">
        <div className="text-black font-bold text-2xl">Mint is Live! 🍀</div>
        <button
          className="mt-4 bg-black rounded-full p-4 text-purple-300 font-hi text-xl hover:bg-gray-700"
          onClick={onClickMint}
        >
          민팅하기
        </button>
        <div className="mt-2 text-black font-bold text-2xl">{counter}</div>
        <div className="flex mt-3">
          <button
            onClick={plusCounter}
            className="mr-3 bg-black rounded-full p-3 text-purple-300 font-hi text-xl hover:bg-gray-700"
          >
            +
          </button>
          <button
            onClick={minusCounter}
            className="bg-black rounded-full text-purple-300 p-3 font-hi  text-2xl hover:bg-gray-700"
          >
            -
          </button>
        </div>
      </div>
    </>
  );
}
