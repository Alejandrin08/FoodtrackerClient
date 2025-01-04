import React from "react";
import classes from "./HeroThreeContent.module.css";
import HeroThreeForm from "./HeroThreeForm";

const HeroThreeContent = (props) => {
  
  //Layout and structure of the Hero three (Third section) content
  return (
    <div className={classes.dish_content}>
      <div className={classes.dish_image_div}>
        <img className={classes.dish_img} src={props.src} alt="Dish" />
      </div>
      <div className={classes.dish_text_div}>
        <p>{props.name}</p>
        <HeroThreeForm  />
      </div>
      
    </div>
  );
  //END
};

export default HeroThreeContent;
