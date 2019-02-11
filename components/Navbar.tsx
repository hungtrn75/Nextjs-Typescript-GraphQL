import Link from "next/link";
import * as React from "react";
import { MeComponent } from "../generated/apolloComponents";

type Props = {
  title?: string;
};

const Navbar: React.FunctionComponent<Props> = () => (
  <MeComponent>
    {({ data }) => (
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
              <Link href="/auth/logout">
                <a>Logout</a>
              </Link>{" "}
              |{" "}
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
