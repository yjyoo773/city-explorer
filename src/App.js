import React from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Weather from "./weather";

import backgroundImg from "./img/bg_img.jpeg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      searchQuery: "",
      imgSrc: "",
      displayResults: false,
      weatherArray: [],
    };
  }

  getLocationInfo = async (e) => {
    try {
      e.preventDefault();
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      // console.log(url);
      const location = await axios.get(url);
      const locationArray = location.data;
      const weather_url = `http://localhost:3001/weather?lat=${locationArray[0].lat}&lon=${locationArray[0].lon}`;
      const weather_url2 = `https://city-explorer-lsu.herokuapp.com/weather?lat=${locationArray[0].lat}&lon=${locationArray[0].lon}`;

      const weather = await axios.get(weather_url || weather_url2);
      this.setState({
        location: locationArray[0],
        displayResults: true,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=12`,
        weatherArray: weather.data,
      });
      console.log("state", this.state.weatherArray.forecast);
    } catch (err) {
      if (!alert(err)) {
        window.location.reload();
      }
    }
  };

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
    // console.log("state", this.state);
    return (
      <div style={divStyle}>
        <Container className="align-middle p-0">
          <h1 style={{ color: "white", paddingTop: "5rem" }}>
            welcome city explorer!
          </h1>
          <Form onSubmit={this.getLocationInfo} style={{ marginTop: "2rem" }}>
            <Form.Row>
              <input
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
                placeholder="Enter a location!"
              />
              <Col>
                <Button variant="primary" type="submit">
                  explore!
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <div style={{ marginTop: "2rem" }}>
            {this.state.displayResults && (
              <>
                <h2 style={{ color: "white" }}>
                  {this.state.location.display_name}
                </h2>
                <h3 style={{ color: "white" }}>
                  Latitude: {this.state.location.lat} <br />
                  Longitude: {this.state.location.lon}
                </h3>
                <Weather weather={this.state.weatherArray.forecast} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Image
                    fluid
                    thumbnail
                    src={this.state.imgSrc}
                    alt="map"
                    style={{ alignSelf: "center" }}
                  />
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
