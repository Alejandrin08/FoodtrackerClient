import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuCards from "./MenuCards";
import RestaurantDetailsCard from "../Menu/RestaurantDetailsCard";
import Divider from '@mui/material/Divider';
import useMenu from "../../hooks/useMenu";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);

    const [localData, setLocalData] = useState(null);

    const getCurrentDay = () => {
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return days[new Date().getDay()];
    };


    useEffect(() => {
        const storedData = localStorage.getItem("restaurantData");
        if (storedData) {
            setLocalData(JSON.parse(storedData));
        }
    }, []);

    const { data } = location.state || { data: localData };
    const { loading, error, menu } = useMenu(data?.restaurantName || "");

    useEffect(() => {
        if (data && !localData) {
            localStorage.setItem("restaurantData", JSON.stringify(data));
        }

        if (!data) {
            navigate("/restaurants");
        } else {
            window.scrollTo(0, 0);
        }
    }, [data, localData, navigate]);

    useEffect(() => {
        if (data?.schedule) {
            const currentDay = getCurrentDay();
            const currentTime = new Date().toTimeString().slice(0, 5);
            const schedule = data.schedule[currentDay];

            if (schedule) {
                const [openingTime, closingTime] = schedule.split("-");
                setStatus(currentTime >= openingTime && currentTime <= closingTime);
            } else {
                setStatus(false); // Si no hay horario para el día actual
            }
        }
    }, [data]); // Solo se ejecuta cuando cambien `data`

    if (!data) {
        return null;
    }



    const isOpen = (schedule) => {
        const currentDay = getCurrentDay();
        const currentTime = new Date().toTimeString().slice(0, 5); // Hora actual en formato HH:mm

        if (!schedule[currentDay]) return "Cerrado hoy";

        const [openingTime, closingTime] = schedule[currentDay].split("-");
        if (currentTime >= openingTime && currentTime <= closingTime) {

            return `Abierto, cierra a las ${closingTime}`;
        }
        return "Cerrado";

    };




    return (
        <div className="container-sm mt-5">
            <div className="row justify-content-evenly">
                <RestaurantDetailsCard
                    key={data.id}
                    data={data}
                    status={isOpen(data.schedule)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Divider style={{ backgroundColor: '#ff4d00', height: 4, flex: 1 }} />
                <span style={{ padding: '0 10px', whiteSpace: 'nowrap', fontSize: '25px', fontWeight: 'bold' }}>
                    MENÚ
                </span>
                <Divider style={{ backgroundColor: '#ff4d00', height: 4, flex: 1 }} />
            </div>
            <div className="container-sm mt-5">
                {loading && <p>Cargando menú...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && menu.length === 0 && (
                    <p>No se encontraron platillos para este restaurante.</p>
                )}
            </div>
            <div className="row justify-content-evenly">
                {menu.map((menu) => (
                    <MenuCards
                        key={menu.id}
                        details={menu}
                        restaurantId={data.id}
                        restaurantName={data.restaurantName}
                        status={status}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
