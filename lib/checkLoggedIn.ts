import gql from "graphql-tag";

export default (apolloClient: any) => {
  return apolloClient
    .query({
      query: gql`
        query me {
          me {
            email
            firstName
            lastName
            name
          }
        }
      `
    })
    .then(({ data }: any) => {
      return { loginUser: data.me };
    })
    .catch((_e: any) => {
      // Fail gracefully
      return { loginUser: null };
    });
};
