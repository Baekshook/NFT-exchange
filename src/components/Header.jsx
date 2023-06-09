import { GiChickenOven } from "react-icons/gi";
import { Link } from "react-router-dom";
import WalletLogIn from "./molecules/WalletLogIn";
import CoinPrice from "./molecules/CoinPrice";

export default function Header({ account, setAccount }) {
  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between items-center font-bold">
      <Link to="/">
        <div className="flex items-center text-main">
          <GiChickenOven size={28} />
          <div className="ml-1 mt-1 text-xl text-white font-bye ">
            BAEKSHOOK
          </div>
          {/* <div className="ml-1 text-xl text-yellow-200">LION</div> */}
          <div className="mt-1 text-xl font-bye">.io</div>
        </div>
      </Link>
      <div className="flex items-center">
        <CoinPrice />
        <Link to="/myPage">
          <button className="p-2 bg-gray-800 rounded-full ml-4">
            마이 페이지
          </button>
        </Link>
        <WalletLogIn account={account} setAccount={setAccount} />
      </div>
    </header>
  );
}
