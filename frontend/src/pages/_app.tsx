import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Python IDE</title>
        <link rel="icon" href="/python.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
