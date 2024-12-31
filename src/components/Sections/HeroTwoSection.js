import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./HeroTwoSection.module.css";
import hamimg from "../../assets/Icon/hamburger.svg";
import deliveryimg from "../../assets/Icon/delivery-man.svg";
import topimg from "../../assets/Icon/top-food.svg";

const HeroTwoSection = () => {
  //Rendering the HeroTwo section
  return (
    <section id="why">
      <Container>
        <Row
          className={`${classes.row} mx-auto`}
          data-aos="fade-up"
          data-aos-easing="ease-out"
          data-aos-duration="700"
        >
          <Col xs={12}>
            <div className={classes.header_div}>
              <h2>¿Por qué elegirnos?</h2>
              <p>Esto es lo que hace que nuestro producto sea diferente</p>
            </div>
          </Col>
        </Row>

        <Row className={classes.row_cards}>
          <Col
            lg={4}
            className={classes.first_col}
            data-aos="zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="700"
            data-aos-delay="100"
          >
            <div className={`${classes.card_one} ${classes.card}`}>
              <div className={classes.card_content}>
                <div className={classes.card_image_div}>
                  <img src={hamimg} alt="Hanmburger"></img>
                </div>
                <div className={classes.card_text_div}>
                  <h5>Fácil de ordenar</h5>
                  <p>
                  Pide comida con un solo clic y selecciona todos los 
                  alimentos para pedir en cualquier momento y con comodidad y facilidad.{" "}
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col
            lg={4}
            data-aos="zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="700"
            data-aos-delay="200"
          >
            <div className={`${classes.card_two} ${classes.card}`}>
              <div className={classes.card_content}>
                <div className={classes.card_image_div}>
                  <img src={deliveryimg} alt="Delivery man"></img>
                </div>
                <div className={classes.card_text_div}>
                  <h5>Entrega rápida</h5>
                  <p>
                  Entrega de alimentos rápida y confiable, y se entregan
                   en el horario y lugar de entrega, cualquier día, a cualquier hora.
                  </p>
                </div>
              </div>
            </div>
          </Col>

          <Col
            lg={4}
            className={classes.last_col}
            data-aos="zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="700"
            data-aos-delay="300"
          >
            <div className={`${classes.card_three} ${classes.card}`}>
              <div className={classes.card_content}>
                <div className={classes.card_image_div}>
                  <img src={topimg} alt="Thumbs up"></img>
                </div>
                <div className={classes.card_text_div}>
                  <h5>100% calidad</h5>
                  <p>
                  Ofrecemos alimentos de calidad para usted y sus seres queridos
                   para la salud y demás y para el bienestar.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
  //END
};

export default HeroTwoSection;
