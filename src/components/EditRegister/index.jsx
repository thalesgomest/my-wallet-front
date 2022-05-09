import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { IoMdReturnLeft } from 'react-icons/io';
import dayjs from 'dayjs';
import axios from 'axios';
import dotenv from 'dotenv';
import UserContext from '../../contexts/userContext';
import {
    EditRegisterContainer,
    HeaderEditRegister,
    Form,
} from './EditRegister';

dotenv.config();

function EditRegisterPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { state } = useLocation();
    const [registerValue, setRegisterValue] = useState(state.value);
    const [registerDescription, setRegisterDescription] = useState(
        state.description
    );
    // eslint-disable-next-line
    const [typeRegister, setTypeRegister] = useState(state.type);
    const [dataLoading, setDataLoading] = useState({
        loading: false,
        classNameLoading: '',
    });
    const navigate = useNavigate();

    const updateRegister = (e) => {
        e.preventDefault();
        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });
        const URL = `https://my-wallet-thalesgomest.herokuapp.com/user/registers/edit/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const data = {
            value: registerValue,
            description: registerDescription,
            date: dayjs().format('DD/MM'),
            type: typeRegister,
        };

        axios
            .put(URL, data, config)
            .then(() => {
                setDataLoading({
                    ...dataLoading,
                    loading: true,
                    classNameLoading: 'input-disabled',
                });
                navigate('/user/registers');
            })
            .catch((err) => {
                setDataLoading({
                    ...dataLoading,
                    loading: true,
                    classNameLoading: 'input-disabled',
                });
                console.log({ message: err.message, err });
            });
    };

    return (
        <EditRegisterContainer>
            <HeaderEditRegister>
                {typeRegister === 'incoming' ? (
                    <h1>Editar Entrada</h1>
                ) : (
                    <h1>Editar Saída</h1>
                )}
                <IoMdReturnLeft
                    className="back-registers-button"
                    onClick={() => navigate('/user/registers')}
                />
            </HeaderEditRegister>
            <Form onSubmit={updateRegister}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={registerValue}
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    onChange={(e) => setRegisterValue(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    value={registerDescription}
                    onChange={(e) => setRegisterDescription(e.target.value)}
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
                            'Atualizar Entrada'
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
                            'Atualizar Saída'
                        )}
                    </button>
                )}
            </Form>
        </EditRegisterContainer>
    );
}

export default EditRegisterPage;
