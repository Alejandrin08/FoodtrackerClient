import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import TheButton from "../Ui/TheButton";
import Input from "../Ui/Input";
import styles from './SignUpOne.module.css';
import { useParams } from 'react-router-dom';
import useClient from '../../hooks/useClient';
import { useNavigate } from 'react-router-dom';

const SignUpTwo = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const { registerClientData, loading, error } = useClient();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            navigate("/error");
            return;
        }
        await registerClientData(userId, name, phone);
    };

    return (
        <Container className={styles.signupContainer}>
            <h1 className="mb-4">Registrarse</h1>

            <div className={styles.slider}>
                <div className={styles.sliderCircleInactive}>1</div>
                <div className={styles.sliderCircleActive}>2</div>
            </div>

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
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            placeholder="Teléfono"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Col>
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
                            disabled={loading}
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