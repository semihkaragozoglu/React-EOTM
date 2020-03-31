import * as React from "react";
import { Container } from "reactstrap";
import Navbar from "./Navbar";

export default class Layout extends React.Component {
  render() {
     const { props, toggle } = this;
    return (
      <div className={"wrapper"}>
        <Navbar />
        <Container fluid={true}>{props.children}</Container>
      </div>
    );
  }
}
