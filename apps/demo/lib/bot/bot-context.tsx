import React, { createContext, useEffect, useState } from "react";
import { BotClient } from "@tulski/bot-client";
import { useRouter } from "next/router";

const BOT_API_URL =
  process.env.NEXT_PUBLIC_BOT_API_URL || "http://bot.tulski.com";

export function botClient(opts?: any): Promise<BotClient> {
  return BotClient.load(BOT_API_URL);
}

export async function botDetect() {
  const client = await botClient();
  return client.analyze();
}

const BotContext = createContext<boolean | null>(null);

const BotProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    botDetect().then((result) => {
      const resultBot = result.bot.result !== "not_detected";
      setIsBot(resultBot);
      if (isBot) {
        router.replace("/blocked");
      }
    });
  }, [isBot]);

  return <BotContext.Provider value={isBot}>{children}</BotContext.Provider>;
};

export default BotProvider;
