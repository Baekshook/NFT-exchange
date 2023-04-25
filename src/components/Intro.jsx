import { GiChaingun } from "react-icons/gi";

export default function Intro() {
  const ranNum = Math.floor(Math.random() * 1000) + 1;
  const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;

  return (
    <div className="bg-gradient-to-b from-transparent via-orange-200 to-purple-400 pt-10">
      <div className="max-w-screen-xl mx-auto px-4">
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
      </div>
    </div>
  );
}
