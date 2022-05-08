import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { SignUpContainer, Form } from './SignUp';

function SignUpPage() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: false,
    });
    const [buttonCadastrar, setButtonCadastrar] = useState({
        disabled: true,
        classNameDisabled: 'button-disabled',
    });
    const [dataLoading, setDataLoading] = useState({
        loading: false,
        classNameLoading: '',
    });

    const navigate = useNavigate();

    const signUp = (e) => {
        e.preventDefault();

        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });

        const URL = 'http://localhost:5000/auth/sign-up';

        axios
            .post(URL, {
                name: data.name,
                email: data.email,
                password: data.password,
            })
            .then((res) => {
                console.log(res.data);
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
                navigate('/login');
            })
            .catch((err) => {
                console.log({
                    message:
                        'Sign Up error! Check your credentials and try again',
                    err,
                });
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
            });
    };

    useEffect(() => {
        if (
            data.confirmPassword !== '' &&
            data.password !== data.confirmPassword
        ) {
            setData({
                ...data,
                error: true,
            });
            setButtonCadastrar({
                ...buttonCadastrar,
                disabled: true,
                classNameDisabled: 'button-disabled',
            });
        } else if (
            data.confirmPassword !== '' &&
            data.confirmPassword === data.password
        ) {
            setData({
                ...data,
                error: false,
            });
            setButtonCadastrar({
                ...buttonCadastrar,
                disabled: false,
                classNameDisabled: '',
            });
        }
    }, [data.confirmPassword, data.password]);

    return (
        <SignUpContainer>
            <h1>MyWallet</h1>
            <Form onSubmit={signUp}>
                <input
                    type="text"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    placeholder="Nome"
                    required
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                    type="email"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    placeholder="E-mail"
                    required
                    value={data.email}
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    placeholder="Senha"
                    required
                    value={data.password}
                    onChange={(e) =>
                        setData({
                            ...data,
                            password: e.target.value,
                        })
                    }
                />
                <input
                    type="password"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    placeholder="Confirme a senha"
                    required
                    value={data.confirmPassword}
                    onChange={(e) =>
                        setData({
                            ...data,
                            confirmPassword: e.target.value,
                        })
                    }
                />
                {data.error ? (
                    <span className="text-danger">Passwords dont match</span>
                ) : null}
                {dataLoading.loading === false ? (
                    <button
                        type="submit"
                        disabled={buttonCadastrar.disabled}
                        className={buttonCadastrar.classNameDisabled}
                    >
                        Cadastrar
                    </button>
                ) : (
                    <button type="button" disabled>
                        <ThreeDots
                            color="rgba(255, 255, 255, 1)"
                            height={13}
                            width={51}
                        />
                    </button>
                )}
            </Form>
            <Link to="/login">
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </SignUpContainer>
    );
}

export default SignUpPage;
