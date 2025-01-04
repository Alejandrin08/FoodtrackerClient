import React, { useState } from "react";
import { Form, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CategorySelector from "./CategorySelector";
import ScheduleSelector from "./ScheduleSelector";
import LocationInput from "./Map";
import TheButton from "../Ui/TheButton";
import useRegisterRestaurant from "../../hooks/useRegisterRestaurant";
import styles from "./RegisterRestaurant.module.css";

const RestaurantRegistrationForm = () => {
    const navigate = useNavigate();
    const { register, loading } = useRegisterRestaurant();

    const [formData, setFormData] = useState({
        restaurantName: "",
        categoryName: "",
        schedule: {},
        phoneNumber: "",
        location: "",
        imageUrl: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({}); 

    const validateForm = () => {
        const { restaurantName, categoryName, schedule, phoneNumber, location, imageUrl } = formData;

        const newErrors = {};
        if (restaurantName.trim() === "") newErrors.restaurantName = "El nombre del restaurante es obligatorio.";
        if (categoryName.trim() === "") newErrors.categoryName = "La categoría es obligatoria.";
        if (Object.keys(schedule).length === 0) newErrors.schedule = "El horario es obligatorio.";
        if (!/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = "El número de teléfono debe tener 10 dígitos.";
        if (
            !location ||
            typeof location !== "object" ||
            !("lat" in location) ||
            !("lng" in location) ||
            isNaN(location.lat) ||
            isNaN(location.lng)
        ) {
            newErrors.location = "Debes seleccionar una ubicación válida.";
        }
        if (!/^https?:\/\/.+\..+/.test(imageUrl)) newErrors.imageUrl = "La URL de la imagen no es válida.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true })); 
    };

    const handleCategoryChange = (category) => {
        setFormData((prev) => ({ ...prev, categoryName: category }));
        setTouched((prev) => ({ ...prev, categoryName: true })); 
    };

    const handleScheduleChange = (schedule) => {
        setFormData((prev) => ({ ...prev, schedule }));
        setTouched((prev) => ({ ...prev, schedule: true })); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const locationString = `${formData.location.lat},${formData.location.lng}`;
        const updatedFormData = {
            ...formData,
            location: locationString
        };

        const result = await register(updatedFormData);

        if (result) {
            Swal.fire({
                title: "Restaurante registrado",
                text: "El restaurante fue registrado exitosamente.",
                icon: "success"
            }).then(() => {
                navigate("/");
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Hubo un error al registrar el restaurante. Por favor, inténtalo nuevamente.",
                icon: "error"
            });
        }
    };

    const isFormComplete = () => {
        const { restaurantName, categoryName, schedule, phoneNumber, location, imageUrl } = formData;
        return (
            restaurantName.trim() &&
            categoryName.trim() &&
            Object.keys(schedule).length > 0 &&
            /^\d{10}$/.test(phoneNumber) &&
            location &&
            typeof location === "object" &&
            "lat" in location &&
            "lng" in location &&
            /^https?:\/\/.+\..+/.test(imageUrl)
        );
    };

    return (
        <Container className={`mb-5 ${styles.container}`}>
            <Card className="mt-5">
                <Card.Header>
                    <Card.Title className="text-center">Registra tu restaurante</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del restaurante</Form.Label>
                            <Form.Control
                                type="text"
                                name="restaurantName"
                                value={formData.restaurantName}
                                onChange={handleInputChange}
                                isInvalid={touched.restaurantName && !!errors.restaurantName}
                            />
                            <Form.Control.Feedback type="invalid">{errors.restaurantName}</Form.Control.Feedback>
                        </Form.Group>

                        <CategorySelector
                            selectedCategory={formData.categoryName}
                            onSelectCategory={handleCategoryChange}
                        />
                        {touched.categoryName && errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}

                        <ScheduleSelector schedule={formData.schedule} onScheduleChange={handleScheduleChange} />
                        {touched.schedule && errors.schedule && <div className="text-danger">{errors.schedule}</div>}

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
                            }}
                        />
                        {touched.location && errors.location && <div className="text-danger">{errors.location}</div>}

                        <Form.Group className="mb-3 mt-5">
                            <Form.Label>URL de la imagen</Form.Label>
                            <Form.Control
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                isInvalid={touched.imageUrl && !!errors.imageUrl}
                                placeholder="https://example.com/restaurant-image.jpg"
                            />
                            <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
                        </Form.Group>

                        <TheButton type="submit" className="w-100 mt-3 mb-3" disabled={!isFormComplete() || loading}>
                            {loading ? "Registrando..." : "Registrar restaurante"}
                        </TheButton>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RestaurantRegistrationForm;