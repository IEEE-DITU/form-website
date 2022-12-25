import './App.css';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Home from './pages/Home/Home';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/resetpass" element={<PasswordReset />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
