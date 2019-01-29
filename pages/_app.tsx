import App, { Container } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
// @ts-ignore
import NProgress from "next-nprogress/component";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <NProgress
          spinner
          color="red"
          options={{ trickleSpeed: 50 }}
          msDelay={200}
        />
        <Head>
          <title>Nextjs-Typescript-GraphQL</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
