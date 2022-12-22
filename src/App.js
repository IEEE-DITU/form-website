import './App.css';
import Login from './Components/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Components/Signup/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
