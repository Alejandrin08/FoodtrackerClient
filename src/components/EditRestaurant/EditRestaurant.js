import React, { useState, useEffect } from "react";
import { Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ScheduleSelector from "./ScheduleSelector";
import LocationInput from "./Map";
import TheButton from "../Ui/TheButton";
import useRestaurant from "../../hooks/useRestaurant";
import styles from "./EditRestaurant.module.css";
import Swal from "sweetalert2";

const EditRestaurant = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        restaurantName: "",
        schedule: {},
        phoneNumber: "",
        location: "",
        imageUrl: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { getRestaurant, updateRestaurant } = useRestaurant();

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            const { success, restaurant } = await getRestaurant();
            if (success && restaurant) {
                setFormData({
                    restaurantName: restaurant.restaurantName,
                    schedule: restaurant.schedule || {},
                    phoneNumber: restaurant.phoneNumber || "",
                    location: restaurant.location || "",
                    imageUrl: restaurant.imageUrl || "",
                });
                setTouched({
                    restaurantName: true,
                    schedule: true,
                    phoneNumber: true,
                    location: true,
                    imageUrl: true,
                });
            }
        };

        fetchRestaurantDetails();
    }, []);

    const isFormComplete = () => {
        return Object.values(errors).every((error) => !error) &&
            Object.keys(touched).length > 0;
    };

    const validateField = (name, value) => {
        let error = "";
        if (name === "schedule" && Object.keys(value).length === 0) {
            error = "El horario es obligatorio.";
        } else if (name === "phoneNumber" && !/^\d{10}$/.test(value)) {
            error = "El número de teléfono debe tener 10 dígitos.";
        } else if (name === "location" && !value.trim()) {
            error = "Debes seleccionar una ubicación válida.";
        } else if (name === "imageUrl" && !/^https?:\/\/.+\..+/.test(value)) {
            error = "La URL de la imagen no es válida.";
        }
        return error;
    };

    const validateForm = () => {
        const newErrors = {
            schedule: validateField("schedule", formData.schedule),
            phoneNumber: validateField("phoneNumber", formData.phoneNumber),
            location: validateField("location", formData.location),
            imageUrl: validateField("imageUrl", formData.imageUrl),
        };

        setErrors(newErrors);
        return Object.keys(newErrors).every((key) => !newErrors[key]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        const fieldError = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    const handleScheduleChange = (schedule) => {
        setFormData((prev) => ({ ...prev, schedule }));
        setTouched((prev) => ({ ...prev, schedule: true }));

        const fieldError = validateField("schedule", schedule);
        setErrors((prev) => ({ ...prev, schedule: fieldError }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const { success } = await updateRestaurant({
                schedule: formData.schedule,
                phoneNumber: formData.phoneNumber,
                location: formData.location,
                imageUrl: formData.imageUrl,
            });

            if (success) {
                Swal.fire({
                    title: "Restaurante modificado",
                    text: "El restaurante fue modificado exitosamente.",
                    icon: "success"
                }).then(() => {
                    navigate("/");
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al modificar el restaurante. Por favor, inténtalo nuevamente.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un error al modificar el restaurante. Por favor, inténtalo nuevamente.",
                icon: "error"
            }).then(() => {
                navigate("/");
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={`mb-5 ${styles.container}`}>
            <Card className="mt-5">
                <Card.Header>
                    <Card.Title className="text-center">Modifica tu restaurante</Card.Title>
                </Card.Header>
                <Card.Body>
                    {loading ? (
                        <p>Cargando detalles del restaurante...</p>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-5">
                                <Form.Label>Nombre del restaurante</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="restaurantName"
                                    value={formData.restaurantName}
                                    disabled
                                />
                            </Form.Group>

                            <ScheduleSelector
                                schedule={formData.schedule}
                                onScheduleChange={handleScheduleChange}
                            />
                            {touched.schedule && errors.schedule && (
                                <div className="text-danger">{errors.schedule}</div>
                            )}

                            <Form.Group className="mb-3 mt-3">
                                <Form.Label className="mt-3">Número de teléfono</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                            </Form.Group>

                            <LocationInput
                                location={formData.location}
                                onLocationChange={(location) => {
                                    setFormData((prev) => ({ ...prev, location }));
                                    setTouched((prev) => ({ ...prev, location: true }));

                                    const fieldError = validateField("location", location);
                                    setErrors((prev) => ({ ...prev, location: fieldError }));
                                }}
                            />
                            {touched.location && errors.location && (
                                <div className="text-danger">{errors.location}</div>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label>URL de la imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    isInvalid={touched.imageUrl && !!errors.imageUrl}
                                />
                                <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
                            </Form.Group>

                            <TheButton type="submit" className="w-100 mt-3 mb-3" disabled={!isFormComplete() || loading}>
                                {loading ? "Cargando..." : "Modificar Restaurante"}
                            </TheButton>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditRestaurant;