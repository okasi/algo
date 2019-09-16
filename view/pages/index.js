import React from "react";
import Link from "next/link";
import Head from "next/head";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    {/* <Link href="/login">
      <a>
        <h2>Admin Login</h2>
      </a>
    </Link> */}

    <div
      dangerouslySetInnerHTML={{
        __html: `
        <script async src="https://telegram.org/js/telegram-widget.js?2" data-telegram-login="algo_laBot" data-size="medium" data-auth-url="/api/auth/telegram"></script>
    `
      }}
    ></div>
  </div>
);

export default Home;
