import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DishForm from './DishForm';
import DishList from './DishList';
import styles from './RegisterMenu.module.css';
import Swal from "sweetalert2";
import TheButton from '../Ui/TheButton';
import { useNavigate } from "react-router-dom";
import useRegisterMenu from "../../hooks/useRegisterMenu";

const RegisterMenu = () => {
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();
    const { register } = useRegisterMenu(); 

    const addDish = (newDish) => {
        const isDishExist = menu.some(item => item.dish.toLowerCase() === newDish.dish.toLowerCase());

        if (isDishExist) {
            Swal.fire({
                title: "Aviso",
                text: `Ya existe un platillo con el nombre "${newDish.dish}". No puede repetir platillos.`,
                icon: "warning"
            });
        } else {
            setMenu([...menu, { ...newDish }]);

        }
        console.log(menu);
    };

    const removeDish = (name) => {
        setMenu(menu.filter(dish => dish.dish !== name));
    };

    const handleRegisterMenu = async () => {
        try {
            for (const dish of menu) {
                const resultRegisterDish = await register(dish);

                if (!resultRegisterDish.success) { 
                    Swal.fire({
                        title: "Error",
                        text: `No se pudo registrar el platillo "${dish.dish}".`,
                        icon: "error"
                    });
                    return; 
                }
                
            }
            Swal.fire({
                title: "Éxito",
                text: "Todos los platillos fueron registrados exitosamente.",
                icon: "success"
            });
            navigate("/");
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error inesperado al registrar los platillos.",
                icon: "error"
            });
        }
    };


    return (
        <Container className={`container mt-5 ${styles.menuRegistration}`} >
            <h1 className={styles.title}>Registro de Menú</h1>

            <Row>
                <Col lg={4} className="mb-4">
                    <DishForm onAddDish={addDish} />
                </Col>
                <Col lg={8}>
                    <DishList menu={menu} onRemoveDish={removeDish} />
                    <div className={styles.registerButtonContainer}>
                        <TheButton
                            size="lg"
                            onClick={handleRegisterMenu}
                            disabled={menu.length === 0}
                            className={styles.registerButton}
                        >
                            Registrar Menú
                        </TheButton>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterMenu;
