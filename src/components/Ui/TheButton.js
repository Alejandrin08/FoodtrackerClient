import React from "react";
import { useNavigate } from "react-router-dom"; 
import classes from "./TheButton.module.css";

const TheButton = (props) => {
  const navigate = useNavigate();  

  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e);  
    }
    if (props.to) {
      navigate(props.to); 
    }
  };

  return (
    <button
      className={`${classes.button} ${props.className}`}
      type={props.type || "button"} 
      onClick={handleClick}  
      disabled={props.disabled} 
      style={props.style} 
    >
      {props.children}
    </button>
  );
};

export default TheButton;
