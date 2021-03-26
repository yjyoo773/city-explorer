import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Weather from "./weather";
import Movie from "./movie";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      searchQuery: "",
      imgSrc: "",
      displayResults: false,
      weatherArray: [],
      movieArray: [],
    };
  }

  getLocationInfo = async (e) => {
    try {
      e.preventDefault();
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const location = await axios.get(url);
      const locationArray = location.data;

      this.getWeatherInfo(locationArray[0]);
      this.getMovieInfo(locationArray[0]);

      this.setState({
        location: locationArray[0],
        displayResults: true,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=12`,
      });
      // console.log("state", locationArray[0]);
    } catch (err) {
      if (!alert(err)) {
        window.location.reload();
      }
    }
  };

  getWeatherInfo = async (location) => {
    try {
      const weather = await axios.get(
        // `${process.env.REACT_APP_SERVER}/weather`,
        `https://city-explorer-lsu.herokuapp.com/weather`,

        {
          params: { lat: location.lat, lon: location.lon },
        }
      );
      this.setState({ weatherArray: weather.data });
      console.log("inside getWeather", weather);
    } catch (err) {
      console.log(err);
    }
  };

  getMovieInfo = async (location) => {
    try {
      // const movie_url = `${process.env.REACT_APP_SERVER}/movies?title=${location.display_name}`;
      const movie_url = `https://city-explorer-lsu.herokuapp.com/movies?title=${location.display_name}`;

      const movie = await axios.get(movie_url);
      this.setState({ movieArray: movie.data });
      // console.log("inside getMovie", this.state.movieArray);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
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
              <Weather weather={this.state.weatherArray} />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  fluid
                  thumbnail
                  src={this.state.imgSrc}
                  alt="map"
                  style={{ alignSelf: "center" }}
                />
                <Col>
                  <Movie movie={this.state.movieArray} />
                </Col>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default Body;
