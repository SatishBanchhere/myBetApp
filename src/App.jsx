import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { BetMoney } from "./pages/BetMoney";
import { LandingPage } from "./pages/LangindPage";
import { Results } from "./components/Results";
import { Transactions } from "./components/TransactionResults";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/bet" element={<BetMoney />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/ShowHistory" element={<Results />} />
          <Route path="/ShowTransactionHistory" element={<Transactions></Transactions>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
