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
                <meta name="google-site-verification" content="G9K7apTa4HjEtsjnsZQ1Rc6uoG57I8eh2S0stJmx9NE" />
            </Head>
            <ChakraProvider theme={theme}>
                <Fonts />
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
}

export default MyApp;
