import { Outlet, NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography';
import logo from "../src/assets/lostjdugment_logo_white.svg"
import { menuList } from "./assets/mockup";

import './App.css';

function App() {
  const navContainerStyle = { borderBottom: "solid 1px #fff",  display: 'flex', justifyContent: 'space-around', }  
  
  return (
    <div>
      <nav style={navContainerStyle}>
        
        <NavLink to="/home" style={{display:'flex'}}>
          <img src={logo} style={{width: '200px'}}/>
        </NavLink>
        {menuList.map((route) => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                color: isActive ? "#35dfdf" : "#FFF",
                fontWeight: isActive ? "bolder" : "normal",
                textDecoration: 'none',
                fontSize: '1rem', 
                padding: "1rem 0",
                lineHeight: '2rem'
              })}
              to={`${route.route}`}
              key={route.id}
            >
              {route.title}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
