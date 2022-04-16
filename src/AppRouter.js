import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login";
import Empire from "./Modules/Empire";
import Signup from "./Modules/Signup";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/empire" element={<Empire />} />
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
