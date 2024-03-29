import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import "./mosaicProjectNavigator.scss"
import Slider from "react-slick"
import CarouselArrow from '../../carouselArrow';
import { GatsbyImage } from 'gatsby-plugin-image';
import ProjectNavigator from '../projectNavigator/projectNavigator';
import { getProjectValue } from '../../../utils';

const PREFIX = 'MosaicProjectNavigator';

const classes = {
  extraLightText: `${PREFIX}-extraLightText`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.extraLightText}`]: {
    color: theme.palette.extraLightText
  }
}));

const MosaicProjectNavigator = ({ project, navigation, modalKey, resetModalKey }) => {
  const [currentSlide, setCurrentSlide] = useState(modalKey + 1)
  const [totalSlides,] = useState(project.mosaic.reduce((s,e) => s + e.images.length, 0))

  // Prevent scrolling while project navigator is open
  useEffect(() => {
    document.body.style.overflowY = "hidden"
    return () => document.body.style.overflowY = null
  }, [])
  
  const settings = {
    className: "center",
    centerMode: true,
    adaptiveHeight: true,
    dots: false,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CarouselArrow prevDirection={true} shiftAmount="1.875rem" />,
    nextArrow: <CarouselArrow prevDirection={false} shiftAmount="1.875rem" />,
    centerPadding: "20%",
    autoplay: false,
    initialSlide: modalKey,
    beforeChange: (oi, ni) => setCurrentSlide(ni + 1),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerPadding: "15%"
        }
      },
      {
        breakpoint: 1550,
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 1300,
        settings: {
          centerPadding: "10%"
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: "0%"
        }
      }
    ],
    style: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center"
    }
  };

  return (
    <Root className="mpn__wrapper">
      <div className="mpn__header">
        <div className="mpn__slide-numbers">
          <div className="mpn__slide-fraction">
            <span className={`${classes.extraLightText} mpn__slide-current`}>{`${currentSlide < 10 ? "0":""}${currentSlide}`}</span>
            <span className="mpn__slide-total">{`${totalSlides < 10 ? "0":""}${totalSlides}`}</span>
          </div>
        </div>
        <div className="mpn__title">
          <h4>{project.project_name}</h4>
          <p 
            style={{ textTransform: "none" }} 
            className={classes.extraLightText}
          >
            {`${getProjectValue(project, "Project Type").replace(/\n/g," ")} - ${getProjectValue(project, "Date")}`}
          </p>
        </div>
        <div className="mpn__close-modal">
          <div className="mpn__close-box" onClick={() => resetModalKey()}></div>
        </div>
      </div>
      <Slider {...settings}>
        {project.mosaic.reduce((a, e) => [...a, ...e.images], []).map((image, i) => (
          <div className="image-wrapper" key={i}>
            <GatsbyImage
              style={{ height: "100%" }}
              image={image.src.childrenImageSharp[0].gatsbyImageData} 
              alt={image?.alt ? image.alt : "alt"}
            />
          </div>
        ))}
      </Slider>
      <ProjectNavigator navigation={navigation} />
    </Root>
  );
}

export default MosaicProjectNavigator