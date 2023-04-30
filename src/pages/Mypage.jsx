import { useEffect, useState } from "react";
import { contract } from "../web3.config";
import axios from "axios";

export default function Mypage({ account }) {
  const [myNft, setMyNft] = useState(0);
  const [nfts, setNfts] = useState([]);

  const getMyNft = async () => {
    try {
      const response = await contract.methods.getTokens(account).call();

      setMyNft(response.map((g, i) => g[0]));
    } catch (error) {
      console.error(error);
    }
  };

  const getNfts = async () => {
    try {
      let nftArray = [];

      setNfts();

      for (let i = 0; i < myNft.length; i++) {
        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${myNft[i]}.json`
        );
        console.log(myNft[i]);
        nftArray.push({ metadata: response.data });
      }
      setNfts(nftArray);
  
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyNft();
  }, [account]);

  useEffect(() => {
    getNfts();
  }, [account]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getNfts();
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [account]);

  return <div>{myNft}</div>;
}
