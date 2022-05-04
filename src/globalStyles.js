import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        font-family: "Raleway", sans-serif;
        background-color: #8c11be
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
