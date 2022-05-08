import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../contexts/userContext';
import { SignInContainer, Form } from './SignIn';

function SignInPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [dataLoading, setDataLoading] = useState({
        loading: false,
        classNameLoading: '',
    });
    const { user, setUser } = useContext(UserContext);

    const signIn = (e) => {
        e.preventDefault();

        setDataLoading({
            ...dataLoading,
            loading: true,
            classNameLoading: 'input-disabled',
        });

        const URL = 'http://localhost:5000/auth/login';

        axios
            .post(URL, { email: userData.email, password: userData.password })
            .then((response) => {
                localStorage.setItem(
                    'userdata',
                    JSON.stringify({
                        name: response.data.name,
                        token: response.data.token,
                    })
                );
                const { data } = response;
                setUser({
                    ...user,
                    name: data.name,
                    token: data.token,
                });
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
                navigate('/user/registers');
            })
            .catch((err) => {
                console.log({
                    message:
                        'Login error! Check your credentials and try again',
                    err,
                });
                setDataLoading({
                    ...dataLoading,
                    loading: false,
                    classNameLoading: '',
                });
            });
    };

    return (
        <SignInContainer>
            <h1>MyWallet</h1>
            <Form onSubmit={signIn}>
                <input
                    type="email"
                    placeholder="E-mail"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    required
                    value={userData.email}
                    onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                    placeholder="Senha"
                    required
                    value={userData.password}
                    onChange={(e) =>
                        setUserData({
                            ...userData,
                            password: e.target.value,
                        })
                    }
                />
                {dataLoading.loading === false ? (
                    <button type="submit">Entrar</button>
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
            <Link to="/sign-up">
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </SignInContainer>
    );
}

export default SignInPage;
