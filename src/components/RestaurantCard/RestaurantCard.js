import React from "react";
import Card from "react-bootstrap/Card";
import TheButton from "../Ui/TheButton";
import styles from "./RestaurantCard.module.css";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({id, data,  restaurantName, imageUrl, averageRating }) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate("/menu", { state: { data } });
    };
    return (
        <Card className={styles.card} style={{ width: "18rem" }}>
            <Card.Img
                variant="top"
                src={imageUrl || "https://via.placeholder.com/150"}
                alt={restaurantName}
                className={styles.cardImage}
            />

            <Card.Body>
                <Card.Title>{restaurantName}</Card.Title>
                <Card.Text>
                    <strong>Calificación:</strong> {averageRating.toFixed(1)} / 5
                </Card.Text>
                <TheButton onClick={handleViewMore}>Ver más</TheButton>
            </Card.Body>
        </Card>
    );
};

export default RestaurantCard;
