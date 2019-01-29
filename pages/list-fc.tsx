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

ListFunction.getInitialProps = async ({ pathname, req }: NextContext) => {
  // Example for including initial props in a Next.js function compnent page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const dataArray: IDataObject[] = [
    { id: 101, name: "larryyy" },
    { id: 102, name: "sammm" },
    { id: 103, name: "jillll" },
    { id: 104, name: pathname }
  ];
  if ((req as any).query) console.log((req as any).query);
  return { items: dataArray };
};

export default ListFunction;
