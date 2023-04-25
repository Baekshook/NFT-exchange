import { GiChaingun } from "react-icons/gi";
import { CONTRACT_ADDRESS } from "../web3.config";

export default function Intro({ totalNft, mintedNft, myNft }) {
  const ranNum = Math.floor(Math.random() * 1000) + 1;
  const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;

  return (
    <div className="bg-gradient-to-b from-transparent via-orange-200 to-purple-700 pt-10">
      <div className="max-w-screen-xl mx-auto px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-700 text-9xl truncate opacity-50 pointer-events-none">
          Da Den Bu
        </div>
        <div className="relative">
          <img
            src={imgSrc}
            alt="NFT"
            className="w-40 h-40 rounded-full absolute"
          />
          <div className="w-40 h-40 rounded-full bg-white text-gray-950 flex justify-center items-center">
            Loading...
          </div>
        </div>
        <div className="mt-4 text-2xl font-bold flex items-center">
          Da Den Bu
          <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center ml-3 text-gray-950">
            <GiChaingun size={16} />
          </div>
        </div>
        <div className="mt-2 flex items-center text-gray-800">
          by
          <div className="text-black ml-2">{CONTRACT_ADDRESS}</div>
        </div>
        <div className="mt-2 text-gray-700">
          다덴부란(.env란 "environment"의 약어)은 소프트웨어 개발에서 자주
          사용되는 파일 형식 중 하나입니다. 이 파일은 소프트웨어 개발자들이
          프로젝트에서 사용되는 환경 변수(environment variable)를 저장하는 데
          사용됩니다.
        </div>
        <div className="py-4 text-center flex">
          <div>
            <div className="font-bold">{totalNft}</div>
            <div className="text-gray-300">총 NFT</div>
          </div>
          <div className="ml-4">
            <div className="font-bold">{mintedNft}</div>
            <div className="text-gray-300">발행된 NFT</div>
          </div>
          <div className="ml-4">
            <div className="font-bold">{myNft}</div>
            <div className="text-gray-300">내 NFT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
