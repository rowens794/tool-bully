import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactGA from "react-ga";

export default function App({ Component, pageProps }: AppProps) {
  let production = true;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    production = false;

  if (production && typeof window !== "undefined") {
    ReactGA.initialize("UA-96829474-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  return <Component {...pageProps} />;
}
