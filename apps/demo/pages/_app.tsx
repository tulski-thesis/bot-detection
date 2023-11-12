import type { AppProps } from "next/app";
import "@vercel/examples-ui/globals.css";
import BotProvider from "@lib/bot/bot-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BotProvider>
      <Component {...pageProps} />
    </BotProvider>
  );
}

export default MyApp;
