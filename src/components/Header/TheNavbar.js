import React from "react";
import NavCartButton from "./NavCartButton";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import TheButton from "../Ui/TheButton";
import classes from "./TheNavbar.module.css";
import Logo from "../../assets/Logo/Logo.svg";
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TheNavbar = (details) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleScroll = (target) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.username);
        setUserRole(decodedToken.roles);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserName(null);
    setUserRole(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="xl"
        className={`${classes.navbar} fixed-top`}
        data-aos="fade-down"
        data-aos-easing="ease-out"
        data-aos-duration="2000"
      >
        <Navbar.Brand className={classes.navbar_brand}>
          <ScrollLink to="hero" spy={true} smooth={true} offset={-50} duration={500}>
            <img src={Logo} alt="My logo"></img>
          </ScrollLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={classes.toggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${classes.nav__linkgroup} ms-auto`}>
            <Nav.Link
              className={`${classes.nav__link} ${classes.firstnav__link} me-4`}
              onClick={() => handleScroll("hero")}
            >
              Home
            </Nav.Link>

            {/*
            <Nav.Link
              className={`${classes.nav__link} me-4`}
              onClick={() => handleScroll("dishes")}
            >
              Our dishes
            </Nav.Link>
            */}

            {/*
            <Nav.Link
              className={`${classes.nav__link} me-4`}
              onClick={() => handleScroll("testimonials")}
            >
              Testimonials
            </Nav.Link>
            */}


            {!isLoggedIn ? (
              <>
                <Nav.Link className={`${classes.nav__link} me-4`} onClick={() => handleScroll("why")}>
                  ¿Por qué elegirnos?
                </Nav.Link>

                <Nav.Link className={`${classes.nav__link} me-4`} onClick={() => handleScroll("about")}>
                  Sobre nosotros
                </Nav.Link>

                <TheButton to="/login" className={`me-4`}>
                  Iniciar Sesión
                </TheButton>

                <TheButton to="/signup" className={`${classes.btn_navbar_secundary} me-4`}>
                  Registrarse
                </TheButton>
              </>
            ) : (
              <div className={classes.userMenu}>
                <Link to="/restaurants" className={`${classes.nav__link} me-4`}>
                  Restaurantes
                </Link>
                <p>{userName}</p>
                <div className={classes.dropdown}>
                  <button className={classes.dropdownButton}>▼</button>
                  <div className={classes.dropdownContent}>
                    <Link to="/profile" className={classes.dropdownItem}>
                      Modificar Cuenta
                    </Link>
                    {userRole === "ROLE_OWNER" && (
                      <Link to="/edit-restaurant" className={classes.dropdownItem} >
                        Modificar Restaurante
                      </Link>
                    )}
                    {userRole === "ROLE_CLIENT" && (
                      <Link to="/register-restaurant" className={classes.dropdownItem}>
                        Registrar Restaurante
                      </Link>
                    )}
                    <button onClick={handleLogout} className={classes.dropdownItem}>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
                <Nav.Link href="#buttons" className={`${classes.nav__link}`}>
                  <NavCartButton onClick={details.onShowCart} />
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default TheNavbar;
