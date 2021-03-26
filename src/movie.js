import React from "react";
// import MovieC from "./movie_child";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

class Movie extends React.Component {
  addDefaultSrc(e) {
    e.target.src = "http://via.placeholder.com/300x450";
  }
  render() {
    let data = this.props.movie;

    // console.log(data);
    return (
      <Carousel style={{ alignSelf: "center", minHeight: "8rem" }}>
        {data.map((element, indx) => (
          <Carousel.Item key={indx}>
            <Image
              style={{
                alignSelf: "center",
                minHeight: "400px",
              }}
              src={element.image_url}
              alt={element.title}
              onError={this.addDefaultSrc}
            />
            <Carousel.Caption>
              {/* <h3>{element.title}</h3> */}
              <h4>{element.released_on}</h4>
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
