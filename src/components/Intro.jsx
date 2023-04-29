import { Link } from "react-router-dom";
import { CONTRACT_ADDRESS } from "../web3.config";
import OpenseaLogo from "./atoms/OpenseaLogo";
import RandomImg from "./molecules/RandomImg";

export default function Intro({ mintedNft, myNft }) {
  return (
    <div className="bg-gradient-to-b from-transparent via-orange-200 to-purple-700 pt-10">
      <div className="max-w-screen-xl mx-auto px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-700 text-9xl truncate opacity-50 pointer-events-none">
          Da Den Bu
        </div>
        <RandomImg />
        <div className="mt-4 text-2xl font-bold flex items-center text-black">
          Da Den Bu
          <div className="w-6 h-6 flex justify-center items-center ml-1 ">
            <OpenseaLogo />
          </div>
        </div>
        <Link to="/Minting">
          <button className="text-black font-bold">
            Mint is Live!🍀 (Click!)
          </button>
        </Link>
        <div className="mt-2 flex items-center text-gray-800">
          by
          <div className="text-black ml-2">{CONTRACT_ADDRESS}</div>
        </div>
        <div className="mt-2 text-gray-700">
          다덴부란(.env란 "environment"의 약어)은 소프트웨어 개발에서 자주
          사용되는 파일 형식 중 하나입니다.
        </div>
        <div className="text-gray-700">
          이 파일은 소프트웨어 개발자들이 프로젝트에서 사용되는 환경
          변수(environment variable)를 저장하는 데 사용됩니다.
        </div>
        <div className="py-4 text-center flex">
          <div>
            <div className="font-bold">1000</div>
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
