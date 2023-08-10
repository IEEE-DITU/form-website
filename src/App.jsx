import { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
// import { FormDataProvider } from "./pages/Submitresponse/FormDataContext";
import Loading from "./Components/Loading/Loading";
import Authentication from "./pages/Authentication/Authentication";
import NotFound from "./pages/404/NotFound";
import SubmitPage from "./pages/Submit/Submit";
import Submitresponse from "./pages/Submitresponse/Submitresponse";
import Formclosed from "./pages/Formclosed/Formclosed";
import "./App.css";

function MainApp() {
	const { currentUser } = useAuth();

	useEffect(() => {
		let vh = window.innerHeight;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		window.addEventListener("resize", function () {
			let vh = window.innerHeight;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
		window.addEventListener("load", function () {
			let vh = window.innerHeight;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	}, []);
	return (
    <div className="App">
      <Toaster />

      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              currentUser ? <Navigate to="/user" /> : <Navigate to="/auth" />
            }
          />
          <Route
            path="/auth"
            element={currentUser ? <Navigate to="/" /> : <Authentication />}
          />
          <Route
            path="/submitresponse"
            element={
             
                <Submitresponse />
              
            }
          />
          ;<Route path="/formclosed" element={<Formclosed />}></Route>;
          <Route
            path="/user/*"
            element={currentUser ? <Home /> : <Navigate to="/auth" />}
          />
          <Route path="/resetpass" element={<PasswordReset />} />
          <Route path="/form/:id" element={<SubmitPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
function App() {
	const { loading } = useAuth();
	return <>{loading ? <Loading /> : <MainApp />}</>;
}

export default App;
