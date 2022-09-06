import React, { useRef } from "react"
import { styled } from '@mui/material/styles';
import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import CarouselArrow from "../components/carouselArrow"
import '../styles/index.scss'
import Overlay from "../components/overlay/overlay";

const PREFIX = 'Home';

const classes = {
  overlay: `${PREFIX}-overlay`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.overlay}`]: {
    backgroundColor: `${theme.palette.primary.main}CC`,
  }
}));

const IndexPage = props => {

  const { allPortfolioJson: { edges } } = useStaticQuery(graphql`
    {
      allPortfolioJson {
        edges {
          node {
            project_name
            project_data {
              header
              descr
            }
            cover_image {
              src {
                childImageSharp {
                  gatsbyImageData(
                    transformOptions: {cropFocus: CENTER}, width: 465, height: 636
                    placeholder: BLURRED
                  )  
                }
              }
            }
            slug
          }
        }
      }
    }
  `)

  // Get access to the owl carousel methods
  const owlRef = useRef();
  const handleNextSlide = () =>  {
    if (typeof window !== `undefined`)
      owlRef.current?.$ele?.trigger('next.owl.carousel') 
  }
  const handlePrevSlide = () => {
    if (typeof window !== `undefined`)
      owlRef.current?.$ele?.trigger('prev.owl.carousel') 
  }

  const settings = {
    responsive: {
      0: {
        items: 1,
        margin: 0
      },
      501: {
        items: 2
      },
      1001: {
        items: 3
      },
      1201: {
        items: 4
      }
    },
    loop: true,
    margin: 10
  }
  const homeData = edges
  homeData.forEach(({ node: project }) => {
    if (!project.slug) {
      project.slug = project.project_name.split(" ").map(word => word.toLowerCase()).join("-")
    }
  })
  if (typeof window !== `undefined`) {
    const OwlCarousel = require("react-owl-carousel")
    return (
      <Root style={{ margin: "10px", position: "relative" }}>
        <Seo title="" />
        <OwlCarousel ref={owlRef} className="owl-loaded" {...settings}>
          {homeData.map(({ node: project }, i) => (
              <div
                key={i}
                className="owl-carousel-item"
                onClick={() => props.route(`/projects/${project.slug}`)}
                role="link"
                onKeyDown={e => { if (e.code === "Enter") props.route(`/projects/${project.slug}`) }}
              >
                <GatsbyImage
                  image={project.cover_image.src.childImageSharp.gatsbyImageData}
                  alt={project.project_name}
                  style={{ width: "100%" }}
                />
                <Overlay classes={`overlay ${classes.overlay}`} project={project} />
              </div>
            )
          )}
        </OwlCarousel>
        <div className="owl-custom-nav">
          <CarouselArrow className="owl-nav-prev" prevDirection={true} onClick={handlePrevSlide} />
          <CarouselArrow className="owl-nav-next" prevDirection={false} onClick={handleNextSlide} />
        </div>
      </Root>
    );
  }
}

IndexPage.Layout = Layout
export default IndexPage
