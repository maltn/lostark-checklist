import "../styles/globals.css";
import "@fontsource/rubik";
import type { AppProps } from "next/app";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
