import React, { createContext, useEffect, useState } from "react";
import { BotClient } from "@tulski/bot-client";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export function botClient(opts?: any): Promise<BotClient> {
  return BotClient.load("http://localhost:3030");
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
      const resultBot = result.result === "bad_bot";
      setIsBot(resultBot);
      if (isBot) {
        router.replace("/blocked");
      }
    });
  }, [isBot]);

  return <BotContext.Provider value={isBot}>{children}</BotContext.Provider>;
};

export default BotProvider;
