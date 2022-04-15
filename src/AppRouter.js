import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login";
import Empire from "./Modules/Empire";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/empire" element={<Empire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
