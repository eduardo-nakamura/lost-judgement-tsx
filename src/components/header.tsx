import { Link } from "react-router-dom";


function HeaderJudgement() {
    return (
        <nav
        style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
        }}
    >
        <Link to="/robotic">Robotics</Link> |{" "}
        <Link to="/">Home</Link>
    </nav>
    );
  }
  
  export default HeaderJudgement;
  