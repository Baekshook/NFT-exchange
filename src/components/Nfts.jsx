import { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "./NftCard";

export default function Nfts({ page, mintedNft }) {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nfts, setNfts] = useState();

  const getNfts = async (p) => {
    try {
      let nftArray = [];

      setNfts();

      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;
        // 0 + 1 ~ 9 + 1 = 1 ~ 10
        // if p = 3 -> (3 - 1) * 10 = 20 -> 21~30

        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
        );
        nftArray.push({ tokenId, metadata: response.data });
      }

      setNfts(nftArray);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickPage = (p) => () => {
    setSelectedPage(p);

    getNfts(p);
  };

  const pageComponent = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`ml-4 text-2xl font-bold hover:text-white ${
            i + 1 === selectedPage ? "text-white" : "text-gray-400"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1} <span className="text-base">페이지</span>
        </button>
      );
    }

    return pageArray;
  };

  useEffect(() => {
    getNfts(1);
  }, []);

  // useEffect(() => {
  //   console.log(nfts);
  // }, [nfts]);
  
  return (
    <div className="max-w-screen-xl mx-auto pt-4">
      <div>{pageComponent()}</div>
      <ul className="mt-8 grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-8">
        {nfts ? (
          nfts.map((v, i) => {
            return (
              <NftCard key={i} tokenId={v.tokenId} metadata={v.metadata} mintedNft={mintedNft} />
            );
          })
        ) : (
          <div>로딩중입니다...</div>
        )}
      </ul>
    </div>
  );
}
