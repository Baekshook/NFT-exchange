import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-red-100">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:tokenId" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
