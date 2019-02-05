import React from "react";
import WrappedResetForm from "../../components/auth/Reset";
import { ChangePasswordComponent } from "../../generated/apolloComponents";
import { validateTokenMutation } from "../../graphql/user/mutations/validateToken";
import { MyContext } from "../../interfaces/MyContext";
import redirect from "../../lib/redirect";

const ResetPage = ({ token }: { token: string }) => {
  return (
    <ChangePasswordComponent>
      {mutate => <WrappedResetForm mutate={mutate} token={token} />}
    </ChangePasswordComponent>
  );
};

ResetPage.getInitialProps = async ({
  query: { token },
  apolloClient,
  ...ctx
}: MyContext) => {
  const isValid = await apolloClient
    .mutate({
      mutation: validateTokenMutation,
      variables: {
        token
      }
    })
    .then(({ data: { validateToken } }: any) => validateToken)
    .catch(_err => false);
  if (isValid) return token;
  else {
    redirect(ctx, "/auth/forgot");
  }
};

export default ResetPage;
