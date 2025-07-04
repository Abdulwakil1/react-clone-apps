import styled from "styled-components";
import Slider from "react-slick";
// Import the required styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

/**
 * ImgSlider Component
 *
 * This component provides an image slider/carousel functionality using the `react-slick` library.
 * It displays a series of promotional images that automatically transition at a set interval.
 *
 * The slider is styled using `styled-components` and incorporates various visual enhancements
 * such as shadow effects and hover interactions.
 *
 * @component
 * @example
 * return (
 *   <ImgSlider />
 * )
 */

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Wrap>
        <a href="">
          <img src="/images/slider-badging.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a href="">
          <img src="/images/slider-scale.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a href="">
          <img src="/images/slider-badag.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a href="">
          <img src="/images/slider-scales.jpg" alt="" />
        </a>
      </Wrap>
    </Carousel>
  );
};

export default ImgSlider;

const Carousel = styled(Slider)`
  margin-top: 20px;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }
  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgb(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;
