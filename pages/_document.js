// pages/_document.js
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            strategy="lazyOnload"
            src="https://embed.tawk.to/65aa49300ff6374032c24aaa/1hkgirpsd"
          />
        </body>
      </Html>
    );
  }
}
