import styled from 'styled-components';

const SignInContainer = styled.div`
    h1 {
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #ffffff;
        margin-top: 160px;
        margin-bottom: 37px;
        text-align: center;
    }

    p {
        color: #ffffff;
        font-size: 15px;
        font-weight: 700;
        font-style: normal;
        text-align: center;
        margin-top: 36px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 326px;
        height: 58px;
        border-radius: 5px;
        background: #ffffff;
        border: 1px solid #d5d5d5;
        padding-left: 15px;
        margin-bottom: 13px;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        &:focus {
            outline: none;
        }
        &::placeholder {
            font-style: regular;
            font-weight: 400;
            font-size: 20px;
            color: #000000;
        }
    }
    input:focus::placeholder {
        color: transparent;
    }

    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1);
    }

    button {
        width: 326px;
        height: 46px;
        background-color: #a328d6;
        color: #ffffff;
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 700;
        border-radius: 5px;
        border: 1px solid #a328d6;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export { SignInContainer, Form };
