import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import styles from './RegisterMenu.module.css';

const DishForm = ({ onAddDish }) => {
    const [dish, setDish] = useState({
        dish: '',
        price: '',
        imageUrl: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDish({ ...dish, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddDish(dish);
        setDish({ dish: '', price: '', imageUrl: '', description: '' });
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.dishForm}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del platillo</Form.Label>
                <Form.Control
                    type="text"
                    name="dish"
                    value={dish.dish}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={dish.price}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>URL de la imagen</Form.Label>
                <Form.Control
                    type="url"
                    name="imageUrl"
                    value={dish.imageUrl}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={dish.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <TheButton type="submit" className={styles.submitButton}>
                Añadir Platillo
            </TheButton>
        </Form>
    );
};

export default DishForm;