import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      className={`${classes.input_amount} ${props.className}`}
      ref={ref}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value} 
      disabled={props.disabled}
      {...props.input}
    />
  );
});

export default Input;
