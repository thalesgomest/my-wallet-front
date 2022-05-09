import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import UserContext from '../../contexts/userContext';
import {
    HeaderRegisters,
    RegistersContainer,
    RegisterContainer,
    Footer,
    NewRegisterContainer,
    NewRegisterButton,
} from './Registers';

function RegistersPage() {
    const { user } = useContext(UserContext);
    const [registers, setRegisters] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const typeRegister = ['incoming', 'outgoing'];

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

    const balance = () => {
        let totalAmount = 0;
        registers.forEach((register) => {
            if (register.type === 'incoming') {
                totalAmount += parseFloat(register.value);
            } else {
                totalAmount -= parseFloat(register.value);
            }
        });
        return totalAmount;
    };

    const logOut = () => {
        const { token } = user;
        const URL = 'http://localhost:5000/auth/logout';

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(URL, {}, config)
            .then(() => {
                localStorage.removeItem('userdata');
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getRegisters();
    }, []);

    useEffect(() => {
        setTotal(balance());
    }, [registers]);

    return (
        <>
            <HeaderRegisters>
                <h1>Olá, {user.name}</h1>
                <RiLogoutBoxRLine className="logout" onClick={() => logOut()} />
            </HeaderRegisters>
            <RegistersContainer>
                <div className="values-scroll">
                    {registers.length > 0 ? (
                        registers.map((register) => (
                            <RegisterContainer
                                type={register.type}
                                // eslint-disable-next-line no-underscore-dangle
                                key={register._id}
                            >
                                <div className="register-container-value-description">
                                    <span className="date">
                                        {register.date}
                                    </span>
                                    <div className="description">
                                        <span>{register.description}</span>
                                    </div>
                                </div>
                                <div className="register-container-value">
                                    <h2>
                                        {parseFloat(register.value)
                                            .toFixed(2)
                                            .replace('.', ',')}
                                    </h2>
                                </div>
                            </RegisterContainer>
                        ))
                    ) : (
                        <div className="no-registers-container">
                            <p>Não há registros de entrada ou saída</p>
                        </div>
                    )}
                </div>
                {registers.length > 0 ? (
                    <Footer balance={total}>
                        <div className="total-value">
                            <h1 className="balance">SALDO</h1>
                            <h1 className="amount">
                                R$ {total.toFixed(2).replace('.', ',')}
                            </h1>
                        </div>
                    </Footer>
                ) : (
                    <Footer />
                )}
            </RegistersContainer>
            <NewRegisterContainer>
                <NewRegisterButton
                    onClick={() =>
                        navigate(`/user/register/${typeRegister[0]}`)
                    }
                >
                    <AiOutlinePlusCircle className="new-register-icon" />
                    <div className="new-register-text">
                        <h1>Nova Entrada</h1>
                    </div>
                </NewRegisterButton>
                <NewRegisterButton
                    onClick={() =>
                        navigate(`/user/register/${typeRegister[1]}`)
                    }
                >
                    <AiOutlineMinusCircle className="new-register-icon" />
                    <div className="new-register-text">
                        <h1>Nova Saída</h1>
                    </div>
                </NewRegisterButton>
            </NewRegisterContainer>
        </>
    );
}

export default RegistersPage;
