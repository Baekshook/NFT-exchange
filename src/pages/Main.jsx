import Intro from "../components/Intro";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import { useEffect, useState } from "react";
import Nfts from "../components/Nfts";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export default function Main({ account }) {
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);

  const getTotalNft = async () => {
    try {
      if (!contract) return; // contract 없는 경우 아래 로직 실행되지 않게 해주는 코드 (안전장치)

      const response = await contract.methods.totalNft().call();

      setTotalNft(response);
    } catch (error) {
      console.error(error);
    }
  };


  const getMintedNft = async () => {
    try {
      if (!contract) return;

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
    getTotalNft();
    getMintedNft();
  }, []);
 
  useEffect(() => {
    getMyNft();
  }, [account]);

  return (
    <div>
      <Intro totalNft={totalNft} mintedNft={mintedNft} myNft={myNft} />
      <Nfts page={page} mintedNft={mintedNft} />
    </div>
  );
}
