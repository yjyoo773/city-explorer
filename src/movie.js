import React from "react";
// import MovieC from "./movie_child";
import Carousel from "react-bootstrap/Carousel";

class Movie extends React.Component {
  render() {
    let data = this.props.movie;

    // console.log(data);
    return (
      <Carousel style={{ alignSelf: "center", minHeight: "8rem" }}>
        {data.map((element) => (
          <Carousel.Item>
            <img
              style={{ margin: "auto" }}
              src={element.image_url}
              alt={element.title}
            />
            <Carousel.Caption style={{ color: "#0275d8" }}>
              <h3>{element.title}</h3>
              <p>{element.released_on}</p>
            </Carousel.Caption>
          </Carousel.Item>
          // <MovieC
          //   key = {`id${Math.random().toString(16).slice(2)}`}
          //   title={element.title}
          //   released_on={element.released_on}
          //   img={element.image_url}
          // />
        ))}
      </Carousel>
    );
  }
}
export default Movie;