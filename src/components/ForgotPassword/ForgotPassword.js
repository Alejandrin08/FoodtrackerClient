import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FormGroup } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";
import styles from "./ForgotPassword.module.css";
import { sendEmail } from "../../services/emailService";
import useAccount from "../../hooks/useAccount";

const ForgotPassword = () => {
    const { validateUserEmail, changeUserPassword } = useAccount();
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [token, setToken] = useState('');
    const [generatedToken, setGeneratedToken] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [tokenError, setTokenError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const generateToken = () => {
        const characters = '0123456789';
        let token = '';
        for (let i = 0; i < 6; i++) {
            token += characters[Math.floor(Math.random() * characters.length)];
        }
        return token;
    };

    const passwordRegex = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,}\S$/;

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const emailExists = await validateUserEmail(email);
        if (emailExists) {
            const newToken = generateToken();
            setGeneratedToken(newToken);
            const emailSent = await sendEmail(email, newToken);
            if (emailSent) {
                setIsEmailValid(true);
            }
        }
    };

    const handleTokenSubmit = (e) => {
        e.preventDefault();
        setTokenError('');
        if (token === generatedToken) {
            setIsTokenValid(true);
        } else {
            setTokenError('El token ingresado es incorrecto.');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordValid(passwordRegex.test(value));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        if (passwordValid) {
            const passwordUpdated = await changeUserPassword(email, password);
            if (!passwordUpdated) {
                setPasswordError('Error al actualizar la contraseña.');
            } 
        } else {
            setPasswordError('La contraseña no es válida. Debe tener al menos 6 caracteres, incluir una letra mayúscula, una minúscula y un número.');
        }
    };

    return (
        <Container className={styles.forgotPasswordContainer}>
            <h1 className="mb-4">Recuperar Contraseña</h1>
            <Form className={styles.forgotPasswordForm} >
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formEmail">
                    <Form.Label column sm="4" className="text-sm-end">
                        Correo Electrónico:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputForgotPassword}
                            placeholder="Correo electrónico"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isEmailValid || isTokenValid}
                        />
                    </Col>
                    <Col className={`justify-content-end d-flex mt-3 ${styles.buttonForgotPassword}`}>
                        <TheButton
                            type="submit"
                            onClick={handleEmailSubmit}
                            disabled={isEmailValid || isTokenValid}
                        >
                            Enviar Token
                        </TheButton>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formToken">
                    <Form.Label column sm="4" className="text-sm-end">
                        Token:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputForgotPassword}
                            placeholder="Token"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            disabled={!isEmailValid || isTokenValid}
                        />
                        {tokenError && <div className={`text-danger ${styles.textErrorM}`}>{tokenError}</div>}
                    </Col>
                    <Col className={`justify-content-end d-flex mt-3 ${styles.buttonForgotPassword}`}>
                        <TheButton
                            type="submit"
                            onClick={handleTokenSubmit}
                            disabled={!isEmailValid || isTokenValid}
                        >
                            Validar Token
                        </TheButton>
                    </Col>
                </Form.Group>

                <FormGroup as={Row} className="mb-3 align-items-center">
                    <Form.Label column sm="4" className="text-sm-end">
                        Nueva Contraseña:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputForgotPassword}
                            type="password"
                            placeholder="Nueva contraseña"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            disabled={!isTokenValid}
                        />
                    </Col>
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                    {!passwordValid && password && (
                        <div className="text-danger text-sm-center">
                            La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una minúscula y un número.
                        </div>
                    )}
                </FormGroup>

                <Row>
                    <Col className={`justify-content-end d-flex ${styles.buttonForgotPassword}`}>
                        <TheButton
                            type="submit"
                            onClick={handlePasswordSubmit}
                            disabled={!isTokenValid || !passwordValid}
                        >
                            Continuar
                        </TheButton>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default ForgotPassword;
