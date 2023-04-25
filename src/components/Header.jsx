import { GiChaingun } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BiWallet } from "react-icons/bi";

export default function Header() {
  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between items-center font-bold">
      <Link to="/">
        <div className="flex items-center text-main">
          <GiChaingun size={28} />
          <div className="ml-1 text-xl text-cyan-200 ">LIKE</div>
          <div className="ml-1 text-xl text-yellow-200 ">LION</div>
          <div className="ml-1 text-xl">BCS_3</div>
        </div>
      </Link>
      <div>
        <button className="flex items-center p-2 bg-gray-800 rounded-full">
          <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
            <BiWallet />
          </div>
          <div className="ml-1">Connect</div>
        </button>
      </div>
    </header>
  );
}
