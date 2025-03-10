import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";
import styles from './SignUp.module.css';
import useAccount from '../../hooks/useAccount';

const SignUpOne = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const { registerUser, loading, error } = useAccount();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,}\S$/;

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
        } catch (err) {
            console.error(err);
        }
    };

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

    return (
        <Container className={styles.signupContainer}>
            <h1 className="mb-4 mt-5">Registrarse</h1>

            <div className={styles.slider}>
                <div className={styles.sliderCircleActive}>1</div>
                <div className={styles.sliderCircleInactive}>2</div>
            </div>
            <Form className={styles.signupForm} onSubmit={handleRegister}>
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formEmail">
                    <Form.Label column sm="4" className={`text-sm-end align-self-start ${styles.labelSignUp}`}>
                        Correo Electrónico:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputSignUp}
                            placeholder="Correo electrónico"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {!emailValid && email && (
                            <Row className="text-danger text-center">
                                Correo electrónico inválido.
                            </Row>
                        )}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formPassword">
                    <Form.Label column sm="4" className="text-sm-end">
                        Contraseña:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputSignUp}
                            type="password"
                            placeholder="Contraseña"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Col>
                    {!passwordValid && password && (
                        <Row className="text-danger text-center justify-content-center">
                            La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una minúscula y un número.
                        </Row>
                    )}
                </Form.Group>

                <Row>
                    <Col className="text-center mb-3">
                        {error && <div className="text-danger">{error}</div>}
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <TheButton
                            type="submit"
                            disabled={loading || !emailValid || !passwordValid}
                        >
                            Continuar
                        </TheButton>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default SignUpOne;
