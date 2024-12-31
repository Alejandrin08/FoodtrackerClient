import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";
import styles from './SignUp.module.css';
import { useParams } from 'react-router-dom';
import useClient from '../../hooks/useClient';
import { useNavigate } from 'react-router-dom';

const SignUpTwo = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const { registerClientData, loading, error } = useClient();
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validatePhone = () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError("Número de teléfono no valido.");
            return false;
        }
        setPhoneError("");
        return true;
    };

    const toggleSelection = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter((item) => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

    const validateName = () => {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(name)) {
            setNameError("El nombre solo debe contener letras.");
            return false;
        }
        setNameError("");
        return true;
    };

    const validateForm = () => {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        setIsFormValid(isNameValid && isPhoneValid);
    };

    useEffect(() => {
        validateForm();
    }, [name, phone]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        if (!userId) {
            navigate("/error");
            return;
        }

        await registerClientData(userId, name, phone);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (!nameTouched) setNameTouched(true);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPhone(value);
        if (!phoneTouched) setPhoneTouched(true);
    };

    return (
        <Container className={styles.signupContainer}>
            <h1 className="mb-4 mt-5">Registrarse</h1>

            <Form className={styles.signupForm} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formName">
                    <Form.Label column sm="4" className="text-sm-end">
                        Nombre:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputSignUp}
                            placeholder="Nombre completo"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        {nameError && nameTouched && <div className="text-danger">{nameError}</div>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formPhone">
                    <Form.Label column sm="4" className="text-sm-end">
                        Teléfono:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputSignUp}
                            type="number"
                            placeholder="Teléfono (10 dígitos)"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        {phoneError && phoneTouched && <div className="text-danger">{phoneError}</div>}
                    </Col>
                </Form.Group>

                <Row>
                    <Col className="text-center mb-3">
                        <p>Selecciona tus gustos</p>
                        <div className="d-flex justify-content-center">
                            <div className={styles.slider}>
                                {[{ icon: "fa-pizza-slice" }, { icon: "fa-shrimp" }, { icon: "fa-burger" }, { icon: "fa-pepper-hot" }].map(
                                    (item, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.sliderCircle} ${selectedItems.includes(index) ? styles.selected : ""}`}
                                            onClick={() => toggleSelection(index)}
                                        >
                                            <i className={`fa-solid ${item.icon}`}></i>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center mb-3">{error && <div className="text-danger">{error}</div>}</Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <TheButton
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={!isFormValid ? styles.disabledButton : ""}
                        >
                            Registrarse
                        </TheButton>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default SignUpTwo;
