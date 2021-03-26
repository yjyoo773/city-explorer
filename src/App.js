import React from "react";

import Container from "react-bootstrap/Container";


import Header from "./header";
import Body from "./body"

import backgroundImg from "./img/bg_img.jpeg";

// in env change local to heroku address

class App extends React.Component {

  render() {
    var divStyle = {
      backgroundImage: `url(${backgroundImg})`,
      height: "auto",
      minHeight: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overflow: "auto",
    };
    return (
      <div style={divStyle}>
        <Container className="align-middle p-0">
          <Header getLocationInfo={this.getLocationInfo} />
          <Body/>
          
        </Container>
      </div>
    );
  }
}

export default App;
