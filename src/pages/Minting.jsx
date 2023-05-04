import { useState } from "react";
import { contract, CONTRACT_ADDRESS } from "../web3.config";
import NftTotals from "../components/molecules/NftTotals";
import RandomImg from "../components/molecules/RandomImg";
import MintCount from "../components/atoms/MintCount";

export default function Minting({ account }) {
  const [counter, setCounter] = useState(0);

  const onClickMint = async () => {
    if (!account) {
      alert("ERROR: 메타마스크 지갑을 연결해주세요!");
      return;
    }

    if (window.ethereum.networkVersion !== "80001") {
      alert("경고! 현재 네트워크가 Mumbai network가 아닙니다.");
      return;
    }

    if (counter === 0) {
      alert("ERROR: 민팅 개수를 입력하세요!");
      return;
    }

    try {
      const result = await contract.methods.batchMint(counter).send({
        to: CONTRACT_ADDRESS,
        from: account,
        data: "0xa0712d680000000000000000000000000000000000000000000000000000000000000001",
      });
      if (result != null) {
        console.log(result);
        alert("민팅에 성공하였습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("민팅에 실패하였습니다.");
    }
  };

  return (
    <>
      <div className="bg-purple-300 min-h-screen flex justify-center items-center flex-col">
        <div className="text-black font-bold text-3xl mb-7 font-bye">
          Mint is Live !! 🍀
        </div>
        <div className="flex flex-row  gap-28">
          <div className="flex flex-col gap-5">
            <RandomImg roundedOption={"rounded-lg"} whSize={"w-60 h-60"} />
            <NftTotals />
          </div>
          <div className="flex flex-col justify-center items-center mb-5">
            <MintCount counter={counter} setCounter={setCounter} />
            <button
              onClick={onClickMint}
              className="font-bye relative inline-flex items-center justify-center p-1.5 mb-2 mr-2 overflow-hidden text-2xl text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-7 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
                MINT
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
