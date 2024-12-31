import React, { useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import TheButton from "../Ui/TheButton";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./HeroFourSection.module.css";
import aboutImage from "../../assets/image/about-image.webp";
import Modal from "../Ui/Modal";

const HeroFourSection = () => {
  const [showModal, setShowModal] = useState(false);

  const aboutModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //Rendering the About section and the About Modal
  return (
    <>
      {showModal && (
        <Modal>
          <div className={classes.about_modal}>
            <div className={classes.about_header}>
              <h2 className={classes.text_modal_header}>Sobre nosotros</h2>
            </div>
            <div className={classes.about_body}>
              <p className={classes.text_content}>
                En nuestra misión por revolucionar el mundo de la comida a domicilio,
                trabajamos estrechamente con restaurantes, chefs locales y emprendedores
                gastronómicos para ofrecerte opciones únicas y de calidad. Creemos en apoyar
                el talento culinario de nuestra comunidad, brindándoles una plataforma
                para llegar a más personas mientras tú disfrutas de una experiencia
                gastronómica inolvidable.
                Nuestro compromiso va más allá de la entrega: priorizamos la frescura,
                la rapidez y la satisfacción de cada cliente. Con tecnología de punta,
                un equipo dedicado y atención personalizada, garantizamos que cada
                pedido sea más que una simple comida; es una conexión con los sabores
                y pasiones que hacen especial a cada cocina.
              </p>
            </div>
            <div className={classes.about_footer}>
              <div className={classes.button_modal_div}>
                <TheButton onClick={closeModal}>Cancelar</TheButton>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <section id="about">
        <Container>
          <Row className={`${classes.row} mx-auto`}>
            <Col
              lg={6}
              data-aos="fade-right"
              data-aos-easing="ease-out"
              data-aos-duration="700"
            >
              <div className={classes.text_div}>
                <h2 className={classes.text_header}>Sobre nosotros</h2>
                <p className={classes.text_content}>
                  En Food Tracker, transformamos la forma en que disfrutas de tus
                  comidas favoritas. Conectamos los mejores sabores locales y opciones únicas
                  con personas que valoran la calidad y la comodidad. ¿Antojo de algo especial?
                  Nuestra plataforma te acerca a una amplia variedad de platillos preparados con
                  dedicación, listos para llegar a tu puerta en pocos minutos. No importa si
                  es un almuerzo rápido o una cena relajada, aquí encontrarás algo para cada
                  momento. Porque sabemos que disfrutar buena comida no debería ser complicado,
                  ¡déjanos hacerlo sencillo para ti!
                </p>
                <div className={classes.button_div}>
                  <TheButton onClick={aboutModal}>Saber más</TheButton>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div
                className={classes.image_div}
                data-aos="fade-left"
                data-aos-easing="ease-out"
                data-aos-duration="700"
              >
                <img
                  className={classes.image}
                  src={aboutImage}
                  alt="about"
                ></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
  //END
};

export default HeroFourSection;
