import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import TheButton from "../Ui/TheButton";

const RestaurantCard = ({
    id,
    data,
    restaurantName,
    imageUrl,
    averageRating
}) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate("/menu", { state: { data } });
    };

    return (
        <Card
            className="h-100 border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            style={{
                width: 'auto',
                maxWidth: '300px',
                minWidth: '250px',
                minHeight: '250px',
                flex: '1 0 auto',
                marginRight: '1rem',
            }}
        >
            <div className="position-relative" style={{ height: '160px', overflow: 'hidden' }}>
                <Card.Img
                    variant="top"
                    src={imageUrl || "/placeholder.svg?height=160&width=240"}
                    alt={restaurantName}
                    className="w-100 h-100 object-cover"
                />
                <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill"
                >
                    <Star className="inline-block w-4 h-4 mr-1" />
                    {averageRating.toFixed(1)}
                </Badge>
            </div>
            <Card.Body className="p-3">
                <Card.Title className="h6 mb-2 text-truncate">{restaurantName}</Card.Title>
                <div className="d-flex justify-content-center align-items-center">
                    <TheButton className="btn btn-sm" onClick={handleViewMore}>
                        Ver más
                        <ArrowRight className="ml-1" size={14} />
                    </TheButton>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RestaurantCard;