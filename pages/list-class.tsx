import { NextContext } from "next";
import React from "react";
import List from "../components/List";
import IDataObject from "../interfaces";

type Props = {
  items: IDataObject[];
};

class ListClass extends React.Component<Props> {
  static async getInitialProps({ pathname, query }: NextContext) {
    // Example for including initial props in a Next.js page.
    // Don't forget to include the respective types for any
    // props passed into the component
    const dataArray: IDataObject[] = [
      { id: 101, name: "larry" },
      { id: 102, name: "sam" },
      { id: 103, name: "jill" },
      { id: 104, name: pathname }
    ];
    console.log(query);
    return { items: dataArray };
  }

  render() {
    return (
      <>
        <List items={this.props.items} />
      </>
    );
  }
}

export default ListClass;
