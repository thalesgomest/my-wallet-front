import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FiTrash2 } from 'react-icons/fi';
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

dotenv.config();

function RegistersPage() {
    const { user } = useContext(UserContext);
    const [registers, setRegisters] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const typeRegister = ['incoming', 'outgoing'];

    const getRegisters = () => {
        const URL = `${process.env.REACT_APP_DB_URI}/user/registers`;
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
        const URL = `${process.env.REACT_APP_DB_URI}/auth/logout`;

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

    function deleteMessage(id) {
        // eslint-disable-next-line no-alert
        const confirmation = window.confirm(
            'Quer mesmo deletar essa transação?'
        );

        const { token } = user;
        if (confirmation) {
            const URL = `${process.env.REACT_APP_DB_URI}/user/registers/${id}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .delete(URL, config)
                .then(() => {
                    getRegisters();
                })
                .catch((err) => {
                    // eslint-disable-next-line no-alert
                    alert(err.response.data);
                });
        }
    }

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
                                onClick={() => {
                                    navigate(
                                        // eslint-disable-next-line no-underscore-dangle
                                        `/user/register/edit/${register._id}`,
                                        {
                                            state: {
                                                value: register.value,
                                                description:
                                                    register.description,
                                                type: register.type,
                                            },
                                        }
                                    );
                                }}
                            >
                                <div className="register-container-date-description">
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
                                    <FiTrash2
                                        className="delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // eslint-disable-next-line no-underscore-dangle
                                            deleteMessage(register._id);
                                        }}
                                    />
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
