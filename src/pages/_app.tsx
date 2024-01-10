import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Toaster />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
