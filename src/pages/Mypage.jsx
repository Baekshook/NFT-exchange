import { useEffect, useState } from "react";
import { contract, SALE_CONTRACT_ADDRESS, saleContract } from "../web3.config";
import axios from "axios";
import MyNftCard from "../components/MyNftCard";

export default function Mypage({ account }) {
  const [myNft, setMyNft] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [saleStatus, setSaleStatus] = useState(false);
  const [nftPrice, setNftPrice] = useState([])

  const getMyNft = async () => {
    try {
      const response = await contract.methods.getTokens(account).call();

      setMyNft(response.map((g, i) => g[0]));
    } catch (error) {
      console.error(error);
    }
  };

  const getNfts = async (p) => {
    try {
      let nftArray = [];
      let nftPriceArray = [];
      setNfts();

      for (let i = 0; i < myNft.length; i++) {
        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${myNft[i]}.json`
        );
        const nftPrice = await saleContract.methods
          .getTokenPrice(myNft[i])
          .call();
        nftArray.push({
          tokenId: myNft[i],
          metadata: response.data,
          nftPrice
        });
      }
      console.log(nftArray);
      setNfts(nftArray);
      setNftPrice(nftPriceArray);
    } catch (err) {
      console.error(err);
    }
  };

  const getIsApprovedAll = async () => {
    try {
      const response = await contract.methods
        .isApprovedForAll(account, SALE_CONTRACT_ADDRESS)
        .call();

      if (response) {
        setSaleStatus(response);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if(!account) return;

      const response = await contract.methods.setApprovalForAll(SALE_CONTRACT_ADDRESS, !saleStatus).send({from: account});

      if(response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!account) return;
    getIsApprovedAll();
    getMyNft();
  }, [account]);

  useEffect(() => {
    if (!myNft) {
      return;
    }
    getNfts(1);
  }, [myNft]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-4">
        <div className="ml-4 text-2xl font-bold text-gray-20 font-bye">
          마이 페이지
          <div className="mt-5">MY NFTS</div>
        </div>
        <div className="flex items-center">
          <div className="inline-block">
            Sale Status : {saleStatus ? "True" : "False"}
          </div>
          <button
            className={`ml-3 p-0.5 ${
              saleStatus ? "bg-purple-400" : "bg-green-400"
            } rounded-full font-bye font-bold`}
            onClick={onClickApproveToggle}
          >
            {saleStatus ? "Cancel" : "Approve"}
          </button>
        </div>
        <div className="max-w-screen-xl mx-auto pt-4">
          {account ? (
            <ul className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center gap-8">
              {nfts ? (
                nfts.map((v, i) => {
                  return (
                    <MyNftCard
                      key={i}
                      tokenId={v.tokenId}
                      metadata={v.metadata}
                      nftPrice={v.nftPrice}
                    />
                  );
                })
              ) : (
                <div>로딩중입니다...</div>
              )}
            </ul>
          ) : (
            <div className="min-h-screen flex justify-center items-center text-3xl font-bye pb-[270px]">
              Please Connect to Metamask
            </div>
          )}
        </div>
      </div>
    </>
  );
}
