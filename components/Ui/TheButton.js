import React from "react";
import { useNavigate } from "react-router-dom"; 
import classes from "./TheButton.module.css";

const TheButton = (props) => {
  const navigate = useNavigate();  

  const handleClick = () => {
    if (props.to) {
      navigate(props.to); 
    }
    if (props.onClick) {
      props.onClick();  
    }
  };

  return (
    <button
      className={`${classes.button} ${props.className}`}
      type={props.type}
      onClick={handleClick}  
    >
      {props.children}
    </button>
  );
};

export default TheButton;
