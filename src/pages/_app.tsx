import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import useSWR from "swr";
import { SessionProvider } from "next-auth/react";
import Context from "@/context/context";

const fetcher = (url: RequestInfo | URL) => fetch(url).then((r) => r.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </SessionProvider>
  );
}
