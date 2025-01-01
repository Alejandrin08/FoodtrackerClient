import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";
import styles from './Login.module.css';
import useLogin from '../../hooks/useAccount';
import { Navigate } from 'react-router-dom';


const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser, loading, error, user } = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser(email, password);
    };

    if (user?.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container className={styles.loginContainer}>
            <h1 className="mb-4">Iniciar Sesión</h1>
            <Form className={styles.loginForm} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formEmail">
                    <Form.Label column sm="4" className="text-sm-end">
                        Correo Electrónico:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputLogin}
                            placeholder="Correo electrónico"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 align-items-center" controlId="formPassword">
                    <Form.Label column sm="4" className="text-sm-end">
                        Contraseña:
                    </Form.Label>
                    <Col sm="8">
                        <Input
                            className={styles.inputLogin}
                            type="password"
                            placeholder="Contraseña"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Row>
                    <Col className="text-center mb-3">
                        <a href="/signup">Registrarse</a>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center mb-3">
                        <a href="/forgot-password">Olvidé mi contraseña</a>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center mb-3"> 
                        {error && <div className="text-danger">{error}</div>}
                    </Col>
                </Row>
                
                <Row>
                    <Col className="text-center">
                        <TheButton
                            type="submit"
                            disabled={loading}
                        >
                            Iniciar Sesión
                        </TheButton>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Login;
