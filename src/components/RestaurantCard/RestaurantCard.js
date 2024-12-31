import React from "react";
import Card from "react-bootstrap/Card";
import TheButton from "../Ui/TheButton";
import styles from "./RestaurantCard.module.css";

const RestaurantCard = ({ restaurantName, imageUrl, averageRating }) => {
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

                <TheButton>Ver más</TheButton>
            </Card.Body>
        </Card>
    );
};

export default RestaurantCard;
