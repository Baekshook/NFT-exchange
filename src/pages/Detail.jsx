import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OpenseaLogo from "../components/OpenseaLogo";

export default function Detail() {
  const { tokenId } = useParams();
  const [metadata, setMetadata] = useState();

  const getNft = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
      );
      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNft();
  }, []);

  return (
    <div className="flex flex-col items-center xl:flex-row justify-center py-16 bg-gray-900">
      {metadata ? (
        <>
          <div className="max-w-[512px]">
            <img
              className="rounded-t-2xl"
              src={metadata.image}
              alt={metadata.name}
            />
            <ul className="grid grid-cols-4 gap-8 py-8 bg-gray-600 rounded-b-2xl text-center">
              {metadata.attributes.map((v, i) => {
                return (
                  <li key={i} className="mx-4 flex flex-col items-center">
                    <div className="text-xs text-gray-300">{v.trait_type}</div>
                    <div className="font-bold">{v.value}</div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="m-8">
            <div className="text-4xl flex items-center">
              <div>{metadata.name}</div>
              <div className="w-6 h-6 rounded-full flex justify-center items-center ml-2 text-white">
                <OpenseaLogo />
              </div>
            </div>
            <div className="mt-8 text-2xl">{metadata.description}</div>
          </div>
        </>
      ) : (
        <div>로딩중입니다...</div>
      )}
    </div>
  );
}
