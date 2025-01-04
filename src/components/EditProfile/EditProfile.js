import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";
import { Form, Row, Col, Container } from "react-bootstrap";
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";
import useAccount from "../../hooks/useAccount";
import useClient from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [nameTouched, setNameTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const { getUser, changeUserEmail } = useAccount();
    const { getClientData, updateClientData } = useClient();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.userId;
        } catch (err) {
            return null;
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                navigate("/error");
                return;
            }

            try {
                const user = await getUser(userId);
                const clientData = await getClientData(userId);

                if (user) {
                    const userEmail = user.email || "";
                    setEmail(user.email || "");
                    setEmailValid(emailRegex.test(userEmail));
                } else {
                    throw new Error("Error al obtener los datos");
                }

                if (clientData) {
                    setName(clientData.name || "");
                    setPhone(clientData.phone || "");
                } else {
                    throw new Error("Error al obtener los datos");
                }
            } catch (err) {
                navigate("/error");
            }
        };

        fetchData();
    }, []);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailValid(emailRegex.test(value));
        if (!emailTouched) setEmailTouched(true);
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

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        try {

            const clientResponse = await updateClientData(getUserIdFromToken(), name, phone);
            if (!clientResponse) {
                throw new Error("Fallo al actualizar el perfil.");
            }

            const emailResponse = await changeUserEmail(email);
            if (!emailResponse) {
                throw new Error("Fallo al actualizar el perfil.");
            }

            Swal.fire({
                title: "Cambios guardados",
                text: "Los cambios se guardaron correctamente.",
                icon: "success",
            }).then(() => {
                navigate("/");
            });
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
            }).then(() => {
                navigate("/error");
            });
        }
    };

    return (
        <Container className={styles.editProfileContainer}>
            <h1 className="mb-4 mt-5">Editar perfil</h1>
            <Form className={styles.editProfileForm}>
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formName">
                    <Row>
                        <Row>
                            <Col>
                                <Form.Label className={`text-start ${styles.labelEditProfile}`}>Nombre:</Form.Label>
                            </Col>
                            <Col>
                                <Form.Label className={`text-start ${styles.labelEditProfile}`}>Teléfono:</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input
                                    className={styles.inputEditProfile}
                                    placeholder="Nombre completo"
                                    id="name"
                                    value={name}
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
                                    value={phone}
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
                                <Form.Label className={`text-start ${styles.labelEditProfile}`}>Correo electrónico:</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input
                                    className={styles.inputEditProfile}
                                    type="email"
                                    placeholder="Correo electrónico"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                {!emailValid && emailTouched && email && (
                                    <div className={`text-danger ${styles.labelEditProfile}`}>Correo electrónico inválido.</div>
                                )}
                            </Col>
                        </Row>
                    </Row>
                </Form.Group>

                <Row>
                    <Col className="text-center">
                        <TheButton
                            type="submit"
                            disabled={!isFormValid || !emailValid || (emailTouched && !emailValid)}
                            className={!isFormValid ? styles.disabledButton : ""}
                            onClick={handleSaveChanges}
                        >
                            Guardar cambios
                        </TheButton>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default EditProfile;