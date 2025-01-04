import React, { useEffect, useState } from "react";
import TheButton from "../Ui/TheButton";
import Tooltip from "../Ui/Tooltip";

const HeroThreeForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setIsLoggedIn(false);
      }
    }
  }, [token]);
  //using useRef and useState hooks
  

  //Layout and structure of form to be passed to the HeroThreeSection component
  return (
    <>
      <Tooltip  />
      <form >
        
        <TheButton to={isLoggedIn ? "/restaurants" : "/login"}>
          <i className="bi bi-plus"></i> Ver más
        </TheButton>
       
      </form>
    </>
  );
};
//END

export default HeroThreeForm;
