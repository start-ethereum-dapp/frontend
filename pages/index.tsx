import Head from "next/head";

import Header from "../components/Header/Header";
import Contract from "../components/Contract/Contract";

export default function Home() {
  return (
    <div className="min-w-screen bg-slate-200 dark:bg-slate-800 min-h-screen flex-col justify-center items-center pb-10">
      <Head>
        <title>start-ethereum-dapp</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <Contract />
    </div>
  );
}
