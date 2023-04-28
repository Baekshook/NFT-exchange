import axios from "axios";
import { useEffect, useState } from "react";
import OpenseaLogo from "../components/OpenseaLogo";
import { TbFileDescription } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Modals from "../components/Modals";

const Detail = () => {
  const [metadata, setMetadata] = useState();
  const [suggestion, setSuggestion] = useState([]);

  const { tokenId } = useParams();

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
    <div className="flex flex-col xl:flex-row justify-center items-center py-16 bg-gray-900">
      {metadata ? (
        <>
          <div className="max-w-[512px]">
            <img className="rounded-t-2xl" src={metadata.image} alt="NFT" />
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
            <div className="flex mt-4">
              <Modals suggestion={suggestion} setSuggestion={setSuggestion} />
              <button className="text-base w-full rounded-2xl font-medium cursor-pointer shadow-sm bg-gray-700 hover:bg-yellow-400 ">
                구매하기
              </button>
            </div>
          </div>
          <div className="ml-32 flex items-center justify-center flex-col">
            <div className="text-4xl flex items-center">
              <div>{metadata.name}</div>
              <div className="w-8 h-8 rounded-full flex justify-center items-center ml-2 text-gray-950">
                <OpenseaLogo />
              </div>
            </div>
            <div className="mt-8 text-2xl">{metadata.description}</div>
            <div className="px-10 py-5 border-solid border-[1px] rounded-[20px] min-h-[480px] mt-[32px]">
              <div className=" mr-20 font-semibold text-lg mb-4 flex items-start justify-start">
                <TbFileDescription size={24} className="mr-2" />
                제안 현황
              </div>
              <div className="h-[520px] overflow-auto md:mt-4">
                {suggestion.length === 0 ? (
                  <div className="mt-60 text-center font-bold text-xl">
                    Not Suggestion yet.
                  </div>
                ) : (
                  <div className="mt-[80px] text-center text-lg">
                    {suggestion.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>로딩중입니다...</div>
      )}
    </div>
  );
};

export default Detail;
