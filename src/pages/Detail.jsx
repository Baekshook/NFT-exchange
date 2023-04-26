import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="flex justify-center py-16 bg-gray-900">
      {metadata ? (
        <div>
          <img
            className="rounded-t-2xl"
            src={metadata.image}
            alt={metadata.name}
          />
        </div>
      ) : (
        <div>로딩중입니다...</div>
      )}
    </div>
  );
}
