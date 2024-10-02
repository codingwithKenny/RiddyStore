import { createGlobalStyle } from "styled-components";
import Head from "next/head";

const GlobalStyled = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: "Roboto", sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyled />
      <Component {...pageProps} />
    </>
  );
}
