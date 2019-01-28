import App, { Container } from "next/app";
import Head from "next/head";
import NProgress from "next-nprogress/component";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <NProgress
          spinner
          color="#29d"
          options={{ trickleSpeed: 50 }}
          msDelay={200}
        />
        <Head>
          <title>Nextjs-Typescript-GraphQL</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
