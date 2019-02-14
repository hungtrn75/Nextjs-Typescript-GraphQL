// @ts-ignore
import NProgress from "next-nprogress/component";
import App, { Container } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import "../assets/styles.less";
import Layout from "../components/admin";
import checkLoggedIn from "../lib/checkLoggedIn";
import withApollo from "../lib/withApollo";

//@ts-ignore
class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx }: any) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const { loginUser } = await checkLoggedIn(ctx.apolloClient);
    return { pageProps, loginUser };
  }
  render() {
    const { Component, pageProps, apolloClient, loginUser } = this.props;
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
          <ApolloHooksProvider client={apolloClient}>
            <Layout loginUser={loginUser}>
              <Component {...pageProps} />
            </Layout>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
