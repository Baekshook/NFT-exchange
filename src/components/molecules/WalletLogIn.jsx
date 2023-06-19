import { BiWallet } from "react-icons/bi";
import { FaApple } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function WalletLogIn({account, setAccount}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (res) => {
      setAccount(res[0]);
      setIsLoggedIn(true);
      localStorage.setItem("walletAddress", res[0]);
    };

    const onClickAccount = async () => {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        handleLogin(res);
      } catch (error) {
        console.error(error);
      }
    };

    const handleLogout = () => {
      setAccount("");
      setIsLoggedIn(false);
      localStorage.removeItem("walletAddress");
    };

    useEffect(() => {
      const storedWalletAddress = localStorage.getItem("walletAddress");
      if (storedWalletAddress) {
        setAccount(storedWalletAddress);
        setIsLoggedIn(true);
      }
    }, [setAccount]);

    useEffect(() => {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", onClickAccount);
      }
    });

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="flex items-center p-2 bg-gray-800 rounded-full ml-4">
            <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
              <FaApple />
            </div>
            <div className="ml-1">
              {account.substring(0, 4)}...
              {account.substring(account.length - 4)}
            </div>
          </div>
          <button
            className="p-2 bg-gray-800 rounded-full ml-4"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </>
      ) : (
        <button
          className="flex items-center p-2 bg-gray-800 rounded-full ml-4"
          onClick={onClickAccount}
        >
          <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
            <BiWallet />
          </div>
          <div className="ml-1">Connect</div>
        </button>
      )}
    </>
  );
}
