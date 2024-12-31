import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Footer.module.css";
import Logo from "../../assets/Logo/Logo.svg";
import { Link } from "react-scroll";
import insta from "../../assets/Icon/instagram.png";
import twitter from "../../assets/Icon/twitter.png";
import fb from "../../assets/Icon/facebook.png";

const Footer = () => {
  //Structure & layout of the footer
  return (
    <div className={classes.footer_bg}>
      <Container>
        <Row className={classes.row}>
          <Col lg={6}>
            <div className={classes.info}>
              <div className={classes.image_div}>
                <Link
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  <img
                    className={classes.navbar_brand}
                    src={Logo}
                    alt="logo"
                  ></img>
                </Link>
              </div>
              <div className={classes.content_div}>
                <p>
                  Solución para conseguir comidas para el hogar de forma fácil y
                  flexible. Puedes confiar en nosotros en cualquier lugar a través
                  de esta plataforma
                </p>
                <p>
                  &copy;2024 {" "}

                  <a
                    href="https://github.com/Alejandrin08/FoodtrackerClient.git"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.eniola_codes}
                  >
                    Food Tracker
                  </a>
                </p>
              </div>
            </div>
          </Col>

          <Col lg={3}>
            <div className={classes.about}>
              <h3>Acerca de</h3>
              <p>¿Por qué elegirnos?</p>
              <p>Sobre nosotros</p>
            </div>
          </Col>

          <Col lg={3}>
            <div className={classes.social}>
              <h3>Social</h3>
              <p>
                <img
                  src={insta}
                  alt="instagram"
                  className={classes.social_icon}
                ></img>
              </p>
              <p>
                <img
                  src={twitter}
                  alt="twitter"
                  className={classes.social_icon}
                ></img>
              </p>
              <p>
                <img
                  src={fb}
                  alt="facebook"
                  className={classes.social_icon}
                ></img>
              </p>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
  //END
};

export default Footer;
