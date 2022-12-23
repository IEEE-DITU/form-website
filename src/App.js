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
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/resetpass" element={<PasswordReset/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
