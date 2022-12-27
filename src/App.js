import "./App.css";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Home from "./pages/Home/Home";
import Myforms from "./Components/Myforms/Myforms";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import EmailVerify from "./Components/EmailVerify/EmailVerify";
import ResponsePage from "./pages/ResponsePage/ResponsePage";
import Temp from "./Components/Temporary/Temp";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Toaster />

      <Router>
        <Temp />
        <Routes>
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <Signup />}
          />
          {/* <Route
						exact
						path="/"
						element={currentUser ? <Home /> : <Navigate to="/login" />}
					/> */}
          <Route
            exact
            path="/"
            element={currentUser ? <Myforms /> : <Navigate to="/login" />}
          />
          <Route path="/resetpass" element={<PasswordReset />} />
          <Route path="/emailverify" element={<EmailVerify />} />
          <Route
            path="/forms/responses"
            element={currentUser ? <ResponsePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
