import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import UserContext from '../../contexts/userContext';
import { HeaderRegisters, RegistersContainer } from './Registers';

function RegistersPage() {
    const { user } = useContext(UserContext);
    const [registers, setRegisters] = useState([]);
    const navigate = useNavigate();

    const getRegisters = () => {
        const URL = 'http://localhost:5000/user/registers';
        const { token } = user;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .get(URL, config)
            .then((res) => {
                setRegisters(res.data);
            })
            .catch((err) => {
                console.log({ message: 'Error getting registers', err });
            });
    };

    useEffect(() => {
        getRegisters();
    }, []);
    return (
        <>
            <HeaderRegisters>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine
                    className="logout"
                    // onClick={() => {
                    //     logout();
                    // }}
                />
            </HeaderRegisters>
            <RegistersContainer>
                <div className="registers-container">
                    <h1>Registros</h1>
                </div>
            </RegistersContainer>
        </>
    );
}

export default RegistersPage;
