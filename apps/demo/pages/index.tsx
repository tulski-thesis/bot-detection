import { Layout, Page, Text } from "@vercel/examples-ui";
import Headers from "@components/headers";
import BotResult from "@components/bot-result";

export default function Index() {
  return (
    <Page>
      <Text variant="h1" className="mb-6">
        Bot Protection
      </Text>
      <hr className="border-t border-accents-2 mb-6" />
      <Text className="mb-4">Bot analysis result:</Text>
      <BotResult />
      <Text className="mb-4">Headers:</Text>
      <Headers path="/" />
    </Page>
  );
}

Index.Layout = Layout;
