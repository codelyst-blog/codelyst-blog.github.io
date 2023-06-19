import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Fonts from "../styles/Fonts";
import "../styles/styles.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="google-site-verification" content="YxxIg5MPg5-Cy29EpQEA393CH_ts8QR6zeLEBmUg8wQ" />
            </Head>
            <ChakraProvider theme={theme}>
                <Fonts />
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
}

export default MyApp;
