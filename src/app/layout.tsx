import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import ChakraProvider from "./_providers/ChakraProvider";
import ReduxStoreProvider from "./_providers/ReduxStoreProvider";
import { theme } from "@/styles/theme";
import AudioPlayer from "../components/AudioPlayer";
import QueryProviders from "./_providers/QueryProvider";

import { setupServer } from "msw/node";
import { setupWorker } from "msw/browser";

if (process.env.USE_MSW) {
  if (typeof window === "undefined") {
    const server = setupServer([]);
    server.listen();
  } else {
    const worker = setupWorker([]);
    worker.start();
  }
}

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans_kr.className}>
        <QueryProviders>
          <ChakraProvider theme={theme} resetCSS={false}>
            <ReduxStoreProvider>{children}</ReduxStoreProvider>
          </ChakraProvider>
          <AudioPlayer />
        </QueryProviders>
      </body>
    </html>
  );
}
