import { useEffect, useState } from "react";

export default function RandomImg() {
  const [ranNum, setRanNum] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRanNum(Math.floor(Math.random() * 700) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;
  return (
    <div className="relative">
      <img src={imgSrc} alt="NFT" className="w-40 h-40 rounded-full absolute" />
      <div className="w-40 h-40 rounded-full bg-white text-gray-950 flex justify-center items-center">
        Loading...
      </div>
    </div>
  );
}
