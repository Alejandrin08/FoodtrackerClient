import React, { useState, useEffect, useContext } from "react";
import HeroSection from "./HeroSection";
import HeroTwoSection from "./HeroTwoSection";
import HeroThreeSection from "./HeroThreeSection";
import HeroFourSection from "./HeroFourSection";
import TheButton from "../Ui/TheButton";
import Modal from "../Ui/Modal";
import { Form } from "react-bootstrap";
import classes from "./RatingModal.module.css";
import clase from "../../components/Cart/Cart.module.css";
import MapSection from "./MapSection";
import CartContext from "../store/cartcontext";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import useRate from "../../hooks/useRating";
import Swal from "sweetalert2";


const Sections = () => {
  const cartCtx = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [restaurant, setNameRestaurant] = useState("");
  const [rating, setRating] = useState(0);
  const {registerRate } = useRate();
  const labels = {
    0.5: 'Muy baja',
    1: 'Baja+',
    1.5: 'Aceptable',
    2: 'Aceptable+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Buena',
    4: 'Buena+',
    4.5: 'Excelente',
    5: 'Excelente+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);


  useEffect(() => {
    const restaurantName = localStorage.getItem("rating");
    if (restaurantName) {
      setNameRestaurant(restaurantName);
      cartCtx.clearCart();
      setShowModal(true);
    }
  }, [cartCtx]);

  const closeModal = () => {
    localStorage.removeItem("rating");
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerRate(restaurant, rating);
    localStorage.removeItem("rating");
    setShowModal(false);
    if (result) {
      Swal.fire({
        title: "Calificación guardada",
        text: "Gracias por hacer que FoodTracker sea mejor.",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al registrar la calificación del restaurante. Por favor, inténtalo nuevamente.",
        icon: "error"
      });
    }
  };
  //Rendering every of the section components
  return (
    <main>
      {showModal && (
        <Modal>
          <div className={classes.about_modal}>
            <div className={classes.about_header}>
              <h2 className={classes.text_modal_header}>Califica tu experiencia</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              <div className={classes.about_body}>
                <p className={classes.text_content}>
                  Tu opinion es muy importante para que FoodTracker siga creciendo
                </p>
                <p className={classes.text_content}>
                  ¿Cómo calificarías tu experiencia con {restaurant}?
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                    <Rating
                      name="hover-feedback"
                      size="large"
                      value={value}
                      precision={0.5}
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                        setRating(newValue)
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="largue" />}
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                  </Box>
                </div>

              </div>
              <div className={classes.about_footer} style={{ marginTop: '20px' }}>
                <div className={clase.buttons}>
                  <TheButton
                    onClick={closeModal}
                    className={` ${clase.btn_style} me-2`}
                  >
                    Cerrar
                  </TheButton>
                  <TheButton type="submit" className={clase.btn_style2} disabled={rating === 0}>
                    Enviar
                  </TheButton>
                </div>
              </div>
            </Form>
          </div>
        </Modal>
      )}
      <HeroSection />
      <MapSection />
      <HeroTwoSection />
      <HeroThreeSection />
      <HeroFourSection />

      {/*<HeroFiveSection />
      <HeroSixSection />
      <HeroSevenSection />*/}
    </main>
  );
  //END
};

export default Sections;
