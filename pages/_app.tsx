import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactGA from "react-ga4";
import data from "../utils/sitedata";

export default function App({ Component, pageProps }: AppProps) {
  let production = true;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
    production = false;

  if (typeof window !== "undefined" && true) {
    ReactGA.initialize([
      {
        trackingId: data.googleAnalyticsId,
      },
    ]);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }

  return <Component {...pageProps} />;
}
