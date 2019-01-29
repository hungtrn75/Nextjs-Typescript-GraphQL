import { NextFunctionComponent, NextContext } from "next";
import Link from "next/link";

const AboutPage: NextFunctionComponent = () => {
  return (
    <>
      <p>This is the about page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </>
  );
};

AboutPage.getInitialProps = async ({ query }: NextContext) => {
  console.log(query);
  return { query };
};

export default AboutPage;
