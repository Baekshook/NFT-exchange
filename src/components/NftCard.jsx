import { TbDiscountCheck } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function NftCard({ tokenId, metadata }) {
  return (
    <div className="rounded-2xl bg-gray-800 pb-4">
      <img className="rounded-t-2xl" src={metadata.image} alt={metadata.name} />
      <div className="mt-4 text-xl font-bold flex items-center px-4 text-gray-300">
        Da Den Bu
        <div className="w-6 h-6 rounded-full flex justify-center items-center ml-1 text-white">
          <TbDiscountCheck size={24} color="aqua" />
        </div>
      </div>
      <div className="mt-4 text-2xl font-bold px-4"># {tokenId}</div>
      <div className="mt-4 text-xl flex justify-end px-4">
        <Link to={`${tokenId}`}>
          <button className="bg-gray-50 text-gray-950 px-4 py-2 rounded-xl hover:bg-gray-500">
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
}
