import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import useLogin from '../../hooks/useAccount';
import { Navigate } from 'react-router-dom';
import Input from "../Ui/Input";
import TheButton from "../Ui/TheButton";

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
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.leftPanel}>
                        <img
                            src="https://www.pizzaiolo.mx/img/blog/grupo-de-pizzas-en-restaurante-Pizza-popular.jpg"
                            alt="Login Illustration"
                            className={`mb-6 ${styles.img}`}
                        />
                        <h2 className={styles.leftPanelTitle}>¡Bienvenido de nuevo!</h2>
                        <p className={styles.leftPanelText}>
                            Inicia sesión para acceder a tu cuenta
                        </p>
                    </div>
                    <div className={styles.formContainer}>
                        <h2 className={styles.formTitle}>Iniciar sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputLogin}
                                    placeholder="Ingresa tu correo electrónico"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="password">
                                    Contraseña
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.inputLogin}
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                            </div>
                            <div className={styles.buttonGroup}>
                                <TheButton type="submit" className={styles.buttonLogin} disabled={loading}>
                                    Iniciar Sesión
                                </TheButton>
                                <a href="/forgot-password" className={styles.forgotPassword}>
                                    Olvidé mi contraseña
                                </a>
                            </div>
                            {error && <div className={`text-danger ${styles.errorText}`}>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;