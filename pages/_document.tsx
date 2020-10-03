import Document, { Head, Main, NextScript, Html } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="images/icons/android-icon-192x192.png"
          ></link>
          <link
            href="images/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="images/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="images/icons/apple-icon.png" />

          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta
            name="msapplication-TileImage"
            content="images/icons/mstile-150x150.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export { MyDocument as default }
