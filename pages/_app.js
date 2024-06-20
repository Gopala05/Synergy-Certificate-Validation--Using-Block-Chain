import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs";
import { ClerkProvider } from "@clerk/nextjs";
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <ThirdwebProvider activeChain={ChainId.Mumbai}>
        <StateContextProvider>
          <Head>
            <title>Synergy</title>
            <meta
              name="description"
              content="Certificate Validation System by Team SYNERGY"
            />
            <link rel="icon" href="/Logo.png" />
          </Head>
          <Component {...pageProps} />
        </StateContextProvider>
      </ThirdwebProvider>
    </ClerkProvider>
  );
}
