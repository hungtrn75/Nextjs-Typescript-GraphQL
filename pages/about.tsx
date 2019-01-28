import * as React from "react";
import Link from "next/link";

const AboutPage: React.FunctionComponent = () => (
  <>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </>
);

export default AboutPage;
