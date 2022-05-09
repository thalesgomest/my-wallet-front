import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { IoMdReturnLeft } from 'react-icons/io';
import dayjs from 'dayjs';
import axios from 'axios';
import UserContext from '../../contexts/userContext';
import { RegisterContainer, HeaderRegister, Form } from './Register';

function RegisterPage() {
    const { typeRegister } = useParams();
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
        value: '',
        description: '',
        date: dayjs().format('DD/MM'),
        type: typeRegister,
    });
    const [dataLoading, setDataLoading] = useState({
        loading: false,
        classNameLoading: '',
    });
    const navigate = useNavigate();

    const newRegister = (e) => {
        e.preventDefault();

        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });

        const { token } = user;
        const URL = 'http://localhost:5000/user/register';

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .post(URL, data, config)
            .then(() => {
                setDataLoading({
                    ...dataLoading,
                    loading: true,
                    classNameLoading: 'input-disabled',
                });
                setData({
                    ...data,
                    value: '',
                    description: '',
                });
                navigate('/user/registers');
            })
            .catch((err) => {
                console.log({ message: 'Error processing registration', err });
            });
    };

    return (
        <RegisterContainer>
            <HeaderRegister>
                {typeRegister === 'incoming' ? (
                    <h1>Nova Entrada</h1>
                ) : (
                    <h1>Nova Saída</h1>
                )}
                <IoMdReturnLeft
                    className="back-registers-button"
                    onClick={() => navigate('/user/registers')}
                />
            </HeaderRegister>
            <Form onSubmit={newRegister}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={data.value}
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    onChange={(e) =>
                        setData({
                            ...data,
                            value: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    value={data.description}
                    onChange={(e) =>
                        setData({
                            ...data,
                            description: e.target.value,
                        })
                    }
                />
                {typeRegister === 'incoming' ? (
                    <button type="submit">
                        {dataLoading.loading === true ? (
                            <ThreeDots
                                color="rgba(255, 255, 255, 1)"
                                height={13}
                                width={51}
                            />
                        ) : (
                            'Salvar Entrada'
                        )}
                    </button>
                ) : (
                    <button type="submit">
                        {dataLoading.loading === true ? (
                            <ThreeDots
                                color="rgba(255, 255, 255, 1)"
                                height={13}
                                width={51}
                            />
                        ) : (
                            'Salvar Saída'
                        )}
                    </button>
                )}
            </Form>
        </RegisterContainer>
    );
}

export default RegisterPage;
