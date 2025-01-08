import React, { useState, useEffect } from "react";
import styles from "./Restaurants.module.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { Container, Row } from "react-bootstrap";
import useRestaurant from "../../hooks/useGetRestaurants";

const Restaurants = () => {
    const [selectedCategory, setSelectedCategory] = useState(null); const { loading, error, restaurants } = useRestaurant(selectedCategory);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    return (
        <Container fluid className={styles.restaurantsContainer}>
            <div className={styles.slider}>
                <div
                    className={`${styles.sliderCircle} ${selectedCategory === "Hamburguesas" ? styles.active : ""}`}
                    onClick={() => handleCategoryClick("Hamburguesas")}
                >
                    <i className="fa-solid fa-burger"></i>
                    <span>Hamburguesas</span>
                </div>
                <div
                    className={`${styles.sliderCircle} ${selectedCategory === "Pizzas" ? styles.active : ""}`}
                    onClick={() => handleCategoryClick("Pizzas")}
                >
                    <i className="fa-solid fa-pizza-slice"></i>
                    <span>Pizzas</span>
                </div>
                <div
                    className={`${styles.sliderCircle} ${selectedCategory === "Mariscos" ? styles.active : ""}`}
                    onClick={() => handleCategoryClick("Mariscos")}
                >
                    <i className="fa-solid fa-shrimp"></i>
                    <span>Mariscos</span>
                </div>
                <div
                    className={`${styles.sliderCircle} ${selectedCategory === "Mexicana" ? styles.active : ""}`}
                    onClick={() => handleCategoryClick("Mexicana")}
                >
                    <i class="fa-solid fa-pepper-hot"></i>
                    <span>Mexicana</span>
                </div>
            </div>

            <h2 className="mt-4 mb-4 text-center">Restaurantes</h2>

            {loading && <p className="text-center">Cargando restaurantes...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {!loading && !error && restaurants.length === 0 && (
                <p className="text-center">No se encontraron restaurantes para esta categoría.</p>
            )}


            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        id={restaurant.id}
                        data={restaurant}
                        restaurantName={restaurant.restaurantName}
                        imageUrl={restaurant.imageUrl}
                        averageRating={restaurant.averageRating}
                    />
                ))}
            </Row>
        </Container >
    );
};

export default Restaurants;