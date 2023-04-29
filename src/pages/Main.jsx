import Intro from "../components/Intro";
import { contract } from "../web3.config";
import { useEffect, useState } from "react";
import Nfts from "../components/Nfts";

export default function Main({ account }) {
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);


  const getMintedNft = async () => {
    try {
      if (!contract) return; // contract 없는 경우 아래 로직 실행되지 않게 해주는 코드 (안전장치)

      const response = await contract.methods.totalSupply().call();

      setMintedNft(response);
      setPage(parseInt((parseInt(response) - 1) / 10) + 1);
      // 10 - 1 = 9 / 10 = 0 + 1 = 1page
      // 31 - 1 = 30 / 10 = 3 + 1 = 4page
      // 975 - 1 = 974 / 10 = 97 + 1 = 98page
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNft = async () => {
    try {
      if (!contract || !account) return;

      const response = await contract.methods.balanceOf(account).call();

      setMyNft(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMintedNft();
  }, []);

  useEffect(() => {
    getMyNft();
  }, [account]);

  return (
    <div>
      <Intro mintedNft={mintedNft} myNft={myNft} />
      <Nfts page={page} mintedNft={mintedNft} />
    </div>
  );
}
