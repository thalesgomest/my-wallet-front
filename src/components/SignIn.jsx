import React from 'react';
import { SignInContainer, Form } from './Layouts/SignIn';

function SignIn() {
    return (
        <>
            <SignInContainer>
                <h1>MyWallet</h1>
                <Form>
                    <input type="email" name="" id="" placeholder="E-mail" />
                    <input type="password" name="" id="" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                </Form>
                <p>Primeira vez? Cadastre-se!</p>
            </SignInContainer>
            ;
        </>
    );
}

export default SignIn;
