import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Header from "./components/Header";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Minting from "./pages/Minting";

function App() {
  const [account, setAccount] = useState("");

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header
            account={account}
            setAccount={setAccount}
            onClickAccount={onClickAccount}
          />
          <Routes>
            <Route path="/" element={<Main account={account} />} />
            <Route path="/:tokenId" element={<Detail />} />
            <Route path="/minting" element={<Minting account={account} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
