import { Button } from "antd";
import Link from "next/link";
import * as React from "react";
import { LogoutComponent, MeComponent } from "../generated/apolloComponents";

type Props = {
  title?: string;
};

const Navbar: React.FunctionComponent<Props> = () => (
  <MeComponent>
    {({ client, data }) => (
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/about">
            <a>About</a>
          </Link>{" "}
          |{" "}
          {data && data.me ? (
            <>
              <Link href="/profile">
                <a>Profile</a>
              </Link>{" "}
              |{" "}
              <LogoutComponent>
                {logout => (
                  <Button
                    onClick={() => logout().then(() => client.resetStore())}
                  >
                    Logout
                  </Button>
                )}
              </LogoutComponent>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a>Login</a>
              </Link>{" "}
              |{" "}
              <Link href="/auth/register">
                <a>Register</a>
              </Link>{" "}
              |{" "}
            </>
          )}
        </nav>
      </header>
    )}
  </MeComponent>
);

export default Navbar;
