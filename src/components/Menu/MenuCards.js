import React, { useContext, useState } from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import classes from "./MenuCard.module.css";
import TheButton from "../Ui/TheButton";
import Modal from "../Ui/Modal";
import Swal from "sweetalert2";
import CartContext from "../store/cartcontext";

const MenuCard = ({ details, restaurantId, restaurantName }) => {
    const [showModal, setShowModal] = useState(false);

    const aboutModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const cartCtx = useContext(CartContext);

    const validateDish = () => {
        const hasItems = cartCtx.items.length > 0;
        if (hasItems) {
            const hasRestaurant = cartCtx.items.some(item => item.restaurant === restaurantId)
            if (hasRestaurant) {
                onAddToCartHandler();
            } else {
                Swal.fire({
                    title: "Aviso",
                    text: `El restaurante del nuevo platillo no coincide con los existentes en el carrito. Solo puede tener un carrito por restaurante.`,
                    icon: "warning"
                });
            }
        } else {
            onAddToCartHandler();
        }

    }

    const onAddToCartHandler = () => {
        cartCtx.addItem({
            id: details.id,
            name: details.dish,
            amount: 1,
            price: details.price,
            src: details.imageUrl,
            restaurant: restaurantId,
            nameRestaurant: restaurantName
        });
    };
    return (
        <>
            {showModal && (
                <Modal>
                    <div className={classes.about_modal}>
                        <div className={classes.about_header}>
                            <h2 className={classes.text_modal_header}>Descripción</h2>
                        </div>
                        <div className={classes.about_body}>
                            <p className={classes.text_content_title}>
                                {details.dish}
                            </p>
                            <p className={classes.text_content}>
                                {details.description}
                            </p>
                        </div>
                        <div className={classes.about_footer}>
                            <div className={classes.button_modal_div}>
                                <TheButton onClick={closeModal}>Cerrar</TheButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            <Card sx={{ width: 300, maxWidth: '100%', boxShadow: 'lg' }} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <img
                            src={details.imageUrl}
                            loading="lazy"
                            alt={details.dish}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Link
                        color="neutral"
                        textColor="text.primary"
                        overlay
                        onClick={aboutModal}
                        endDecorator={<i className="fa-solid fa-circle-info"></i>}
                        sx={{ fontWeight: 'md' }}
                    >
                        {details.dish}
                    </Link>

                    <Typography
                        level="title-lg"
                        sx={{ mt: 1, fontWeight: 'xl' }}

                    >
                        $ {details.price}.00
                    </Typography>
                </CardContent>
                <CardOverflow>
                    <Button onClick={validateDish} variant="solid" size="lg"
                        sx={{
                            backgroundColor: '#ff4d00',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#cc4526',
                            },
                        }}>
                        <i className="bi bi-plus"></i> Agregar al carrito
                    </Button>

                </CardOverflow>
            </Card>
        </>
    );
};

export default MenuCard;