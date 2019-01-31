import React from "react";
import Layout from "../components/Layout";
import checkLoggedIn from "../lib/checkLoggedIn";
import { withAuth } from "../lib/withAuth";

class Profile extends React.Component<any> {
  static async getInitialProps({ apolloClient }: any) {
    const { profile } = await checkLoggedIn(apolloClient);
    return { profile };
  }

  render() {
    const { profile } = this.props;
    return (
      <Layout title="Profile page">
        {profile ? (
          <div>
            <p>{profile.email}</p>
            <p>{profile.firstName}</p>
            <p>{profile.lastName}</p>
            <p>{profile.name}</p>
          </div>
        ) : (
          <div>Not profile to display</div>
        )}
      </Layout>
    );
  }
}

export default withAuth(Profile, true);
