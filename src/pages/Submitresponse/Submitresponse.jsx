import hands1 from "../../images/clap.png";
import "./Submitresponse.css";
import { Link, useLocation } from "react-router-dom";

const Submitresponse = () => {
  
  const location = useLocation();
	return (
    <div className="submittedPage">
      <div className="submittedContent">
        <u className="underline">
        <p className="formname">{location.state.name}</p>
        </u>
        <img className="clap" src={hands1} alt="not available"></img>
        <p className="thankyou">THANK YOU</p>
        <p className="ressub">
          {location.state.submitText?location.state.submitText:"Your response has been submitted successfully"}
          <br />
          <span
            style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "grey" }}
          >
            To submit another response{" "}
            <Link to={`/form/${location.state.id}`}>click here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Submitresponse;
