import { useEffect, useState } from "react";
import { botDetect } from "@lib/bot/script";

export default function BotResult() {
  const [state, setState] = useState("");

  useEffect(() => {
    botDetect().then((result) => {
      setState(JSON.stringify(result, null, 2));
    });
  }, []);

  return (
    <pre className="border-accents-2 border rounded-md bg-white overflow-x-auto p-6 mb-4">
      {state}
    </pre>
  );
}
