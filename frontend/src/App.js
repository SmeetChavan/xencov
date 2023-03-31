import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import AddMoney from "./pages/AddMoney";

import { PriceProvider } from "./context/currentGoldContext";

function App() {
  return (
    <>
      <PriceProvider>

        <BrowserRouter>

          <Navbar />

          <Routes>

            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/addmoney" element={<AddMoney />}></Route>

          </Routes>

        </BrowserRouter>

      </PriceProvider>
    </>
  );
}

export default App;