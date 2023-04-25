import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:tokenId" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
