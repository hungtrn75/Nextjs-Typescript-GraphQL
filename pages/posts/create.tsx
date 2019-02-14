import { NextFunctionComponent } from "next";
import React from "react";
import EditorComponent from "../../components/editor/Editor";

// type Props = {
//   items: IDataObject[];
// };

const ListFunction: NextFunctionComponent = () => <EditorComponent />;

// ListFunction.getInitialProps = async ({ pathname, query }: NextContext) => {
//   // Example for including initial props in a Next.js function compnent page.
//   // Don't forget to include the respective types for any props passed into
//   // the component.
//   const dataArray: IDataObject[] = [
//     { id: 101, name: "larryyy" },
//     { id: 102, name: "sammm" },
//     { id: 103, name: "jillll" },
//     { id: 104, name: pathname }
//   ];
//   console.log(query);
//   return { items: dataArray };
// };

export default ListFunction;
