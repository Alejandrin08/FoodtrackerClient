import React, { useState, useEffect } from 'react';
import styles from "./EditProfile.module.css";
import { Form, Row, Col, Container } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,}\S$/;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid(emailRegex.test(value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid(passwordRegex.test(value));
    };

    const validatePhone = () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setPhoneError("Número de teléfono no valido.");
            return false;
        }
        setPhoneError("");
        return true;
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
        <Container className={styles.editProfileContainer}>
            <h1 className="mb-4 mt-5">Editar perfil</h1>

            <Form className={styles.editProfileForm}>
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formName">
                    <Row>
                        <Row>
                            <Col> <Form.Label className={`text-start ${styles.labelEditProfile}`}>
                                Nombre:
                            </Form.Label></Col>
                            <Col>
                                <Form.Label className={`text-start ${styles.labelEditProfile}`}>
                                    Teléfono:
                                </Form.Label></Col>
                        </Row>
                        <Row>
                            <Col>

                                <Input
                                    className={styles.inputEditProfile}
                                    placeholder="Nombre completo"
                                    id="name"
                                    onChange={handleNameChange}
                                />
                                {nameError && nameTouched && <div className={`text-danger ${styles.labelEditProfile}`}>{nameError}</div>}
                            </Col>
                            <Col>
                                <Input
                                    className={styles.inputEditProfile}
                                    type="number"
                                    placeholder="Teléfono (10 dígitos)"
                                    id="phone"
                                    onChange={handlePhoneChange}
                                />
                                {phoneError && phoneTouched && <div className={`text-danger ${styles.labelEditProfile}`}>{phoneError}</div>}
                            </Col>
                        </Row>
                    </Row>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formPhone">
                    <Row>
                        <Row>
                            <Col>
                                <Form.Label className={`text-start ${styles.labelEditProfile}`}>
                                    Correo electrónico:
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Label className={`text-start ${styles.labelEditProfile}`}>
                                    Contraseña:
                                </Form.Label>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Input
                                    className={styles.inputEditProfile}
                                    type="email"
                                    placeholder="Correo electrónico"
                                    id="email"
                                    onChange={handleEmailChange}
                                />
                                {!emailValid && email && (
                                    <div className={`text-danger ${styles.labelEditProfile}`}> Correo electrónico inválido.</div>
                                )}
                            </Col>
                            <Col>
                                <Input
                                    className={styles.inputEditProfile}
                                    type="password"
                                    placeholder="Contraseña"
                                    id="password"
                                    onChange={handlePasswordChange}
                                />
                                {!passwordValid && password && (
                                    <div className={`text-danger ${styles.labelEditProfile}`}>
                                        La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una minúscula y un número.
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Row>
                </Form.Group>

                <Row>
                </Row>

                <Row>
                    <Col className="text-center">
                        <TheButton
                            type="submit"
                            disabled={!isFormValid || !emailValid || !passwordValid}
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

export default EditProfile;