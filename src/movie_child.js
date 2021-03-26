import React from "react";
import Carousel from "react-bootstrap/Carousel";

class MovieC extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Carousel.Item>
            <img src={this.props.img} alt={this.props.title}/>
            <Carousel.Caption>
              <h3>{this.props.title}</h3>
              <p>{this.props.released_on}</p>
            </Carousel.Caption>
          </Carousel.Item>
      </div>
    );
  }
}
export default MovieC;
