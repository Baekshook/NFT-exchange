import { useEffect, useState } from "react";

export default function RandomImg({ roundedOption, whSize }) {
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
      <img
        src={imgSrc}
        alt="NFT"
        className={`${whSize} ${roundedOption} absolute`}
      />
      <div
        className={`${whSize} rounded-full bg-white text-gray-950 flex justify-center items-center`}
      >
        Loading...
      </div>
    </div>
  );
}
