import React, { useState, useEffect } from "react";
import styles from "./Restaurants.module.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import useRestaurant from "../../hooks/useGetRestaurants";

const Restaurants = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { loading, error, restaurants } = useRestaurant(selectedCategory);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        console.log(restaurants);
    };

    return (
        <div className={styles.restaurantsContainer}>
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

            <div className="container-auto mt-5">
                <h2 className="mb-5">Restaurantes</h2>

                {loading && <p>Cargando restaurantes...</p>}
                {error && <p>{error}</p>}

                {!loading && !error && restaurants.length === 0 && (
                    <p>No se encontraron restaurantes para esta categoría.</p>
                )}

                <div className="row justify-content-center gap-3">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            data={restaurant}
                            restaurantName={restaurant.restaurantName}
                            imageUrl={restaurant.imageUrl}
                            averageRating={restaurant.averageRating}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Restaurants;
