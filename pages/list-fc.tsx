import { NextFunctionComponent, NextContext } from "next";
import List from "../components/List";
import IDataObject from "../interfaces";

type Props = {
  items: IDataObject[];
};

const ListFunction: NextFunctionComponent<Props> = ({ items }) => (
  <>
    <List items={items} />
  </>
);

ListFunction.getInitialProps = async ({ pathname }: NextContext) => {
  // Example for including initial props in a Next.js function compnent page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const dataArray: IDataObject[] = [
    { id: 101, name: "larry" },
    { id: 102, name: "sam" },
    { id: 103, name: "jill" },
    { id: 104, name: pathname }
  ];

  return { items: dataArray };
};

export default ListFunction;
