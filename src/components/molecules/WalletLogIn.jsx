import { BiWallet } from "react-icons/bi";
import { FaApple } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function WalletLogIn({ account, setAccount }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleLogin = (res) => {
    setAccount(res[0]);
    setIsLoggedIn(true);
    localStorage.setItem("walletAddress", res[0]);
  };

  const onClickAccount = async () => {
    if (!window.ethereum) {
      toast.error("메타마스크 설치가 필요합니다.", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    const res = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    handleLogin(res);

    try {
      const accounts = await toast.promise(
        window.ethereum.enable(),
        {
          pending: "Metamask 지갑 연동 중",
        },
        { closeButton: true },
        { position: toast.POSITION.TOP_CENTER }
      );
      setAccount(accounts[0]);
      localStorage.setItem("walletAddress", accounts[0]);
      toast.success(`${accounts[0].slice(0, 13)}...님 환영합니다.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch {
      toast.error("로그인 실패! 다시 시도해주세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  // useEffect(() => {
  //   if (refresh === true) {
  //     alert("로그아웃 되었습니다.");
  //     setRefresh(false);
  //   }
  // }, [refresh]);

  const handleLogout = () => {
    toast.success(
      "로그아웃 되었습니다.",
      { delay: 5000 },
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    alert("로그아웃 되었습니다.");
    setAccount("");
    setIsLoggedIn(false);
    localStorage.removeItem("walletAddress");
    setRefresh(true);
    window.location.reload();
  };

  async function handleDone() {
    if (account) {
      toast.warn("엇 ..또 로그인 하실려구요?!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  }

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const handleChangeAccounts = () => {
      if (!account) {
        return;
      }

      const changedAccount = window.ethereum?.selectedAddress;

      if (account !== changedAccount) {
        window.location.reload();
        toast.success(
          `${changedAccount.slice(0, 5)}..계정이 바뀌셨군요 ㅎㅎ!!`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        alert(`${changedAccount.slice(0, 5)}..계정이 바뀌셨군요 ㅎㅎ!!`);
        setAccount(changedAccount);
        localStorage.setItem("walletAddress", changedAccount);
      }
    };

    window.ethereum?.on("accountsChanged", handleChangeAccounts);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleChangeAccounts);
    };
  }, [account, setAccount]);

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setAccount(storedWalletAddress);
      setIsLoggedIn(true);
    }
  }, [setAccount]);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const networkObj = {
      1001: "바오밥 테스트넷",
      8217: "메인넷",
      1: "이더리움 메인넷",
      5: "고얼리 테스트넷",
      80001: "뭄바이 테스트넷",
      137: "폴리곤 메인넷",
    };

    const handleNetworkChanged = () => {
      setAccount("");
      // handleLogout();
      setIsLoggedIn(false);
      localStorage.removeItem("walletAddress");
      toast.warn(
        `네트워크가 ${
          networkObj[window.ethereum.networkVersion]
        }으로 바뀌었습니다. 다시 로그인 해주세요.`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    };

    window.ethereum?.on("networkChanged", handleNetworkChanged);
    return () => {
      window.ethereum?.removeListener("networkChanged", handleNetworkChanged);
    };
  }, [setAccount]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <button
            className="flex items-center p-2 bg-gray-800 rounded-full ml-4"
            onClick={handleDone}
          >
            <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
              <FaApple />
            </div>
            <div className="ml-1">
              {account.substring(0, 4)}...
              {account.substring(account.length - 4)}
            </div>
          </button>
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
