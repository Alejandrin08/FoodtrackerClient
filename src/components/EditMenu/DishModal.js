// DishModal.js
import React from 'react';
import { Form } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Modal from "../Ui/Modal";
import classes from "../Menu/MenuCard.module.css";
import styles from '../RegisterMenu/RegisterMenu.module.css';

const DishModal = ({ show, onClose, dishData, onChange, onSubmit, title, hasChanges }) => {
    if (!show) return null;

    return (
        <Modal>
            <div className={classes.about_modal}>

                <div className={classes.about_header}>
                    <h2 className={classes.text_modal_header}>{title}</h2>
                </div>
                <div className={classes.about_body}>
                    <Form onSubmit={onSubmit} className={styles.dishForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del platillo</Form.Label>
                            <Form.Control
                                type="text"
                                name="dish"
                                value={dishData.dish}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={dishData.price}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de la imagen</Form.Label>
                            <Form.Control
                                type="url"
                                name="imageUrl"
                                value={dishData.imageUrl}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={dishData.description}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <TheButton type="submit" className={styles.submitButton} disabled={!hasChanges}>
                            {title === "Editar platillo" ? "Modificar Platillo" : "Añadir Platillo"}
                        </TheButton>
                    </Form>
                </div>
                <div className={classes.about_footer}>
                    <div className={classes.button_modal_div}>
                        <TheButton onClick={onClose}>Cerrar</TheButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DishModal;