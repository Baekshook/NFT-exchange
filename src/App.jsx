import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Header from "./components/Header";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [account, setAccount] = useState("");

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header account={account} setAccount={setAccount} />
          <Routes>
            <Route path="/" element={<Main account={account} />} />
            <Route path="/:tokenId" element={<Detail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
