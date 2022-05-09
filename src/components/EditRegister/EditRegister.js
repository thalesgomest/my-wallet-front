import styled from 'styled-components';

const EditRegisterContainer = styled.div``;

const HeaderEditRegister = styled.header`
    display: flex;
    justify-content: space-between;
    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #ffffff;
        margin: 25px 0 40px 25px;
    }

    .back-registers-button {
        cursor: pointer;
        color: #ffffff;
        font-size: 25px;
        margin: 25px 25px 0px 0px;
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

    button {
        width: 326px;
        height: 46px;
        background-color: rgb(163, 40, 214);
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

    .input-disabled {
        background-color: rgba(212, 212, 212, 1);
        color: rgba(175, 175, 175, 1);
    }
`;

export { EditRegisterContainer, HeaderEditRegister, Form };
