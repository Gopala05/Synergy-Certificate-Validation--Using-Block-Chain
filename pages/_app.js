import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Plans } from "../Components/Plans/Plans";
import { CrispProvider } from "../Components/Crisp/CrispProvider";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider>
        <Head>
          <title>Synergy</title>
          <meta
            name="description"
            content="Certificate Validation System by Team SYNERGY"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Satisfy"
            rel="stylesheet"
          ></link>
          <link
            href="https://cdn.jsdelivr.net/npm/dubai-font@1.1.1/dubai-font/css/dubai-font.min.css"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="/Logo.png" />
        </Head>
        <Toaster />
        <CrispProvider />
        <Plans />
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
