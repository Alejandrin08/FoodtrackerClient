import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuCards from "./MenuCards";
import RestaurantDetailsCard from "../Menu/RestaurantDetailsCard";
import Divider from '@mui/material/Divider';
import useMenu from "../../hooks/useMenu";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [localData, setLocalData] = useState(null);
    
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

    if (!data) {
        return null; 
    }

    return (
        <div className="container-sm mt-5">
            <div className="row justify-content-evenly">
                <RestaurantDetailsCard
                    key={data.id}
                    data={data}
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
                        restaurantId = {data.id}
                        restaurantName={data.restaurantName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
