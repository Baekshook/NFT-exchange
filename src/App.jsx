import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Header from "./components/Header";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Minting from "./pages/Minting";
import Mypage from "./pages/Mypage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [account, setAccount] = useState("");

  return (
    <ChakraProvider>
      <ToastContainer
        autoClose={2000}
        theme="dark"
      />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header account={account} setAccount={setAccount} />
          <Routes>
            <Route path="/" element={<Main account={account} />} />
            <Route path="/:tokenId" element={<Detail />} />
            <Route path="/minting" element={<Minting account={account} />} />
            <Route path="/myPage" element={<Mypage account={account} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
