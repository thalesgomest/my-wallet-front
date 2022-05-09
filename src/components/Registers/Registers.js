import styled from 'styled-components';

const HeaderRegisters = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 28px 24px 0 24px;

    h1 {
        color: #ffffff;
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
    }
    .logout {
        cursor: pointer;
        color: #ffffff;
        font-size: 25px;
    }
`;

const RegistersContainer = styled.header`
    width: 87vw;
    height: 446px;
    background: #ffffff;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 22px;
    /* overflow-y: scroll; */
    position: relative;

    .values-scroll {
        overflow-y: scroll;
        width: 87vw;
        height: 446px;
    }

    .no-registers-container {
        width: 326px;
        height: 446px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        width: 180px;
        height: 46px;
        text-align: center;
        font-style: normal;
        line-height: 23px;
        font-weight: 400;
        font-size: 20px;
        color: #868686;
    }
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 12px 0 12px;

    :last-child {
        margin-bottom: 50px;
    }

    .register-container-value h2 {
        color: ${(props) => props.type === 'incoming' && '#03AC00'};
        color: ${(props) => props.type === 'outgoing' && '#C70000'};
    }

    .register-container-value-description {
        word-wrap: break-word;
        display: flex;

        .date {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #c6c6c6;
        }
        .description {
            padding-left: 10px;
        }
    }
`;

const Footer = styled.footer`
    .total-value {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        padding: 10px 15px;
        background: #ffffff;
        margin-top: 5px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

        .balance {
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            color: #000000;
        }

        .amount {
            font-style: normal;
            font-weight: 400;
            font-size: 17px;
            color: ${(props) => (props.balance > 0 ? '#03AC00' : '#C70000')};
        }
    }
`;

const NewRegisterContainer = styled.div`
    width: 87vw;
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

const NewRegisterButton = styled.div`
    :first-child {
        margin-right: 10px;
    }
    width: 87%;
    height: 87%;
    background: #a328d6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 12px;

    .new-register-icon {
        width: 25px;
        height: 25px;
        color: #ffffff;
        margin: 8px;
    }

    .new-register-text {
        width: 64px;
        height: 40px;
        margin: 10px;
    }

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        color: #ffffff;
    }
`;

export {
    HeaderRegisters,
    RegistersContainer,
    RegisterContainer,
    Footer,
    NewRegisterContainer,
    NewRegisterButton,
};
