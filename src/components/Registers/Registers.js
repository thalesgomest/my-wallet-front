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
        color: #fff;
        font-size: 25px;
    }
`;

const RegistersContainer = styled.div`
    width: 326px;
    height: 446px;
    background: #ffffff;
    border-radius: 5px;
`;

export { HeaderRegisters, RegistersContainer };
