// import "./App.css";

import React from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      searchQuery: "",
      imgSrc: "",
      displayResults: false,
    };
    // console.log('constructor');
  }

  getLocationInfo = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url);
    const locationArray = location.data;
    this.setState({
      location: locationArray[0],
      displayResults: true,
      imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13`,
    });
  };

  render() {
    console.log("state", this.state);
    return (
      <>
        <h1>welcome city explorer!</h1>
        <Button variant="dark">Click</Button>
        <form onSubmit={this.getLocationInfo}>
          <input
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            placeholder="city"
          />
          <Button variant="primary">explore!</Button>
        </form>

        {this.state.displayResults && (
          <>
            <h2>{this.state.location.display_name}</h2>
            <img src={this.state.imgSrc} alt="map" />
          </>
        )}
      </>
    );
  }
}

export default App;
