import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import WeatherDay from "./weatherday";

class Weather extends React.Component {
  render() {
    let data = this.props.weather;
    // console.log(this.props.weather.forecast)
    return (
      <CardDeck style={{alignSelf:"center"}}>
        {data.map((element) => (
          <WeatherDay key={element.date} date={element.date} desc={element.description} />
        ))}
      </CardDeck>
    );
  }
}
export default Weather;
